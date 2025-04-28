import { useState } from "react";

export default function AiSuggestions() {
  // State to track which suggestions are visible
  const [activeSuggestions, setActiveSuggestions] = useState([
    {
      id: 1,
      type: "Content Idea",
      title: "Industry Roundup: Top 5 Trends This Week",
      description: "Based on trending topics and your audience interests.",
      confidence: 92,
      applied: false,
    },
    {
      id: 2,
      type: "Optimal Time",
      title: "Schedule posts for Wednesday at 2PM",
      description: "Your audience is most active during this timeframe.",
      confidence: 87,
      applied: false,
    },
    {
      id: 3,
      type: "Engagement Boost",
      title: "Add a poll to your next LinkedIn post",
      description: "Polls receive 300% more engagement than standard posts.",
      confidence: 94,
      applied: false,
    },
  ]);

  // Count visible suggestions
  const visibleCount = activeSuggestions.length;

  // Handle apply button click
  const handleApply = (id) => {
    setActiveSuggestions(
      activeSuggestions.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, applied: true } : suggestion
      )
    );
    // In a real application, you would add additional logic here
    // to actually implement the suggestion
  };

  // Handle dismiss button click
  const handleDismiss = (id) => {
    setActiveSuggestions(
      activeSuggestions.filter((suggestion) => suggestion.id !== id)
    );
  };

  // Handle menu options
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Reset all suggestions (for demo purposes)
  const resetSuggestions = () => {
    setActiveSuggestions([
      {
        id: 1,
        type: "Content Idea",
        title: "Industry Roundup: Top 5 Trends This Week",
        description: "Based on trending topics and your audience interests.",
        confidence: 92,
        applied: false,
      },
      {
        id: 2,
        type: "Optimal Time",
        title: "Schedule posts for Wednesday at 2PM",
        description: "Your audience is most active during this timeframe.",
        confidence: 87,
        applied: false,
      },
      {
        id: 3,
        type: "Engagement Boost",
        title: "Add a poll to your next LinkedIn post",
        description: "Polls receive 300% more engagement than standard posts.",
        confidence: 94,
        applied: false,
      },
    ]);
    setMenuOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-[#3D0C11]">
            AI-Powered Suggestions
          </h2>
          {visibleCount > 0 && (
            <span className="ml-2 bg-[#F9DEC9] text-[#D80032] text-xs px-2 py-1 rounded-full">
              {visibleCount} New
            </span>
          )}
        </div>
        <button
          className="text-[#3D0C11] hover:text-[#D80032] transition-colors"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-6 top-12 bg-white shadow-lg rounded-md border border-[#F78CA2] border-opacity-30 z-10">
            <ul>
              <li
                className="px-4 py-2 hover:bg-[#F9DEC9] text-[#3D0C11] cursor-pointer"
                onClick={resetSuggestions}
              >
                Reset Suggestions
              </li>
              <li
                className="px-4 py-2 hover:bg-[#F9DEC9] text-[#3D0C11] cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Close Menu
              </li>
            </ul>
          </div>
        )}
      </div>

      {visibleCount === 0 ? (
        <div className="text-center py-8">
          <p className="text-[#3D0C11] opacity-70">
            No suggestions available right now.
          </p>
          <button
            className="mt-4 bg-[#D80032] text-white px-4 py-2 rounded-md text-sm hover:bg-opacity-90 transition-colors"
            onClick={resetSuggestions}
          >
            Get New Suggestions
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {activeSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="border border-[#F78CA2] bg-[#F9DEC9] bg-opacity-40 rounded-lg p-4"
            >
              <div className="flex justify-between">
                <span className="bg-[#D80032] text-white text-xs px-2 py-1 rounded-full">
                  {suggestion.type}
                </span>
                <span className="text-sm font-medium text-[#3D0C11]">
                  {suggestion.confidence}% Confidence
                </span>
              </div>
              <h3 className="font-medium mt-3 text-[#3D0C11]">
                {suggestion.title}
              </h3>
              <p className="text-sm text-[#3D0C11] opacity-70 mt-1">
                {suggestion.description}
              </p>
              <div className="flex space-x-2 mt-4">
                {suggestion.applied ? (
                  <button
                    className="bg-[#F78CA2] text-[#3D0C11] px-3 py-1 rounded-md text-sm cursor-default"
                    disabled
                  >
                    Applied ✓
                  </button>
                ) : (
                  <button
                    className="bg-[#D80032] hover:bg-maroondark text-white px-3 py-1 rounded-md text-sm hover:bg-opacity-90 transition-colors"
                    onClick={() => handleApply(suggestion.id)}
                  >
                    Apply
                  </button>
                )}
                <button
                  className="border border-[#F78CA2] text-[#3D0C11] px-3 py-1 rounded-md text-sm hover:bg-[#F9DEC9] transition-colors"
                  onClick={() => handleDismiss(suggestion.id)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
