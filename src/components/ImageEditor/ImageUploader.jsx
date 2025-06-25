// src/components/ImageEditor/ImageUploader.jsx
import React from 'react';
import { fileToBase64 } from './utils'; // Import the utility function

export default function ImageUploader({ onImageUpload }) {
    return (
        <div className="container card">
            <h2>Step 1: Upload Your Product Image</h2>
            <p>Select an image file from your device to begin the editing process.</p>
            <div className="file-input-wrapper">
                <button className="button">Choose File</button>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                            const base64 = await fileToBase64(e.target.files[0]);
                            onImageUpload(base64);
                        }
                    }}
                />
            </div>
        </div>
    );
}