import React, { useState, useRef } from "react";
import { 
  Camera, 
  Upload, 
  Scan, 
  AlertCircle, 
  CheckCircle, 
  Leaf, 
  TrendingDown,
  Clock,
  Shield
} from "lucide-react";

const mockResults = {
  disease: "Early Blight (Alternaria solani)",
  confidence: 87,
  severity: 'Medium',
  treatment: [
    "Apply fungicide containing chlorothalonil or copper",
    "Remove affected leaves immediately",
    "Improve air circulation around plants",
    "Water at soil level to avoid wet foliage"
  ],
  prevention: [
    "Rotate crops annually",
    "Maintain proper plant spacing",
    "Apply preventive fungicide sprays",
    "Remove plant debris at season end"
  ]
};

export default function DiseaseDetection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setSelectedImage(result);
        setResults(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#fefcf0]">
      {/* Header */}
      <div className="pt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-blue-500 rounded-full px-6 py-3 mb-4">
            <Scan className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Disease Detection</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">AI Disease Detection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Upload an image to detect crop diseases using AI.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-md shadow">
              <div className="text-center space-y-4">
                <h3 className="text-lg font-semibold mb-2">Upload Crop Image</h3>

                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected crop" 
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => fileInputRef.current.click()}
                        className="flex-1 border px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-100"
                      >
                        <Upload className="w-4 h-4 mr-2" /> Choose Different Image
                      </button>
                      <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="flex-1 bg-green-500 text-white  px-4 py-8 rounded-md flex items-center justify-center hover:bg-green-600"
                      >
                        {isAnalyzing ? (
                          <>
                            <Scan className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                          </>
                        ) : (
                          <>
                            <Scan className="w-4 h-4 mr-2" /> Analyze
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition text-gray-500"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Camera className="w-12 h-12 mx-auto mb-4" />
                    <p className="mb-2">Click to upload or drag image here</p>
                    <p className="text-sm">Supports JPG, PNG, WebP</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white p-6 rounded-md shadow">
              <div className="flex items-center space-x-2 mb-3">
                <Leaf className="w-5 h-5 text-green-500" />
                <h4 className="font-semibold text-lg">Tips for Better Detection</h4>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Take photos in good natural light</li>
                <li>Focus on affected areas of the plant</li>
                <li>Include leaves, stems, or fruits showing symptoms</li>
                <li>Avoid blurry or overexposed images</li>
                <li>Multiple angles can improve accuracy</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isAnalyzing && (
              <div className="bg-white p-6 rounded-md shadow text-center">
                <Scan className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold mb-2">Analyzing Image</h3>
                <p className="text-gray-500">Please wait while the AI analyzes the image.</p>
              </div>
            )}

            {results && (
              <div className="space-y-6">
                {/* Detection Results */}
                <div className="bg-white p-6 rounded-md shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Detection Results</h3>
                      <p className="text-sm text-gray-500">AI Analysis Complete</p>
                    </div>
                    <span className={`px-2 py-1 rounded ${getSeverityColor(results.severity)}`}>
                      {results.severity} Severity
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="font-medium">{results.disease}</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1 text-sm text-gray-500">
                          <span>Confidence Level</span>
                          <span className="font-medium text-gray-800">{results.confidence}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${results.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Treatment */}
                <div className="bg-white p-6 rounded-md shadow">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-lg">Treatment Recommendations</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {results.treatment.map((t, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div className="bg-white p-6 rounded-md shadow">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingDown className="w-5 h-5 text-blue-500" />
                    <h4 className="font-semibold text-lg">Prevention Tips</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {results.prevention.map((p, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Clock className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Save Results</button>
                  <button className="flex-1 border px-4 py-2 rounded-md hover:bg-gray-100">Share with Expert</button>
                </div>
              </div>
            )}

            {!results && !isAnalyzing && (
              <div className="bg-white p-6 rounded-md shadow text-center">
                <Scan className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-gray-500">Upload an image of your crop to start AI disease detection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
