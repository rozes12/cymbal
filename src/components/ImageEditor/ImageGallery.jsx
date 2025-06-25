// src/components/ImageEditor/ImageGallery.jsx
import React from 'react';

export default function ImageGallery({ images, onSelect, selectedImage, onConfirm, onReset }) {
    return (
        <div className="container card">
            <h2>Step 3: Choose Your Favorite</h2>
            <p>Select the image you'd like to keep, then click "Confirm Selection".</p>
            <div className="image-gallery">
                {images.map((imgB64, index) => (
                    <div
                        key={index}
                        className={`image-gallery-item ${selectedImage === imgB64 ? 'selected' : ''}`}
                        onClick={() => onSelect(imgB64)}
                    >
                        <img src={imgB64} alt={`Generated result ${index + 1}`} />
                        <div className="overlay">Option {index + 1}</div>
                    </div>
                ))}
            </div>
            <div className="button-group">
                <button className="button" onClick={onConfirm} disabled={!selectedImage}>Confirm Selection</button>
                <button className="button secondary" onClick={onReset}>Back to Menu</button>
            </div>
        </div>
    );
}