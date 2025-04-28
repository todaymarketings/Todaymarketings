import React, { useState } from "react";
import { Download, Share2, FileText, X } from "lucide-react";

// Import competitors data from the report component
// In a real implementation, you'd likely use context, props, or a state management library
// to share this data between components
const competitors = [
  {
    name: "TechCorp Inc.",
    marketShare: 28.5,
    growth: 5.2,
    products: 42,
    sentiment: "Positive",
    score: 85,
  },
  {
    name: "GlobalSolutions LLC",
    marketShare: 23.1,
    growth: 1.9,
    products: 37,
    sentiment: "Neutral",
    score: 72,
  },
  {
    name: "InnovateTech",
    marketShare: 18.7,
    growth: -0.8,
    products: 28,
    sentiment: "Negative",
    score: 64,
  },
  {
    name: "DigitalAdvance",
    marketShare: 15.4,
    growth: 3.4,
    products: 31,
    sentiment: "Positive",
    score: 79,
  },
  {
    name: "FutureSystems",
    marketShare: 14.3,
    growth: 2.1,
    products: 24,
    sentiment: "Neutral",
    score: 68,
  },
];

export default function ReportActions() {
  const [showShareModal, setShowShareModal] = useState(false);

  // Function to handle download as PDF (simplified as text for this example)
  const handleDownload = () => {
    // Create a detailed report content based on the competitor data
    const reportContent = `
AI COMPETITOR ANALYSIS REPORT
Generated on ${new Date().toLocaleDateString()}

MARKET DISTRIBUTION
${competitors
  .map((comp) => `- ${comp.name}: ${comp.marketShare}% market share`)
  .join("\n")}

KEY INSIGHTS
- Market Dominance: TechCorp Inc. maintains strong market leadership with 28.5% share, fueled by consistent product innovation and positive customer sentiment.
- Growth Concerns: InnovateTech's negative growth trend (-0.8%) signals potential market challenges, despite maintaining a sizeable market position.
- Rising Competitor: DigitalAdvance shows promising momentum with +3.4% growth, positioned to potentially overtake InnovateTech within 2-3 quarters.

GROWTH PERFORMANCE
${competitors
  .map(
    (comp) =>
      `- ${comp.name}: ${comp.growth > 0 ? "+" : ""}${comp.growth}% growth`
  )
  .join("\n")}

STRATEGIC RECOMMENDATIONS
1. Focus on TechCorp Inc.'s innovation pipeline - Their high product count (42) correlates strongly with market leadership.
2. Monitor DigitalAdvance's growth trajectory - With the second-highest growth rate, they represent both a threat and potential strategic partnership opportunity.
3. Consider InnovateTech's product portfolio for acquisition - Their negative growth trend may present favorable negotiation conditions despite their established market position.
4. Implement customer sentiment improvement strategy - Positive sentiment correlates with 87% of high-growth competitors.

Confidence score: 92% • Competitive intelligence report
Powered by AI Analysis Engine
    `;

    // Create a blob from the content
    const blob = new Blob([reportContent], { type: "text/plain" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ai-competitor-analysis-report.txt";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  // Function to handle sharing
  const handleShare = () => {
    setShowShareModal(true);
  };

  // Function to export data as CSV
  const handleExport = () => {
    // Create CSV header
    let csvContent =
      "Company,Market Share (%),Growth (%),Products,Sentiment,Score\n";

    // Add data rows
    competitors.forEach((comp) => {
      csvContent += `${comp.name},${comp.marketShare},${comp.growth},${comp.products},${comp.sentiment},${comp.score}\n`;
    });

    // Additional insights section
    csvContent += "\nReport Insights\n";
    csvContent += "Category,Description\n";
    csvContent += "Market Leader,TechCorp Inc. (28.5%)\n";
    csvContent += "Fastest Growing,TechCorp Inc. (5.2%)\n";
    csvContent += "Declining Growth,InnovateTech (-0.8%)\n";
    csvContent += "Highest Sentiment,TechCorp Inc. (Positive)\n";

    // Create a blob from the CSV content
    const blob = new Blob([csvContent], { type: "text/csv" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "competitor-data.csv";

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  // Function to close the share modal
  const closeShareModal = () => {
    setShowShareModal(false);
  };

  // Function to handle email sharing
  const handleEmailShare = () => {
    const subject = "AI Competitor Analysis Report";
    const body = `
Hello,

I'm sharing an AI-generated competitor analysis report with you. Here are the key highlights:

- Market Leader: TechCorp Inc. with 28.5% market share
- Fastest Growing: TechCorp Inc. with +5.2% growth
- Growth Concerns: InnovateTech showing -0.8% growth
- Rising Competitor: DigitalAdvance with +3.4% growth

The full report contains detailed market distribution data, growth performance analysis, and strategic recommendations.

Regards,
    `;

    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`
    );
    setShowShareModal(false);
  };

  return (
    <>
      <div className="flex justify-end space-x-2 mt-4 mb-6">
        <button
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors duration-200"
          onClick={handleExport}
        >
          <FileText size={16} className="mr-1" />
          <span>Export Data</span>
        </button>

        <button
          className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors duration-200"
          onClick={handleDownload}
        >
          <Download size={16} className="mr-1" />
          <span>Download Report</span>
        </button>

        <button
          className="flex items-center px-3 py-2 bg-red-600 hover:bg-maroondark text-white rounded-md text-sm transition-colors duration-200"
          onClick={handleShare}
        >
          <Share2 size={16} className="mr-1" />
          <span>Share Analysis</span>
        </button>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Share Competitor Analysis</h3>
              <button
                onClick={closeShareModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleEmailShare}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm"
              >
                Share via Email
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://example.com/reports/competitor-analysis"
                  );
                  alert("Report link copied to clipboard!");
                  setShowShareModal(false);
                }}
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 text-sm"
              >
                Copy Link
              </button>

              <button
                onClick={closeShareModal}
                className="w-full flex items-center justify-center py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
