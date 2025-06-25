import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component (from shadcn/ui)
import { Label } from "@/components/ui/label"; // Assuming you have a Label component (from shadcn/ui)
import { ScrollArea } from "@/components/ui/scroll-area"; // For scrollable output if needed

export default function CategorySectionPage() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_url = "http://10.128.0.2:5000"; // Your API URL

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
          "Content-Type": "application/x-www-form-urlencoded", // Required for curl -d "key=value"
        },
        body: `prompt=${encodeURIComponent(prompt)}`, // URL-encode the prompt
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json(); // Assuming the API returns JSON
      setOutput(JSON.stringify(data, null, 2)); // Pretty print JSON output
    } catch (err) {
      console.error("Error fetching product attributes:", err);
      setError(`Failed to fetch attributes: ${err.message}. Please check the API server and your input.`);
      setOutput("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Product Category & Attributes Section</h2>

      <div className="mb-6">
        <Label htmlFor="product-prompt" className="mb-2 block">
          Enter Product Description:
        </Label>
        <Textarea
          id="product-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A lightweight, waterproof jacket with breathable fabric, perfect for hiking in all weather conditions."
          rows={6}
          className="w-full"
        />
        <Button onClick={handleSubmit} disabled={isLoading} className="mt-4">
          {isLoading ? "Generating..." : "Get Attributes"}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="mb-6">
        <Label htmlFor="output-box" className="mb-2 block">
          Output (Product Attributes):
        </Label>
        <ScrollArea className="h-64 border rounded bg-gray-50 p-4 font-mono text-sm">
          <pre className="whitespace-pre-wrap" id="output-box">
            {output || (isLoading ? "..." : "No output yet. Enter a description and click 'Get Attributes'.")}
          </pre>
        </ScrollArea>
      </div>
    </div>
  );
}