let isEnabled = true;

chrome.runtime.onInstalled.addListener(() => {
  console.log('Clinxat: ChatGPT DOM Cleaner extension installed');
  chrome.storage.sync.set({ enabled: true });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get(['enabled'], (result) => {
    const newState = !result.enabled;
    chrome.storage.sync.set({ enabled: newState });

    chrome.tabs.sendMessage(tab.id, { 
      action: 'toggle', 
      enabled: newState 
    });

    updateIcon(newState);
  });
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-cleaner') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs[0]) {
        chrome.storage.sync.get(['enabled'], (result) => {
          const newState = !result.enabled;
          chrome.storage.sync.set({ enabled: newState });

          chrome.tabs.sendMessage(tabs[0].id, { 
            action: 'toggle', 
            enabled: newState 
          });

          updateIcon(newState);
        });
      }
    });
  }
});

function updateIcon(enabled) {
  const path = enabled ? {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png", 
    "128": "icons/icon128.png"
  } : {
      "16": "icons/icon16-disabled.png",
      "48": "icons/icon48-disabled.png",
      "128": "icons/icon128-disabled.png"
    };

  chrome.action.setIcon({ path });
}
