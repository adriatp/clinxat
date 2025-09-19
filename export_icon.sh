#!/bin/bash

# Script para generar iconos de extensión desde base.png

INPUT="icons/base.png"
OUTPUT_DIR="icons"

# Verificar que existe la imagen base
if [ ! -f "$INPUT" ]; then
    echo "Error: No se encuentra $INPUT"
    echo "Crea primero una imagen base.png en el directorio icons/"
    exit 1
fi

# Crear iconos normales
echo "Generando iconos normales..."
ffmpeg -i "$INPUT" -vf scale=16:16 "$OUTPUT_DIR/icon16.png" -y
ffmpeg -i "$INPUT" -vf scale=48:48 "$OUTPUT_DIR/icon48.png" -y
ffmpeg -i "$INPUT" -vf scale=128:128 "$OUTPUT_DIR/icon128.png" -y

# Crear iconos deshabilitados (grises)
echo "Generando iconos deshabilitados..."
ffmpeg -i "$INPUT" -vf "scale=16:16,colorchannelmixer=.3:.3:.3:0" "$OUTPUT_DIR/icon16-disabled.png" -y
ffmpeg -i "$INPUT" -vf "scale=48:48,colorchannelmixer=.3:.3:.3:0" "$OUTPUT_DIR/icon48-disabled.png" -y
ffmpeg -i "$INPUT" -vf "scale=128:128,colorchannelmixer=.3:.3:.3:0" "$OUTPUT_DIR/icon128-disabled.png" -y

echo "Iconos generados exitosamente en $OUTPUT_DIR/"
echo "- icon16.png, icon48.png, icon128.png (normales)"
echo "- icon16-disabled.png, icon48-disabled.png, icon128-disabled.png (deshabilitados)"