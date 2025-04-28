import React, { useState, useEffect } from "react";

export default function AnalyticsPreview({ stats }) {
  // Default stats to use if none are provided
  const defaultStats = {
    resolutionRate: {
      value: "87%",
      change: "+5% from last week",
    },
    responseTime: {
      value: "2.4s",
      change: "-0.3s from last week",
    },
    satisfaction: {
      value: "4.8/5",
      change: "+0.2 from last week",
    },
    interactions: {
      value: "248",
      change: "+15% from yesterday",
    },
  };

  // Use provided stats or default to our dummy data
  const [displayStats, setDisplayStats] = useState(stats || defaultStats);
  const [showDetails, setShowDetails] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  // Dummy data for detailed view
  const detailedData = {
    resolutionRate: {
      daily: [82, 85, 83, 88, 90, 89, 87],
      weekly: [80, 82, 85, 87],
    },
    responseTime: {
      daily: [2.8, 2.7, 2.5, 2.4, 2.3, 2.5, 2.4],
      weekly: [3.0, 2.8, 2.6, 2.4],
    },
    satisfaction: {
      daily: [4.5, 4.6, 4.7, 4.7, 4.8, 4.8, 4.8],
      weekly: [4.3, 4.5, 4.6, 4.8],
    },
    interactions: {
      daily: [210, 225, 235, 240, 238, 242, 248],
      weekly: [980, 1050, 1150, 1200],
    },
  };

  // Refresh data randomly (simulating real-time updates)
  const refreshData = () => {
    const updatedStats = {
      resolutionRate: {
        value: `${Math.floor(85 + Math.random() * 10)}%`,
        change: `${Math.random() > 0.5 ? "+" : "-"}${Math.floor(
          Math.random() * 8
        )}% from last week`,
      },
      responseTime: {
        value: `${(2 + Math.random()).toFixed(1)}s`,
        change: `${Math.random() > 0.5 ? "+" : "-"}${(
          Math.random() * 0.5
        ).toFixed(1)}s from last week`,
      },
      satisfaction: {
        value: `${(4.5 + Math.random() * 0.5).toFixed(1)}/5`,
        change: `${Math.random() > 0.5 ? "+" : "-"}${(
          Math.random() * 0.3
        ).toFixed(1)} from last week`,
      },
      interactions: {
        value: `${Math.floor(220 + Math.random() * 50)}`,
        change: `${Math.random() > 0.5 ? "+" : "-"}${Math.floor(
          Math.random() * 20
        )}% from yesterday`,
      },
    };
    setDisplayStats(updatedStats);
  };

  // Handle view detailed analytics click
  const handleViewDetailedClick = (e) => {
    e.preventDefault();
    setShowDetails(!showDetails);
  };

  // Handle card click to show/hide detailed view for that specific card
  const handleCardClick = (cardType) => {
    if (activeCard === cardType) {
      setActiveCard(null);
    } else {
      setActiveCard(cardType);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#3D0C11]">
          Performance Overview
        </h2>
        <div className="flex gap-2">
          <button
            onClick={refreshData}
            className="bg-[#F9DEC9] text-[#D80032] px-3 py-1 rounded-md hover:bg-[#F7CAA9] text-sm"
          >
            Refresh Data
          </button>
          <a
            href="#"
            onClick={handleViewDetailedClick}
            className="text-[#D80032] hover:text-[#3D0C11] text-sm px-3 py-1"
          >
            {showDetails ? "Hide Details" : "View Detailed Analytics"} →
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="bg-[#F9DEC9] p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick("resolutionRate")}
        >
          <p className="text-sm text-[#3D0C11]">Resolution Rate</p>
          <p className="text-2xl font-bold text-[#D80032]">
            {displayStats.resolutionRate.value}
          </p>
          <p className="text-xs text-[#3D0C11]">
            {displayStats.resolutionRate.change}
          </p>
        </div>

        <div
          className="bg-[#F9DEC9] p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick("responseTime")}
        >
          <p className="text-sm text-[#3D0C11]">Average Response Time</p>
          <p className="text-2xl font-bold text-[#D80032]">
            {displayStats.responseTime.value}
          </p>
          <p className="text-xs text-[#3D0C11]">
            {displayStats.responseTime.change}
          </p>
        </div>

        <div
          className="bg-[#F9DEC9] p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick("satisfaction")}
        >
          <p className="text-sm text-[#3D0C11]">Customer Satisfaction</p>
          <p className="text-2xl font-bold text-[#D80032]">
            {displayStats.satisfaction.value}
          </p>
          <p className="text-xs text-[#3D0C11]">
            {displayStats.satisfaction.change}
          </p>
        </div>

        <div
          className="bg-[#F9DEC9] p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleCardClick("interactions")}
        >
          <p className="text-sm text-[#3D0C11]">Interactions Today</p>
          <p className="text-2xl font-bold text-[#D80032]">
            {displayStats.interactions.value}
          </p>
          <p className="text-xs text-[#3D0C11]">
            {displayStats.interactions.change}
          </p>
        </div>
      </div>

      {activeCard && (
        <div className="mt-4 p-4 bg-[#F9DEC9] rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-[#3D0C11]">
              {activeCard === "resolutionRate" && "Resolution Rate Details"}
              {activeCard === "responseTime" && "Response Time Details"}
              {activeCard === "satisfaction" && "Satisfaction Details"}
              {activeCard === "interactions" && "Interactions Details"}
            </h3>
            <button
              onClick={() => setActiveCard(null)}
              className="text-[#D80032] hover:text-[#3D0C11] text-sm"
            >
              Close
            </button>
          </div>
          <div className="text-sm text-[#3D0C11]">
            <p className="mb-2 font-medium">Last 7 Days:</p>
            <div className="flex justify-between mb-4">
              {detailedData[activeCard].daily.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-[#D80032] font-medium">{value}</div>
                  <div className="text-xs">Day {index + 1}</div>
                </div>
              ))}
            </div>
            <p className="mb-2 font-medium">Last 4 Weeks:</p>
            <div className="flex justify-between">
              {detailedData[activeCard].weekly.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-[#D80032] font-medium">{value}</div>
                  <div className="text-xs">Week {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showDetails && (
        <div className="mt-6 bg-white p-4 border border-[#F9DEC9] rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-[#3D0C11]">Detailed Analytics</h3>
            <button
              onClick={() => setShowDetails(false)}
              className="text-[#D80032] px-3 py-1 rounded-md hover:bg-[#F9DEC9]"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border rounded p-3">
              <h4 className="font-medium text-[#3D0C11] mb-2">
                Resolution Rate Trend
              </h4>
              <div className="h-32 flex items-end justify-between">
                {detailedData.resolutionRate.daily.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      style={{ height: value - 60 }}
                      className="w-6 bg-[#D80032] rounded-t"
                    ></div>
                    <div className="text-xs mt-1">Day {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border rounded p-3">
              <h4 className="font-medium text-[#3D0C11] mb-2">
                Response Time Trend
              </h4>
              <div className="h-32 flex items-end justify-between">
                {detailedData.responseTime.daily.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      style={{ height: value * 10 }}
                      className="w-6 bg-[#D80032] rounded-t"
                    ></div>
                    <div className="text-xs mt-1">Day {index + 1}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border rounded p-3">
              <h4 className="font-medium text-[#3D0C11] mb-2">
                Top Customer Issues
              </h4>
              <ul className="text-sm">
                <li className="mb-1">• Account access problems - 35%</li>
                <li className="mb-1">• Payment processing issues - 28%</li>
                <li className="mb-1">• Product questions - 22%</li>
                <li className="mb-1">• Feature requests - 15%</li>
              </ul>
            </div>
            <div className="border rounded p-3">
              <h4 className="font-medium text-[#3D0C11] mb-2">
                Response Stats
              </h4>
              <ul className="text-sm">
                <li className="mb-1">• Avg. messages per conversation: 5.2</li>
                <li className="mb-1">• First response success rate: 65%</li>
                <li className="mb-1">• Escalation rate: 12%</li>
                <li className="mb-1">• Repeat customer rate: 38%</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-[#D80032] text-white px-6 py-2 rounded-lg hover:bg-[#3D0C11] transition-colors"
              onClick={() => {
                alert("This would download a full report in a real app");
              }}
            >
              Download Full Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
