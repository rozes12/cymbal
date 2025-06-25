// src/components/ImageEditor/BackgroundChanger.jsx
import React, { useState } from 'react';
import { generateShades } from './utils'; // Import utility function

export default function BackgroundChanger({ onGenerate, onBack }) {
    const [bgChoice, setBgChoice] = useState(null);
    const [customPrompt, setCustomPrompt] = useState('');
    const colorMap = {
        'Red': '#FF0000', 'Green': '#00FF00', 'Blue': '#0000FF',
        'Yellow': '#FFFF00', 'Purple': '#800080', 'Grey': '#808080'
    };

    const handlePaletteClick = (colorName) => {
        const baseHex = colorMap[colorName];
        const shades = generateShades(baseHex, 5);
        onGenerate({ type: 'palette', shades, hex: baseHex });
    };

    const handleCustomSubmit = (e) => {
        e.preventDefault();
        if (customPrompt.trim()) {
            onGenerate({ type: 'prompt', prompt: customPrompt });
        } else {
            alert("Please enter a background description.");
        }
    };

    return (
        <div className="container card">
            <h2>Change Background Color</h2>
            <div className="button-group">
                <button className={`button small ${bgChoice === 'palette' ? '' : 'secondary'}`} onClick={() => setBgChoice('palette')}>From Color Palette</button>
                <button className={`button small ${bgChoice === 'prompt' ? '' : 'secondary'}`} onClick={() => setBgChoice('prompt')}>With AI Prompt</button>
            </div>

            {bgChoice === 'palette' && (
                <div className="palette-container">
                    <h4>Click a color to generate 5 shades</h4>
                    <div className="color-palette">
                        {Object.keys(colorMap).map(name => (
                            <div
                                key={name}
                                className="color-option"
                                style={{ backgroundColor: colorMap[name] }}
                                title={name}
                                onClick={() => handlePaletteClick(name)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {bgChoice === 'prompt' && (
                <form onSubmit={handleCustomSubmit} className="prompt-form">
                    <h4>Describe the background you want</h4>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="e.g., a serene beach at sunset"
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                    />
                    <button type="submit" className="button">Generate Backgrounds</button>
                </form>
            )}
            <button className="button secondary" onClick={onBack}>Back to Menu</button>
        </div>
    );
}