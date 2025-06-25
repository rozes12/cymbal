// src/components/ImageEditor/ImageEditorApp.jsx
import React, { useState, useCallback } from 'react';

// Import all your individual components and functions
import ImageUploader from './ImageUploader';
import MainMenu from './MainMenu';
import BackgroundChanger from './BackgroundChanger';
import ProductGenerator from './ProductGenerator';
import ImageGallery from './ImageGallery';
import FinalImageViewer from './FinalImageViewer';
import { processImageRequest } from './api'; // Import your API function

export default function ImageEditorApp() {
    const [step, setStep] = useState('upload');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleReset = useCallback(() => {
        setStep('upload');
        setUploadedImage(null);
        setGeneratedImages([]);
        setSelectedImage(null);
        setFinalImage(null);
        setIsLoading(false);
        setError(null);
    }, []);

    const handleImageUpload = (base64) => {
        setUploadedImage(base64);
        setStep('menu');
    };

    const handleMenuChoice = (choice) => {
        setStep(choice);
    };

    const runImageProcessing = async (params) => {
        setIsLoading(true);
        setError(null);
        setSelectedImage(null);
        setStep('processing');
        try {
            const results = await processImageRequest(params);
            if (!results || results.length === 0) {
                throw new Error("The AI failed to generate images. Please try a different prompt.");
            }
            setGeneratedImages(results);
            setStep('results');
        } catch (err) {
            console.error("Error processing image:", err);
            setError(err.message || "An unknown error occurred.");
            setStep('menu'); // Go back to menu if there's an error
        } finally {
            setIsLoading(false);
        }
    };

    const handleBgGenerate = async ({ type, shades, prompt, hex }) => {
        if (type === 'palette') {
            runImageProcessing({
                uploaded_image_base64: uploadedImage,
                action: 'background_color',
                background_color_hex: shades,
                num_output_images: 5,
            });
        } else {
            runImageProcessing({
                uploaded_image_base64: uploadedImage,
                action: 'background_generated',
                background_prompt: prompt,
                num_output_images: 5,
            });
        }
    };

    const handleProductGenerate = (prompt) => {
        runImageProcessing({
            uploaded_image_base64: uploadedImage,
            action: 'product_edit',
            product_prompt: prompt,
            num_output_images: 5,
        });
    };

    const handleConfirmSelection = () => {
        if (selectedImage) {
            setFinalImage(selectedImage);
            setStep('final');
        }
    };

    const handleSaveImage = (base64, fileName) => {
        const link = document.createElement('a');
        link.href = base64;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderStep = () => {
        if (isLoading || step === 'processing') {
            return (
                <div className="container card">
                    <h2>Generating your images...</h2>
                    <p>This may take a moment. The AI is hard at work! ✨</p>
                    <div className="loader"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="container card error-box">
                    <h2>An Error Occurred</h2>
                    <p>{error}</p>
                    <button className="button" onClick={() => { setError(null); setStep('menu'); }}>Try Again</button>
                </div>
            );
        }

        switch (step) {
            case 'upload':
                return <ImageUploader onImageUpload={handleImageUpload} />;
            case 'menu':
                return <MainMenu onChoice={handleMenuChoice} uploadedImage={uploadedImage} onReset={handleReset} />;
            case 'changeBg':
                return <BackgroundChanger onGenerate={handleBgGenerate} onBack={() => setStep('menu')} />;
            case 'generateNew':
                return <ProductGenerator onGenerate={handleProductGenerate} onBack={() => setStep('menu')} />;
            case 'results':
                return <ImageGallery
                    images={generatedImages}
                    selectedImage={selectedImage}
                    onSelect={setSelectedImage}
                    onConfirm={handleConfirmSelection}
                    onReset={() => setStep('menu')}
                />;
            case 'final':
                return <FinalImageViewer image={finalImage} onSave={handleSaveImage} onReset={handleReset} />;
            default:
                return <ImageUploader onImageUpload={handleImageUpload} />;
        }
    };

    return (
        <div className="ImageEditorAppContainer">
            {/* The header and footer can be integrated into your main admin dashboard layout
                if you want a more unified look. For now, they are kept here
                as they were in your original file.
            */}
            <header>
                <h1>AI Product Image Studio</h1>
            </header>
            <main>
                {renderStep()}
            </main>
            <footer>
                <p>Powered by React & AI</p>
            </footer>
        </div>
    );
}