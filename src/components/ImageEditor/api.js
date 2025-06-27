// src/components/ImageEditor/api.js

const API_BASE_URL = 'https://imagen-ai-723767509826.us-central1.run.app';

export async function processImageRequest(params) {
    console.log("🚀 Calling Cloud Run API with params:", params);

    try {
        const response = await fetch(`${API_BASE_URL}/process_image`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('✅ Cloud Run API returned:', result);
            if (result.processed_images && Array.isArray(result.processed_images)) {
                return result.processed_images;
            } else {
                console.error("API response missing 'processed_images' array or it's not an array:", result);
                throw new Error("Invalid response from API. Please try again or check the backend logs.");
            }
        } else {
            const errorDetail = result.detail || result.message || JSON.stringify(result);
            console.error('API responded with an error:', errorDetail);
            throw new Error(`API Error: ${errorDetail}`);
        }
    } catch (error) {
        console.error('An error occurred during the API call:', error);
        throw new Error(`Network or processing error: ${error.message || 'Unknown error'}`);
    }
}