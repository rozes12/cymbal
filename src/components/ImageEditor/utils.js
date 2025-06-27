// src/components/ImageEditor/utils.js

export function hexToRgb(hex) { /* ... same as before ... */ }
export function rgbToHex(rgb) { /* ... same as before ... */ }
export function rgbToHsl(r, g, b) { /* ... same as before ... */ }
export function hslToRgb(h, s, l) { /* ... same as before ... */ }

export function generateShades(baseHexColor, numShades = 5) {
    const rgb = hexToRgb(baseHexColor);
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    const shades = [];
    for (let i = 0; i < numShades; i++) {
        const lightness = 0.2 + (i / (numShades - 1)) * 0.7;
        const newRgb = hslToRgb(hsl[0], hsl[1], lightness);
        shades.push(rgbToHex(newRgb));
    }
    return shades;
}

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}