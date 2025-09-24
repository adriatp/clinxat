const fs = require('fs');
const path = require('path');

// Leer la versión del manifest
const manifest = JSON.parse(fs.readFileSync('manifest-firefox.json', 'utf8'));
const version = manifest.version;

// Generar updates.json dinámico
const updatesJson = {
  "addons": {
    "clinxat@github.com": {
      "updates": [
        {
          "version": version,
          "update_link": `https://github.com/${process.env.GITHUB_REPOSITORY || 'adriatp/clinxat'}/releases/latest/download/firefox-extension.xpi`
        }
      ]
    }
  }
};

fs.writeFileSync('updates.json', JSON.stringify(updatesJson, null, 2));
console.log('Generated updates.json for version:', version);