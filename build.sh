#!/bin/bash

# Clean previous builds
rm -rf dist/chrome dist/firefox

# Create build directories
mkdir -p dist/chrome dist/firefox

# Copy common files
cp -r icons/ dist/chrome/
cp -r icons/ dist/firefox/

# Chrome build (uses manifest v3)
cp manifest.json dist/chrome/
cp background.js dist/chrome/
cp content.js dist/chrome/

# Firefox build (uses manifest v2)
cp manifest-firefox.json dist/firefox/manifest.json
cp background-firefox.js dist/firefox/background.js
cp content.js dist/firefox/

# Create .xpi for Firefox
cd dist/firefox || exit
zip -r ../firefox-extension.xpi .
cd ../..

echo "Build complete!"
echo "Chrome extension: dist/chrome/"
echo "Firefox extension: dist/firefox/"
echo "Firefox XPI: dist/firefox-extension.xpi"
