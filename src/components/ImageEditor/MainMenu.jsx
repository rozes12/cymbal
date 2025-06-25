// src/components/ImageEditor/MainMenu.jsx
import React from 'react';

export default function MainMenu({ onChoice, uploadedImage, onReset }) {
    return (
        <div className="container">
            <div className="image-preview-box card">
                <h3>Your Image</h3>
                <img src={uploadedImage} alt="Uploaded product" className="image-preview" />
            </div>
            <div className="main-menu-container card">
                <h2>Step 2: Choose an Action</h2>
                <div className="button-group">
                    <button className="button" onClick={() => onChoice('changeBg')}>
                        <span role="img" aria-label="palette">🎨</span> Change Background
                    </button>
                    <button className="button" onClick={() => onChoice('generateNew')}>
                        <span role="img" aria-label="sparkles">✨</span> Generate New Images
                    </button>
                    <button className="button secondary" onClick={onReset}>Start Over</button>
                </div>
            </div>
        </div>
    );
}