// src/components/ImageEditor/api.js

// Make sure this URL matches your deployed Cloud Run service URL
const API_BASE_URL = 'https://imagen-ai-723767509826.us-central1.run.app';

export async function processImageRequest(params) {
    console.log("🚀 Calling Cloud Run API with params:", params);

    try {
        const response = await fetch(`${API_BASE_URL}/process_image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // If your Cloud Run service requires authentication (e.g., if not public),
                // you'll need to add an Authorization header here.
                // Example: 'Authorization': 'Bearer YOUR_AUTH_TOKEN_HERE'
            },
            body: JSON.stringify(params) // Send the parameters as JSON
        });

        const result = await response.json();

        if (response.ok) { // Check if the HTTP status code is 2xx (successful)
            console.log('✅ Cloud Run API returned:', result);
            if (result.processed_images_base64 && Array.isArray(result.processed_images_base64)) {
                return result.processed_images_base64;
            } else {
                // Handle cases where the API might return successfully but not with the expected image format
                console.error("API response missing 'processed_images_base64' array or it's not an array:", result);
                throw new Error("Invalid response from API. Please try again or check the backend logs.");
            }
        } else {
            // If the response is not OK, throw an error with details from the API
            const errorDetail = result.detail || result.message || JSON.stringify(result);
            console.error('API responded with an error:', errorDetail);
            throw new Error(`API Error: ${errorDetail}`);
        }
    } catch (error) {
        console.error('An error occurred during the API call:', error);
        // Re-throw to be caught by the runImageProcessing function's catch block
        throw new Error(`Network or processing error: ${error.message || 'Unknown error'}`);
    }
}