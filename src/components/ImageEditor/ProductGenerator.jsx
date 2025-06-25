// src/components/ImageEditor/ProductGenerator.jsx
import React, { useState } from 'react';

export default function ProductGenerator({ onGenerate, onBack }) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
        } else {
            alert("Please enter a product description.");
        }
    };

    return (
        <div className="container card">
            <h2>Generate New Product Images</h2>
            <p>Describe the new product or scene you envision. The AI will generate 5 options.</p>
            <form onSubmit={handleSubmit} className="prompt-form">
                <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., a sleek red sports car on a racetrack"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button type="submit" className="button">Generate 5 Images</button>
            </form>
            <button className="button secondary" onClick={onBack}>Back</button>
        </div>
    );
}