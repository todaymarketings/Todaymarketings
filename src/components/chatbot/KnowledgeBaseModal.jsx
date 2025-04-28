import React, { useState } from "react";

export default function KnowledgeBaseModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sourceType, setSourceType] = useState("documents");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      setError("Knowledge base name is required");
      return;
    }

    // Create a new knowledge base object
    const newKnowledgeBase = {
      id: `kb-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      sourceType,
      documentCount: Math.floor(Math.random() * 20), // Random document count for dummy data
      lastUpdated: new Date().toISOString(),
    };

    // Pass the new knowledge base to parent component
    onSave(newKnowledgeBase);

    // Reset form
    setName("");
    setDescription("");
    setSourceType("documents");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-[#D80032]">
            Add Knowledge Base
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#3D0C11] mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3D0C11] mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3D0C11] mb-1">
              Source Type
            </label>
            <select
              value={sourceType}
              onChange={(e) => setSourceType(e.target.value)}
              className="w-full p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
            >
              <option value="documents">Documents</option>
              <option value="website">Website</option>
              <option value="api">API</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#F78CA2] text-[#D80032] rounded hover:bg-[#F9DEC9] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={onClose}
              className="px-4 py-2 bg-[#D80032] text-white rounded hover:bg-[#B80025] transition-colors"
            >
              Add Knowledge Base
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
