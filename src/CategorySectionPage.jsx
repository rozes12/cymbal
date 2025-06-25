// src/CategorySectionPage.jsx
import React, { useState } from "react";
// Remove or comment out these imports if you're not using shadcn/ui:
// import { Button } from "@/components/ui/button"; // Assuming you have a Button component
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";

export default function CategorySectionPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_url = "https://attribute-generation-723767509826.us-west1.run.app"; // Your API URL

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError("Please enter a product description.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutput(""); // Clear previous output

    try {
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `prompt=${encodeURIComponent(prompt)}`,
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

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}> {/* Basic inline styling */}
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Product Category & Attributes Section</h2>

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
            {output || (isLoading ? "..." : "No output yet. Enter a description and click 'Get Attributes'.")}
          </pre>
        </div>
      </div>
    </div>
  );
}