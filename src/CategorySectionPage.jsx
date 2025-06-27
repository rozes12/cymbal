// // // src/CategorySectionPage.jsx
// // import React, { useState, useEffect } from "react";
// // // Remove or comment out these imports if you're not using shadcn/ui:
// // // import { Button } from "@/components/ui/button";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { Label } from "@/components/ui/label";
// // // import { ScrollArea } from "@/components/ui/scroll-area";

// // export default function CategorySectionPage() {
// //   const [prompt, setPrompt] = useState("");
// //   const [output, setOutput] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [imageForAttributes, setImageForAttributes] = useState(null); // New state for image

// //   const api_url = "https://attribute-generation-723767509826.us-west1.run.app"; // Your API URL
// //   const vision_api_url = "YOUR_VISION_API_URL_HERE"; // <--- IMPORTANT: Replace with your actual Vision API URL for image analysis

// //   // Function to call the attribute generation API
// //   const getAttributes = async (inputPrompt, inputImageBase64 = null) => {
// //     setIsLoading(true);
// //     setError(null);
// //     setOutput(""); // Clear previous output

// //     try {
// //       let body;
// //       let targetApiUrl;

// //       if (inputImageBase64) {
// //         // If generating from image, send base64 to a specific vision-based attribute generation endpoint
// //         targetApiUrl = `${api_url}/from_image`; // Example: your API might have a /from_image endpoint
// //         body = JSON.stringify({ image_base64: inputImageBase64 });
// //       } else {
// //         // If generating from text prompt
// //         targetApiUrl = api_url; // Default API for text prompt
// //         body = `prompt=${encodeURIComponent(inputPrompt)}`;
// //       }

// //       const headers = inputImageBase64
// //         ? { "Content-Type": "application/json" } // For JSON body when sending image
// //         : { "Content-Type": "application/x-www-form-urlencoded" }; // For form-urlencoded when sending text

// //       const response = await fetch(targetApiUrl, {
// //         method: "POST",
// //         headers: headers,
// //         body: body,
// //       });

// //       if (!response.ok) {
// //         const errorText = await response.text();
// //         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
// //       }

// //       const data = await response.json();
// //       setOutput(JSON.stringify(data, null, 2));
// //     } catch (err) {
// //       console.error("Error fetching product attributes:", err);
// //       setError(`Failed to fetch attributes: ${err.message}. Please check the API server and your input.`);
// //       setOutput("");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     if (!prompt.trim() && !imageForAttributes) { // Check if either prompt or image is available
// //       setError("Please enter a product description or provide an image.");
// //       return;
// //     }
// //     // Call getAttributes based on whether an image is present or a text prompt is used
// //     getAttributes(prompt, imageForAttributes);
// //   };

// //   useEffect(() => {
// //     // Check if coming from imagen.html
// //     if (window.location.pathname === '/admin/category-section-from-image') {
// //       const storedImage = sessionStorage.getItem('imageForAttributes');
// //       if (storedImage) {
// //         setImageForAttributes(storedImage);
// //         sessionStorage.removeItem('imageForAttributes'); // Clean up sessionStorage
// //         // Immediately generate attributes from the image
// //         getAttributes("", storedImage); // Pass empty prompt, rely on image
// //       } else {
// //         setError("No image found for attribute generation. Please try again from the AI Image Editor.");
// //       }
// //     }
// //   }, []); // Run once on component mount

// //   return (
// //     <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
// //       <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Product Category & Attributes Section</h2>

// //       {/* Conditionally render the input box */}
// //       {!imageForAttributes && (
// //         <div style={{ marginBottom: '1.5rem' }}>
// //           <label htmlFor="product-prompt" style={{ display: 'block', marginBottom: '0.5rem' }}>
// //             Enter Product Description:
// //           </label>
// //           <textarea
// //             id="product-prompt"
// //             value={prompt}
// //             onChange={(e) => setPrompt(e.target.value)}
// //             placeholder="e.g., A lightweight, waterproof jacket with breathable fabric, perfect for hiking in all weather conditions."
// //             rows={6}
// //             style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
// //           ></textarea>
// //           <button onClick={handleSubmit} disabled={isLoading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
// //             {isLoading ? "Generating..." : "Get Attributes"}
// //           </button>
// //         </div>
// //       )}

// //       {/* Show generate button if image is present and not currently loading */}
// //       {imageForAttributes && !isLoading && !output && (
// //           <div style={{marginBottom: '1.5rem', textAlign: 'center'}}>
// //             <p style={{marginBottom: '1rem'}}>Attributes will be generated from the selected image.</p>
// //             <img src={imageForAttributes} alt="Image for Attributes" style={{maxWidth: '200px', maxHeight: '200px', border: '1px solid #ddd', borderRadius: '8px'}} />
// //             <button onClick={handleSubmit} disabled={isLoading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
// //               {isLoading ? "Generating..." : "Regenerate Attributes from Image"}
// //             </button>
// //           </div>
// //       )}


// //       {error && (
// //         <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '1rem', borderRadius: '0.25rem', position: 'relative', marginBottom: '1.5rem' }} role="alert">
// //           <strong>Error!</strong>
// //           <span> {error}</span>
// //         </div>
// //       )}

// //       <div style={{ marginBottom: '1.5rem' }}>
// //         <label htmlFor="output-box" style={{ display: 'block', marginBottom: '0.5rem' }}>
// //           Output (Product Attributes):
// //         </label>
// //         <div style={{ height: '256px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9fafb', padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
// //           <pre style={{ whiteSpace: 'pre-wrap' }} id="output-box">
// //             {output || (isLoading ? "..." : "No output yet. Enter a description or generate from image.")}
// //           </pre>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // src/CategorySectionPage.jsx
// import React, { useState, useEffect } from "react";
// // Remove or comment out these imports if you're not using shadcn/ui:
// // import { Button } from "@/components/ui/button";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Label } from "@/components/ui/label";
// // import { ScrollArea } from "@/components/ui/scroll-area";

// export default function CategorySectionPage() {
//   const [prompt, setPrompt] = useState("");
//   const [output, setOutput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [imageForAttributesUrl, setImageForAttributesUrl] = useState(null); // Changed name to reflect URL, not Base64

//   // Your API URL for attribute generation (matches the curl sample)
//   const api_url = "https://attribute-generation-723767509826.us-west1.run.app";

//   // Note: vision_api_url is not used in the provided logic for getAttributes.
//   // It might be for a different flow or an older version.
//   // const vision_api_url = "YOUR_VISION_API_URL_HERE";

//   // Function to call the attribute generation API
//   // It now specifically handles either a text prompt OR an image URL
//   const getAttributes = async (inputPrompt, inputImageUrl = null) => {
//     setIsLoading(true);
//     setError(null);
//     setOutput(""); // Clear previous output

//     try {
//       const formData = new FormData(); // Use FormData for form-urlencoded as per curl sample

//       if (inputImageUrl) {
//         // If generating from an image URL, send 'prompt' as empty and 'image' with the URL
//         formData.append("prompt", "");
//         formData.append("image", inputImageUrl);
//       } else {
//         // If generating from text prompt
//         formData.append("prompt", inputPrompt);
//         // Do not append an 'image' field if not generating from image
//       }

//       const response = await fetch(api_url, { // API URL is directly the endpoint
//         method: "POST",
//         // Do NOT set 'Content-Type' header when using FormData. The browser sets it correctly
//         body: formData,
//       });

//       if (!response.ok) {
//         let errorText = `HTTP error! status: ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorText += `, message: ${errorData.detail || errorData.message || JSON.stringify(errorData)}`;
//         } catch (jsonError) {
//           errorText += `, raw response: ${await response.text()}`;
//         }
//         throw new Error(errorText);
//       }

//       const data = await response.json();
//       setOutput(JSON.stringify(data, null, 2));
//     } catch (err) {
//       console.error("Error fetching product attributes:", err);
//       setError(`Failed to fetch attributes: ${err.message}. Please check the API server and your input.`);
//       setOutput("");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSubmit = () => {
//     // If an image URL is present, prioritize generating from the image
//     if (imageForAttributesUrl) {
//       getAttributes("", imageForAttributesUrl); // Pass empty prompt, use the image URL
//     } else if (prompt.trim()) { // Otherwise, use the text prompt
//       getAttributes(prompt);
//     } else {
//       setError("Please enter a product description or navigate from the AI Image Editor to use an image.");
//     }
//   };

//   useEffect(() => {
//     // Check if the current URL has an 'imageUrl' query parameter
//     const params = new URLSearchParams(window.location.search);
//     const imgUrlFromParam = params.get('imageUrl');

//     if (imgUrlFromParam) {
//       setImageForAttributesUrl(imgUrlFromParam);
//       // Immediately trigger attribute generation using the image URL
//       getAttributes("", imgUrlFromParam); // Empty prompt, use the fetched image URL
//     } else {
//       // If no image URL is in the query params, ensure the image state is clear
//       setImageForAttributesUrl(null);
//     }
//     // No dependency array means this runs on every render, which is fine for URL parameter check
//     // If you only want it to run once on mount, add an empty dependency array: []
//   }, []); // Empty dependency array to run only once on mount

//   return (
//     <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
//       <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Product Category & Attributes Section</h2>

//       {/* Conditionally render: If imageForAttributesUrl is NOT present, show the text input */}
//       {!imageForAttributesUrl && (
//         <div style={{ marginBottom: '1.5rem' }}>
//           <label htmlFor="product-prompt" style={{ display: 'block', marginBottom: '0.5rem' }}>
//             Enter Product Description:
//           </label>
//           <textarea
//             id="product-prompt"
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="e.g., A lightweight, waterproof jacket with breathable fabric, perfect for hiking in all weather conditions."
//             rows={6}
//             style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
//           ></textarea>
//           <button onClick={handleSubmit} disabled={isLoading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//             {isLoading ? "Generating..." : "Get Attributes"}
//           </button>
//         </div>
//       )}

//       {/* Show the image and the button to generate attributes from it */}
//       {imageForAttributesUrl && (
//           <div style={{marginBottom: '1.5rem', textAlign: 'center'}}>
//             <p style={{marginBottom: '1rem', fontWeight: 'bold'}}>Generating Attributes From Image:</p> {/* Added text */}
//             <img src={imageForAttributesUrl} alt="Image for Attributes" style={{maxWidth: '250px', maxHeight: '250px', border: '1px solid #ddd', borderRadius: '8px', objectFit: 'contain'}} /> {/* Increased size */}
//             <button onClick={handleSubmit} disabled={isLoading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
//               {isLoading ? "Generating..." : "Get Attributes from Image"} {/* Changed button text */}
//             </button>
//           </div>
//       )}


//       {error && (
//         <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '1rem', borderRadius: '0.25rem', position: 'relative', marginBottom: '1.5rem' }} role="alert">
//           <strong>Error!</strong>
//           <span> {error}</span>
//         </div>
//       )}

//       <div style={{ marginBottom: '1.5rem' }}>
//         <label htmlFor="output-box" style={{ display: 'block', marginBottom: '0.5rem' }}>
//           Output (Product Attributes):
//         </label>
//         <div style={{ height: '256px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9fafb', padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
//           <pre style={{ whiteSpace: 'pre-wrap' }} id="output-box">
//             {output || (isLoading ? "..." : "No output yet. Enter a description or generate from image.")}
//           </pre>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/CategorySectionPage.jsx
import React, { useState, useEffect } from "react";
// Remove or comment out these imports if you're not using shadcn/ui:
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";

export default function CategorySectionPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // MODIFIED: imageForAttributes now stores the URL, not Base64
  const [imageForAttributesUrl, setImageForAttributesUrl] = useState(null);

  const api_url = "https://attribute-generation-723767509826.us-west1.run.app"; // Your API URL

  // Function to call the attribute generation API
  // MODIFIED: Accepts imageUrl instead of inputImageBase64
  const getAttributes = async (inputPrompt, imageUrlToProcess = null) => {
    setIsLoading(true);
    setError(null);
    setOutput(""); // Clear previous output

    try {
      let body;
      // All requests to this API will use application/x-www-form-urlencoded
      // as per your curl example.
      const headers = { "Content-Type": "application/x-www-form-urlencoded" };

      // Construct the body based on whether an image URL is present
      if (imageUrlToProcess) {
        body = `prompt=&image=${encodeURIComponent(imageUrlToProcess)}`; // Prompt is empty, image URL provided
      } else {
        body = `prompt=${encodeURIComponent(inputPrompt)}&image=`; // Image is empty, prompt provided
      }

      const response = await fetch(api_url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Error fetching product attributes:", err);
      setError(`Failed to fetch attributes: ${err.message}. Please check the API server and your input.`);
      setOutput("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    // MODIFIED: Check if either prompt or an image URL is available
    if (!prompt.trim() && !imageForAttributesUrl) {
      setError("Please enter a product description or provide an image.");
      return;
    }
    // Call getAttributes based on whether an image URL is present or a text prompt is used
    getAttributes(prompt, imageForAttributesUrl);
  };

  useEffect(() => {
    // Check if a 'imageUrl' query parameter exists
    const params = new URLSearchParams(window.location.search);
    const imageUrlFromParam = params.get('imageUrl');

    if (imageUrlFromParam) {
      setImageForAttributesUrl(imageUrlFromParam);
      // Immediately generate attributes from the image URL
      getAttributes("", imageUrlFromParam); // Pass empty prompt, rely on image URL
    } else {
      // If no image URL, clear the state to ensure text input is visible
      setImageForAttributesUrl(null);
    }
  }, []); // Run once on component mount

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Product Category & Attributes Section</h2>

      {/* Conditionally render the input box OR the image for attributes */}
      {!imageForAttributesUrl ? (
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="product-prompt" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Enter Product Description:
          </label>
          <textarea
            id="product-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A lightweight, waterproof jacket with breathable fabric, perfect for hiking in all weather conditions."
            rows={6}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          ></textarea>
          <button onClick={handleSubmit} disabled={isLoading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? "Generating..." : "Get Attributes"}
          </button>
        </div>
      ) : (
        <div style={{marginBottom: '1.5rem', textAlign: 'center'}}>
          <p style={{marginBottom: '1rem', fontWeight: 'bold'}}>Generating Attributes from Image:</p>
          <img src={imageForAttributesUrl} alt="Image for Attributes" style={{maxWidth: '200px', maxHeight: '200px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem'}} />
          <button onClick={handleSubmit} disabled={isLoading} style={{ marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {isLoading ? "Generating..." : "Regenerate Attributes from Image"}
          </button>
        </div>
      )}


      {error && (
        <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '1rem', borderRadius: '0.25rem', position: 'relative', marginBottom: '1.5rem' }} role="alert">
          <strong>Error!</strong>
          <span> {error}</span>
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="output-box" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Output (Product Attributes):
        </label>
        <div style={{ height: '256px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9fafb', padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <pre style={{ whiteSpace: 'pre-wrap' }} id="output-box">
            {output || (isLoading ? "..." : "No output yet. Enter a description or generate from image.")}
          </pre>
        </div>
      </div>
    </div>
  );
}