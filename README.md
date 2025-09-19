# ChatGPT DOM Cleaner Extension

Una extensión de navegador que remueve elementos específicos del DOM en chatgpt.com

## Instalación

### Chrome
1. Ve a `chrome://extensions/`
2. Activa "Modo desarrollador"
3. Haz clic en "Cargar descomprimida"
4. Selecciona la carpeta de la extensión

### Firefox
1. Ve a `about:debugging`
2. Haz clic en "This Firefox"
3. Haz clic en "Load Temporary Add-on"
4. Selecciona el archivo `manifest.json`

## Configuración

Edita el archivo `content.js` y agrega los selectores CSS de los elementos que quieres remover en el array `elementsToRemove`:

```javascript
const elementsToRemove = [
  '#element-id',
  '.element-class',
  'div[data-testid="annoying-banner"]'
];
```

## Funcionalidad

- Detecta automáticamente cuando estás en chatgpt.com
- Remueve elementos del DOM basado en selectores CSS
- Observa cambios en el DOM para remover elementos que aparezcan dinámicamente