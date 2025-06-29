// // src/components/ImageEditor/ImageEditorApp.jsx
// import React, { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { processImageRequest } from './api';
// import { fileToBase64, generateShades } from './utils';

// // Define the individual step components directly within this file for simplicity,
// // or keep them as separate files if you prefer more modularity.
// // For "not too modulated", let's include them here.

// const ImageUploader = ({ onImageUpload }) => (
//     <div className="container card">
//         <h2>Step 1: Upload Your Product Image</h2>
//         <p>Select an image file from your device to begin the editing process.</p>
//         <div className="file-input-wrapper">
//             <button className="button">Choose File</button>
//             <input
//                 type="file"
//                 accept="image/png, image/jpeg, image/webp"
//                 onChange={async (e) => {
//                     if (e.target.files && e.target.files[0]) {
//                         const base64 = await fileToBase64(e.target.files[0]);
//                         onImageUpload(base64);
//                     }
//                 }}
//             />
//         </div>
//     </div>
// );

// const MainMenu = ({ onChoice, uploadedImage, onReset }) => (
//     <div className="container">
//         <div className="image-preview-box card">
//             <h3>Your Image</h3>
//             <img src={uploadedImage} alt="Uploaded product" className="image-preview" />
//         </div>
//         <div className="main-menu-container card">
//             <h2>Step 2: Choose an Action</h2>
//             <div className="button-group">
//                 <button className="button" onClick={() => onChoice('changeBg')}>
//                     <span role="img" aria-label="palette">🎨</span> Change Background
//                 </button>
//                 <button className="button" onClick={() => onChoice('generateNew')}>
//                     <span role="img" aria-label="sparkles">✨</span> Generate New Images
//                 </button>
//                 <button className="button secondary" onClick={onReset}>Start Over</button>
//             </div>
//         </div>
//     </div>
// );

// const BackgroundChanger = ({ onGenerate, onBack }) => {
//     const [bgChoice, setBgChoice] = useState(null);
//     const [customPrompt, setCustomPrompt] = useState('');
//     const colorMap = {
//         'Red': '#FF0000', 'Green': '#00FF00', 'Blue': '#0000FF',
//         'Yellow': '#FFFF00', 'Purple': '#800080', 'Grey': '#808080'
//     };

//     const handlePaletteClick = (colorName) => {
//         const baseHex = colorMap[colorName];
//         const shades = generateShades(baseHex, 5);
//         onGenerate({ type: 'palette', shades, hex: baseHex });
//     };

//     const handleCustomSubmit = (e) => {
//         e.preventDefault();
//         if (customPrompt.trim()) {
//             onGenerate({ type: 'prompt', prompt: customPrompt });
//         } else {
//             alert("Please enter a background description.");
//         }
//     };

//     return (
//         <div className="container card">
//             <h2>Change Background Color</h2>
//             <div className="button-group">
//                 <button className={`button small ${bgChoice === 'palette' ? '' : 'secondary'}`} onClick={() => setBgChoice('palette')}>From Color Palette</button>
//                 <button className={`button small ${bgChoice === 'prompt' ? '' : 'secondary'}`} onClick={() => setBgChoice('prompt')}>With AI Prompt</button>
//             </div>

//             {bgChoice === 'palette' && (
//                 <div className="palette-container">
//                     <h4>Click a color to generate 5 shades</h4>
//                     <div className="color-palette">
//                         {Object.keys(colorMap).map(name => (
//                             <div
//                                 key={name}
//                                 className="color-option"
//                                 style={{ backgroundColor: colorMap[name] }}
//                                 title={name}
//                                 onClick={() => handlePaletteClick(name)}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {bgChoice === 'prompt' && (
//                 <form onSubmit={handleCustomSubmit} className="prompt-form">
//                     <h4>Describe the background you want</h4>
//                     <input
//                         type="text"
//                         className="input-field"
//                         placeholder="e.g., a serene beach at sunset"
//                         value={customPrompt}
//                         onChange={(e) => setCustomPrompt(e.target.value)}
//                     />
//                     <button type="submit" className="button">Generate Backgrounds</button>
//                 </form>
//             )}
//             <button className="button secondary" onClick={onBack}>Back to Menu</button>
//         </div>
//     );
// };

// const ProductGenerator = ({ onGenerate, onBack }) => {
//     const [prompt, setPrompt] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (prompt.trim()) {
//             onGenerate(prompt);
//         } else {
//             alert("Please enter a product description.");
//         }
//     };

//     return (
//         <div className="container card">
//             <h2>Generate New Product Images</h2>
//             <p>Describe the new product or scene you envision. The AI will generate 5 options.</p>
//             <form onSubmit={handleSubmit} className="prompt-form">
//                 <input
//                     type="text"
//                     className="input-field"
//                     placeholder="e.g., a sleek red sports car on a racetrack"
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                 />
//                 <button type="submit" className="button">Generate 5 Images</button>
//             </form>
//             <button className="button secondary" onClick={onBack}>Back</button>
//         </div>
//     );
// };

// const ImageGallery = ({ images, onSelect, selectedImage, onConfirm, onReset }) => (
//     <div className="container card">
//         <h2>Step 3: Choose Your Favorite</h2>
//         <p>Select the image you'd like to keep, then click "Confirm Selection".</p>
//         <div className="image-gallery">
//             {images.map((imgUrl, index) => (
//                 <div
//                     key={index}
//                     className={`image-gallery-item ${selectedImage === imgUrl ? 'selected' : ''}`}
//                     onClick={() => onSelect(imgUrl)}
//                 >
//                     <img src={imgUrl} alt={`Generated result ${index + 1}`} />
//                     <div className="overlay">Option {index + 1}</div>
//                 </div>
//             ))}
//         </div>
//         <div className="button-group">
//             <button className="button" onClick={onConfirm} disabled={!selectedImage}>Confirm Selection</button>
//             <button className="button secondary" onClick={onReset}>Back to Menu</button>
//         </div>
//     </div>
// );

// const FinalImageViewer = ({ image, onSave, onReset, onSendToAttributes }) => {
//     const handleSave = () => {
//         const defaultName = "final_product_image.png";
//         const fileName = prompt("Enter a filename for your image:", defaultName);
//         if (fileName) {
//             onSave(image, fileName);
//         }
//     };
//     return (
//         <div className="container card">
//             <h2>Step 4: Save Your Image</h2>
//             <div className="image-preview-box final-preview">
//                 <img src={image} alt="Final selected product" className="image-preview" />
//             </div>
//             <div className="button-group">
//                 <button className="button" onClick={handleSave}>Save to Device</button>
//                 <button
//                     className="button"
//                     onClick={() => onSendToAttributes(image)}
//                     style={{ backgroundImage: 'linear-gradient(to right, #20bf55, #01ba47)' }}
//                 >
//                     <span role="img" aria-label="sparkles">✨</span> Send to Attribute Generation
//                 </button>
//                 <button className="button secondary" onClick={onReset}>Create Another</button>
//             </div>
//         </div>
//     );
// };


// export default function ImageEditorApp() {
//     const navigate = useNavigate();

//     const [step, setStep] = useState('upload');
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [generatedImages, setGeneratedImages] = useState([]);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [finalImage, setFinalImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleReset = useCallback(() => {
//         setStep('upload');
//         setUploadedImage(null);
//         setGeneratedImages([]);
//         setSelectedImage(null);
//         setFinalImage(null);
//         setIsLoading(false);
//         setError(null);
//     }, []);

//     const handleImageUpload = (base64) => {
//         setUploadedImage(base64);
//         setStep('menu');
//     };

//     const handleMenuChoice = (choice) => {
//         setStep(choice);
//     };

//     const runImageProcessing = async (params) => {
//         setIsLoading(true);
//         setError(null);
//         setSelectedImage(null);
//         setStep('processing');
//         try {
//             const results = await processImageRequest(params);
//             if (!results || results.length === 0) {
//                 throw new Error("The AI failed to generate images. Please try a different prompt.");
//             }
//             const gcsUrls = results.map(item => item.gcs_url);
//             setGeneratedImages(gcsUrls);
//             setStep('results');
//         } catch (err) {
//             console.error("Error processing image:", err);
//             setError(err.message || "An unknown error occurred.");
//             setStep('menu');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleBgGenerate = async ({ type, shades, prompt }) => {
//         if (type === 'palette') {
//             runImageProcessing({
//                 uploaded_image_base64: uploadedImage,
//                 action: 'background_color',
//                 background_color_hex: shades,
//                 num_output_images: 5,
//             });
//         } else {
//             runImageProcessing({
//                 uploaded_image_base64: uploadedImage,
//                 action: 'background_generated',
//                 background_prompt: prompt,
//                 num_output_images: 5,
//             });
//         }
//     };

//     const handleProductGenerate = (prompt) => {
//         runImageProcessing({
//             uploaded_image_base64: uploadedImage,
//             action: 'product_edit',
//             product_prompt: prompt,
//             num_output_images: 5,
//         });
//     };

//     const handleConfirmSelection = () => {
//         if (selectedImage) {
//             setFinalImage(selectedImage);
//             setStep('final');
//         }
//     };

//     const handleSaveImage = (imageUrl, fileName) => {
//         fetch(imageUrl)
//             .then(response => response.blob())
//             .then(blob => {
//                 const url = window.URL.createObjectURL(blob);
//                 const link = document.createElement('a');
//                 link.href = url;
//                 link.download = fileName;
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//                 window.URL.revokeObjectURL(url);
//             })
//             .catch(error => {
//                 console.error('Error downloading image:', error);
//                 alert('Failed to save image. Please try again.');
//             });
//     };

//     const handleSendToAttributes = async (imageUrl) => {
//         try {
//             const response = await fetch(imageUrl);
//             const blob = await response.blob();
//             const base64Image = await new Promise((resolve, reject) => {
//                 const reader = new FileReader();
//                 reader.onloadend = () => resolve(reader.result);
//                 reader.onerror = reject;
//                 reader.readAsDataURL(blob);
//             });

//             sessionStorage.setItem('imageForAttributes', base64Image);
//             navigate('/admin/category-section-from-image');
//         } catch (error) {
//             console.error("Failed to send image to attribute generation:", error);
//             alert("Could not prepare image for attribute generation. Please try again.");
//         }
//     };

//     const renderStep = () => {
//         if (isLoading || step === 'processing') {
//             return (
//                 <div className="container card">
//                     <h2>Generating your images...</h2>
//                     <p>This may take a moment. The AI is hard at work! ✨</p>
//                     <div className="loader"></div>
//                 </div>
//             );
//         }

//         if (error) {
//             return (
//                 <div className="container card error-box">
//                     <h2>An Error Occurred</h2>
//                     <p>{error}</p>
//                     <button className="button" onClick={() => { setError(null); setStep('menu'); }}>Try Again</button>
//                 </div>
//             )
//         }

//         switch (step) {
//             case 'upload': return <ImageUploader onImageUpload={handleImageUpload} />;
//             case 'menu': return <MainMenu onChoice={handleMenuChoice} uploadedImage={uploadedImage} onReset={handleReset} />;
//             case 'changeBg': return <BackgroundChanger onGenerate={handleBgGenerate} onBack={() => setStep('menu')} />;
//             case 'generateNew': return <ProductGenerator onGenerate={handleProductGenerate} onBack={() => setStep('menu')} />;
//             case 'results': return <ImageGallery
//                 images={generatedImages}
//                 selectedImage={selectedImage}
//                 onSelect={setSelectedImage}
//                 onConfirm={handleConfirmSelection}
//                 onReset={() => setStep('menu')}
//             />;
//             case 'final': return <FinalImageViewer
//                 image={finalImage}
//                 onSave={handleSaveImage}
//                 onReset={handleReset}
//                 onSendToAttributes={handleSendToAttributes}
//             />;
//             default: return <ImageUploader onImageUpload={handleImageUpload} />;
//         }
//     };

//     return (
//         <div className="p-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
//             <h2 className="text-2xl font-bold mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
//                 AI Product Image Studio
//             </h2>
//             <div style={{ marginBottom: '1.5rem' }}>
//                 <main>{renderStep()}</main>
//             </div>
//             <div style={{ marginTop: '2rem', textAlign: 'center', color: '#777', fontSize: '14px' }}>
//                 <p>Powered by React & AI</p>
//             </div>
//         </div>
//     );
// }

// src/components/ImageEditor/ImageEditorApp.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { processImageRequest } from './api'; // Assuming this correctly calls your AI Image API
import { fileToBase64, generateShades } from './utils'; // Assuming these are correctly defined

// Define the individual step components directly within this file for simplicity,
// or keep them as separate files if you prefer more modularity.

const ImageUploader = ({ onImageUpload }) => (
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

const MainMenu = ({ onChoice, uploadedImage, onReset }) => (
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

const BackgroundChanger = ({ onGenerate, onBack }) => {
    const [bgChoice, setBgChoice] = useState(null);
    const [customPrompt, setCustomPrompt] = useState('');
    const colorMap = {
        'Red': '#FF0000', 'Green': '#00FF00', 'Blue': '#0000FF',
        'Yellow': '#FFFF00', 'Purple': '#800080', 'Grey': '#808080'
    };

    const handlePaletteClick = (colorName) => {
        const baseHex = colorMap[colorName];
        const shades = generateShades(baseHex, 5);
        // For palette, no prompt to store, pass null for prompt
        onGenerate({ type: 'palette', shades, hex: baseHex, prompt: null });
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
};

const ProductGenerator = ({ onGenerate, onBack }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt); // Pass the prompt to the parent
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
};

// MODIFIED: ImageGallery now accepts 'inputPrompt' prop
const ImageGallery = ({ images, onSelect, selectedImage, onConfirm, onReset, inputPrompt }) => (
    <div className="container card">
        <h2>Step 3: Choose Your Favorite</h2>
        <p>Select the image you'd like to keep, then click "Confirm Selection".</p>
        {/* Display the prompt if available */}
        {inputPrompt && <p><strong>Prompt:</strong> {inputPrompt}</p>}
        <div className="image-gallery">
            {images.map((imgUrl, index) => (
                <div
                    key={index}
                    className={`image-gallery-item ${selectedImage === imgUrl ? 'selected' : ''}`}
                    onClick={() => onSelect(imgUrl)}
                >
                    <img src={imgUrl} alt={`Generated result ${index + 1}`} />
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

const FinalImageViewer = ({ image, onSave, onReset, onSendToAttributes }) => {
    const handleSave = () => {
        const defaultName = "final_product_image.png";
        const fileName = prompt("Enter a filename for your image:", defaultName);
        if (fileName) {
            onSave(image, fileName);
        }
    };
    return (
        <div className="container card">
            <h2>Step 4: Your Final Image</h2>
            <div className="image-preview-box final-preview">
                <img src={image} alt="Final selected product" className="image-preview" />
            </div>
            <div className="button-group">
                <button className="button" onClick={handleSave}>Save to Device</button>
                <button
                    className="button"
                    onClick={() => onSendToAttributes(image)} // Pass the image URL
                    style={{ backgroundImage: 'linear-gradient(to right, #20bf55, #01ba47)' }}
                >
                    <span role="img" aria-label="sparkles">✨</span> Send to Attribute Generation
                </button>
                <button className="button secondary" onClick={onReset}>Create Another</button>
            </div>
        </div>
    );
};


export default function ImageEditorApp() {
    const navigate = useNavigate();

    const [step, setStep] = useState('upload');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImages, setGeneratedImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [finalImage, setFinalImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // NEW STATE: to store the prompt for display in ImageGallery
    const [imageGenerationPrompt, setImageGenerationPrompt] = useState('');

    const handleReset = useCallback(() => {
        setStep('upload');
        setUploadedImage(null);
        setGeneratedImages([]);
        setSelectedImage(null);
        setFinalImage(null);
        setIsLoading(false);
        setError(null);
        setImageGenerationPrompt(''); // Reset the prompt on full reset
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
            const gcsUrls = results.map(item => item.gcs_url);
            setGeneratedImages(gcsUrls);
            setStep('results');
        } catch (err) {
            console.error("Error processing image:", err);
            setError(err.message || "An unknown error occurred.");
            setStep('menu');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBgGenerate = async ({ type, shades, prompt }) => {
        // Store prompt if it's a prompt-based background generation
        if (type === 'prompt' && prompt) {
            setImageGenerationPrompt(prompt);
        } else {
            // Clear prompt if using palette or other non-prompt methods
            setImageGenerationPrompt('');
        }

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
        // Store the prompt specifically for "Generate New Images"
        setImageGenerationPrompt(prompt);
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

    const handleSaveImage = (imageUrl, fileName) => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
                alert('Failed to save image. Please try again.');
            });
    };

    // MODIFIED: Pass GCS URL directly via navigate
    const handleSendToAttributes = (imageUrl) => {
        // Encode the image URL to be safe for URL parameters
        const encodedImageUrl = encodeURIComponent(imageUrl);
        // Navigate to the CategorySectionPage with the image URL as a query parameter
        navigate(`/admin/category-section-from-image?imageUrl=${encodedImageUrl}`);
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
            )
        }

        switch (step) {
            case 'upload': return <ImageUploader onImageUpload={handleImageUpload} />;
            case 'menu': return <MainMenu onChoice={handleMenuChoice} uploadedImage={uploadedImage} onReset={handleReset} />;
            case 'changeBg': return <BackgroundChanger onGenerate={handleBgGenerate} onBack={() => setStep('menu')} />;
            case 'generateNew': return <ProductGenerator onGenerate={handleProductGenerate} onBack={() => setStep('menu')} />;
            case 'results': return <ImageGallery
                images={generatedImages}
                selectedImage={selectedImage}
                onSelect={setSelectedImage}
                onConfirm={handleConfirmSelection}
                onReset={() => setStep('menu')}
                inputPrompt={imageGenerationPrompt} // Pass the stored prompt here
            />;
            case 'final': return <FinalImageViewer
                image={finalImage}
                onSave={handleSaveImage}
                onReset={handleReset}
                onSendToAttributes={handleSendToAttributes}
            />;
            default: return <ImageUploader onImageUpload={handleImageUpload} />;
        }
    };

    return (
        <div className="p-8" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                AI Product Image Studio
            </h2>
            <div style={{ marginBottom: '1.5rem' }}>
                <main>{renderStep()}</main>
            </div>
            <div style={{ marginTop: '2rem', textAlign: 'center', color: '#777', fontSize: '14px' }}>
                <p>Powered by React & AI</p>
            </div>
        </div>
    );
}