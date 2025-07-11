// src/components/ImageEditor/utils.js



// src/components/ImageEditor/utils.js

export function hexToRgb(hex) {
    let r = 0, g = 0, b = 0; // Initialize r, g, b to 0

    // Ensure hex is a string and handle potential leading/trailing whitespace
    const cleanHex = String(hex || '').trim();

    // Handle short hex codes (e.g., #F00)
    if (cleanHex.length === 4) {
        r = parseInt(cleanHex[1] + cleanHex[1], 16);
        g = parseInt(cleanHex[2] + cleanHex[2], 16);
        b = parseInt(cleanHex[3] + cleanHex[3], 16);
    }
    // Handle long hex codes (e.g., #FF0000)
    else if (cleanHex.length === 7) {
        r = parseInt(cleanHex.substring(1, 3), 16);
        g = parseInt(cleanHex.substring(3, 5), 16);
        b = parseInt(cleanHex.substring(5, 7), 16);
    } else {
        // Handle invalid hex formats:
        // Set r, g, b to 0 if the format doesn't match expected patterns
        // This ensures it always returns a valid array of numbers [0,0,0] for invalid input
        console.warn(`hexToRgb: Invalid hex color format received: ${hex}. Returning [0,0,0].`);
        r = 0; g = 0; b = 0;
    }

    // Ensure results are numbers, and default to 0 if NaN (from parseInt failure)
    r = isNaN(r) ? 0 : r;
    g = isNaN(g) ? 0 : g;
    b = isNaN(b) ? 0 : b;

    return [r, g, b];
}

export function rgbToHex(rgb) {
    return "#" + rgb.map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

export function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

export function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export function generateShades(baseHexColor, numShades = 5) {
    const rgb = hexToRgb(baseHexColor); // This now always returns [r,g,b]
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]); // This line will now receive numbers
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