const browser = typeof chrome !== 'undefined' ? chrome : typeof browser !== 'undefined' ? browser : null;

if (browser) {
  let isEnabled = true;

  browser.runtime.onInstalled.addListener(() => {
    console.log('Clinxat: ChatGPT DOM Cleaner extension installed');
    browser.storage.sync.set({ enabled: true });
  });

  const actionAPI = browser.action || browser.browserAction;
  
  actionAPI.onClicked.addListener((tab) => {
    browser.storage.sync.get(['enabled'], (result) => {
      const newState = !result.enabled;
      browser.storage.sync.set({ enabled: newState });

      browser.tabs.sendMessage(tab.id, { 
        action: 'toggle', 
        enabled: newState 
      });

      updateIcon(newState);
    });
  });

  browser.commands.onCommand.addListener((command) => {
    if (command === 'toggle-cleaner') {
      browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]) {
          browser.storage.sync.get(['enabled'], (result) => {
            const newState = !result.enabled;
            browser.storage.sync.set({ enabled: newState });

            browser.tabs.sendMessage(tabs[0].id, { 
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

    actionAPI.setIcon({ path });
  }
}
