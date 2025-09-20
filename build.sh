#!/bin/bash

# Clean previous builds
rm -rf build/chrome build/firefox

# Create build directories
mkdir -p build/chrome build/firefox

# Copy common files
cp -r icons/ build/chrome/
cp -r icons/ build/firefox/

# Chrome build (uses manifest v3)
cp manifest.json build/chrome/
cp background.js build/chrome/
cp content.js build/chrome/

# Firefox build (uses manifest v2)
cp manifest-firefox.json build/firefox/manifest.json
cp background.js build/firefox/
cp content.js build/firefox/

echo "Build complete!"
echo "Chrome extension: build/chrome/"
echo "Firefox extension: build/firefox/"