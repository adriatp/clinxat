# Clinxat: ChatGPT DOM Cleaner Extension

A browser extension that removes specific DOM elements on chatgpt.com

## Installation

### Building
Run the build script to generate both Chrome and Firefox versions:

```bash
./build.sh
```

This will create two folders:
- `build/chrome/` - Chrome extension (manifest v3)
- `build/firefox/` - Firefox extension (manifest v2)

### Chrome
1. Go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `build/chrome/` folder

### Firefox
1. Go to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `build/firefox/manifest.json` file

## Configuration

Edit the `content.js` file and add the CSS selectors of the elements you want to remove in the `elementsToRemove` array:

```javascript
const elementsToRemove = [
  '#element-id',
  '.element-class',
  'div[data-testid="annoying-banner"]'
];
```

## Functionality

- Automatically detects when you're on chatgpt.com
- Removes DOM elements based on CSS selectors
- Observes DOM changes to remove dynamically appearing elements
