import { useState } from "react";

export default function TrendTracker() {
  const [timeframe, setTimeframe] = useState("today");

  // Data for today's trends
  const todayTrends = [
    {
      id: 1,
      keyword: "#AIinMarketing",
      volume: "25.4K",
      growth: "+128%",
      relevance: "High",
    },
    {
      id: 2,
      keyword: "Digital Transformation",
      volume: "18.7K",
      growth: "+42%",
      relevance: "Medium",
    },
    {
      id: 3,
      keyword: "Remote Work Tools",
      volume: "12.3K",
      growth: "+17%",
      relevance: "High",
    },
    {
      id: 4,
      keyword: "Automation Strategy",
      volume: "8.5K",
      growth: "+65%",
      relevance: "High",
    },
  ];

  // Data for weekly trends (different metrics)
  const weeklyTrends = [
    {
      id: 1,
      keyword: "#AIinMarketing",
      volume: "142.8K",
      growth: "+85%",
      relevance: "High",
    },
    {
      id: 2,
      keyword: "#SustainableBusiness",
      volume: "98.2K",
      growth: "+120%",
      relevance: "High",
    },
    {
      id: 3,
      keyword: "Digital Transformation",
      volume: "87.5K",
      growth: "+31%",
      relevance: "Medium",
    },
    {
      id: 4,
      keyword: "Customer Experience",
      volume: "64.3K",
      growth: "+42%",
      relevance: "High",
    },
  ];

  // Choose which dataset to display based on the selected timeframe
  const trends = timeframe === "today" ? todayTrends : weeklyTrends;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#3D0C11]">
          Trending Topics
        </h2>
        <div className="flex bg-[#F78CA2] bg-opacity-20 rounded-lg p-1">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              timeframe === "today"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setTimeframe("today")}
          >
            Today
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              timeframe === "week"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setTimeframe("week")}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {trends.map((trend) => (
          <div
            key={trend.id}
            className="border border-[#F78CA2] border-opacity-30 bg-white rounded-lg p-4 hover:bg-[#F9DEC9] transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-[#3D0C11]">{trend.keyword}</h3>
                <p className="text-sm text-[#3D0C11] opacity-70 mt-1">
                  {trend.volume} mentions
                </p>
              </div>
              <div className="text-right">
                <span className="text-[#D80032] font-medium">
                  {trend.growth}
                </span>
                <p className="text-xs mt-1">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      trend.relevance === "High"
                        ? "bg-[#D80032] bg-opacity-10 text-[#D80032]"
                        : "bg-[#F78CA2] bg-opacity-30 text-[#3D0C11]"
                    }`}
                  >
                    {trend.relevance} Relevance
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-[#D80032] hover:text-[#3D0C11] text-sm font-medium flex items-center">
        Explore all trends
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
