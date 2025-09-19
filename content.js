let isEnabled = true;
let observer = null;
const hiddenElements = new Set();

function hideElements() {
  if (!isEnabled) return;

  const elementsToHide = [
    ".text-token-text-secondary",
    "#page-header",
    ".draggable", 
    "#stage-slideover-sidebar"
  ];

  elementsToHide.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (element.style.display !== 'none') {
        element.dataset.originalDisplay = element.style.display || '';
        element.style.display = 'none';
        hiddenElements.add(element);
        console.log(`Hidden element: ${selector}`);
      }
    });
  });
}

function observeDOM() {
  if (observer) observer.disconnect();

  observer = new MutationObserver(() => {
    hideElements();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function toggleCleaner(enabled) {
  isEnabled = enabled;

  if (enabled) {
    hideElements();
    observeDOM();
    console.log('Clinxat enabled');
  } else {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    // Restore only the elements we hid
    hiddenElements.forEach(element => {
      element.style.display = element.dataset.originalDisplay || '';
      delete element.dataset.originalDisplay;
    });
    hiddenElements.clear();
    console.log('Clinxat disabled');
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle') {
    toggleCleaner(request.enabled);
  }
});

chrome.storage.sync.get(['enabled'], (result) => {
  const enabled = result.enabled !== undefined ? result.enabled : true;
  toggleCleaner(enabled);
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hideElements();
    observeDOM();
  });
} else {
  hideElements();
  observeDOM();
}
