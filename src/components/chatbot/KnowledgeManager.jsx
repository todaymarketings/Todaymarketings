import React, { useState, useEffect } from "react";

// Sample knowledge base data
const INITIAL_KNOWLEDGE_BASES = [
  {
    id: "kb-1",
    name: "Product Information",
    description: "Details about our products, features, and specifications",
    sourceType: "documents",
    documentCount: 24,
    lastUpdated: "2025-04-15T10:30:00Z",
  },
  {
    id: "kb-2",
    name: "Support Documentation",
    description: "Troubleshooting guides and user manuals",
    sourceType: "website",
    documentCount: 56,
    lastUpdated: "2025-04-10T14:22:00Z",
  },
  {
    id: "kb-3",
    name: "FAQs",
    description: "Frequently asked questions and answers",
    sourceType: "documents",
    documentCount: 42,
    lastUpdated: "2025-04-08T09:15:00Z",
  },
  {
    id: "kb-4",
    name: "Pricing",
    description: "Current pricing plans and options",
    sourceType: "api",
    documentCount: 8,
    lastUpdated: "2025-04-18T16:45:00Z",
  },
];

export default function KnowledgeManager({
  isOpen,
  onClose,
  onSelect,
  onAddNew,
}) {
  const [knowledgeBases, setKnowledgeBases] = useState(INITIAL_KNOWLEDGE_BASES);
  const [searchTerm, setSearchTerm] = useState("");

  // Load knowledge bases from localStorage if available
  useEffect(() => {
    const savedKnowledgeBases = localStorage.getItem("knowledgeBases");
    if (savedKnowledgeBases) {
      try {
        const parsedData = JSON.parse(savedKnowledgeBases);
        setKnowledgeBases(parsedData);
      } catch (e) {
        console.error("Error parsing saved knowledge bases:", e);
      }
    }
  }, []);

  // Save knowledge bases to localStorage when they change
  useEffect(() => {
    localStorage.setItem("knowledgeBases", JSON.stringify(knowledgeBases));
  }, [knowledgeBases]);

  const filteredKnowledgeBases = knowledgeBases.filter(
    (kb) =>
      kb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kb.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (knowledgeBase) => {
    onSelect(knowledgeBase.name);
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Add a new knowledge base to the list
  const addKnowledgeBase = (newKb) => {
    setKnowledgeBases([...knowledgeBases, newKb]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-[#D80032]">
            Knowledge Base Manager
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search knowledge bases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-3/4 p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
          />

          <button
            onClick={() => onAddNew && onAddNew()}
            className="bg-[#D80032] text-white px-4 py-2 rounded hover:bg-[#B80025] transition-colors"
          >
            Add New
          </button>
        </div>

        <div className="overflow-auto flex-grow">
          {filteredKnowledgeBases.length === 0 ? (
            <div className="p-4 text-center text-gray-600">
              No knowledge bases found. Add a new one to get started.
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-[#F9DEC9]">
                <tr>
                  <th className="py-2 px-4 text-left text-sm font-medium text-[#3D0C11]">
                    Name
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-[#3D0C11]">
                    Description
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-[#3D0C11]">
                    Type
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-[#3D0C11]">
                    Documents
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-[#3D0C11]">
                    Last Updated
                  </th>
                  <th className="py-2 px-4 text-left text-sm font-medium text-[#3D0C11]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F9DEC9]">
                {filteredKnowledgeBases.map((kb) => (
                  <tr key={kb.id} className="hover:bg-[#F9DEC9]/20">
                    <td className="py-2 px-4 text-sm">{kb.name}</td>
                    <td className="py-2 px-4 text-sm">{kb.description}</td>
                    <td className="py-2 px-4 text-sm capitalize">
                      {kb.sourceType}
                    </td>
                    <td className="py-2 px-4 text-sm">{kb.documentCount}</td>
                    <td className="py-2 px-4 text-sm">
                      {formatDate(kb.lastUpdated)}
                    </td>
                    <td className="py-2 px-4 text-sm">
                      <button
                        onClick={() => handleSelect(kb)}
                        className="text-[#D80032] hover:text-[#B80025] mr-2"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-[#F78CA2] text-[#D80032] rounded hover:bg-[#F9DEC9] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
