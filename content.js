const browser = typeof chrome !== 'undefined' ? chrome : typeof browser !== 'undefined' ? browser : null;
console.log('Content script loaded for:', window.location.href);

let isEnabled = true;
let observer = null;
const hiddenElements = new Set();

function hideElements() {
  if (!isEnabled) return;

  const elementsToHide = [
    "#thread-bottom-container .text-token-text-secondary",
    "#page-header",
    ".draggable", 
    "#stage-slideover-sidebar",
    "aside"
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

if (browser) {
  console.log('Browser API available, setting up listeners');
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.action === 'toggle') {
      console.log('Toggle request:', request.enabled);
      toggleCleaner(request.enabled);
    }
  });

  const storageAPI = browser.storage.sync || browser.storage.local;
  console.log('Using storage API:', storageAPI === browser.storage.sync ? 'sync' : 'local');
  
  storageAPI.get(['enabled'], (result) => {
    console.log('Initial storage result:', result);
    const enabled = result.enabled !== undefined ? result.enabled : true;
    console.log('Initial state:', enabled);
    toggleCleaner(enabled);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hideElements();
    observeDOM();
  });
} else {
  hideElements();
  observeDOM();
}
