// src/components/ImageEditor/FinalImageViewer.jsx
import React from 'react';

export default function FinalImageViewer({ image, onSave, onReset }) {
    const handleSave = () => {
        const defaultName = "final_product_image.png";
        const fileName = prompt("Enter a filename for your image:", defaultName);
        if (fileName) {
            onSave(image, fileName);
        }
    };
    return (
        <div className="container card">
            <h2>Step 4: Save Your Image</h2>
            <div className="image-preview-box final-preview">
                <img src={image} alt="Final selected product" className="image-preview" />
            </div>
            <div className="button-group">
                <button className="button" onClick={handleSave}>Save to Device</button>
                <button className="button secondary" onClick={onReset}>Create Another</button>
            </div>
        </div>
    );
}