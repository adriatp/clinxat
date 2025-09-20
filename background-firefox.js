const browser = typeof chrome !== 'undefined' ? chrome : typeof browser !== 'undefined' ? browser : null;

if (browser) {
  console.log('Firefox background script loaded');
  let isEnabled = true;

  browser.runtime.onInstalled.addListener(() => {
    console.log('Clinxat: ChatGPT DOM Cleaner extension installed');
    browser.storage.local.set({ enabled: true });
  });

  const actionAPI = browser.browserAction || browser.action;
  
  actionAPI.onClicked.addListener((tab) => {
    console.log('BROWSER ACTION CLICKED - Tab:', tab.id, 'URL:', tab.url);
    browser.storage.local.get(['enabled'], (result) => {
      console.log('Storage result:', result);
      const newState = !result.enabled;
      console.log('Setting new state:', newState);
      browser.storage.local.set({ enabled: newState });

      browser.tabs.sendMessage(tab.id, { 
        action: 'toggle', 
        enabled: newState 
      });

      updateIcon(newState);
    });
  });

  browser.commands.onCommand.addListener((command) => {
    console.log('COMMAND RECEIVED:', command);
    if (command === 'toggle-cleaner') {
      browser.tabs.query({active: true, currentWindow: true}, (tabs) => {
        console.log('Active tabs found:', tabs.length);
        if (tabs[0]) {
          browser.storage.local.get(['enabled'], (result) => {
            console.log('Command storage result:', result);
            const newState = !result.enabled;
            console.log('Command setting state:', newState);
            browser.storage.local.set({ enabled: newState });

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
    console.log('Updating icon to:', enabled ? 'enabled' : 'disabled');
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