import { useState } from "react";

export default function AudienceEngagement() {
  const [period, setPeriod] = useState("week");

  // Weekly engagement data
  const weeklyMetrics = [
    { metric: "Comments", value: 428, trend: "+21%", color: "#D80032" },
    { metric: "Shares", value: 856, trend: "+14%", color: "#D80032" },
    { metric: "Link Clicks", value: 1245, trend: "+32%", color: "#D80032" },
    { metric: "Profile Visits", value: 2810, trend: "+8%", color: "#D80032" },
  ];

  // Monthly engagement data
  const monthlyMetrics = [
    { metric: "Comments", value: 1820, trend: "+18%", color: "#D80032" },
    { metric: "Shares", value: 3245, trend: "+22%", color: "#D80032" },
    { metric: "Link Clicks", value: 5680, trend: "+27%", color: "#D80032" },
    { metric: "Profile Visits", value: 12450, trend: "+15%", color: "#D80032" },
  ];

  // Quarterly engagement data
  const quarterlyMetrics = [
    { metric: "Comments", value: 5430, trend: "+25%", color: "#D80032" },
    { metric: "Shares", value: 9865, trend: "+19%", color: "#D80032" },
    { metric: "Link Clicks", value: 15720, trend: "+34%", color: "#D80032" },
    { metric: "Profile Visits", value: 36740, trend: "+21%", color: "#D80032" },
  ];

  // Choose which dataset to display based on the selected period
  const getMetricsForPeriod = () => {
    switch (period) {
      case "week":
        return weeklyMetrics;
      case "month":
        return monthlyMetrics;
      case "quarter":
        return quarterlyMetrics;
      default:
        return weeklyMetrics;
    }
  };

  // Get insights based on period
  const getInsightForPeriod = () => {
    switch (period) {
      case "week":
        return "Your posts with visual content receive 2.3x more engagement than text-only posts. Try scheduling more image and video content.";
      case "month":
        return "Posts published between 2PM and 4PM have achieved 40% higher engagement rates. Consider adjusting your posting schedule.";
      case "quarter":
        return "Video content has outperformed all other content types by 85% this quarter. Increasing video frequency could boost overall engagement.";
      default:
        return "Your posts with visual content receive 2.3x more engagement than text-only posts. Try scheduling more image and video content.";
    }
  };

  const engagementMetrics = getMetricsForPeriod();

  // Generate weekly chart data with fixed heights
  const weeklyChartData = [
    { day: "Mon", height: "40%" },
    { day: "Tue", height: "58%" },
    { day: "Wed", height: "50%" },
    { day: "Thu", height: "75%" },
    { day: "Fri", height: "65%" },
    { day: "Sat", height: "33%" },
    { day: "Sun", height: "30%" },
  ];

  // Generate monthly chart data with fixed heights
  const monthlyChartData = [
    { week: "Week 1", height: "45%" },
    { week: "Week 2", height: "65%" },
    { week: "Week 3", height: "55%" },
    { week: "Week 4", height: "70%" },
  ];

  // Generate quarterly chart data with fixed heights
  const quarterlyChartData = [
    { month: "Month 1", height: "50%" },
    { month: "Month 2", height: "65%" },
    { month: "Month 3", height: "80%" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#3D0C11] mb-4 md:mb-0">
          Audience Engagement
        </h2>
        <div className="flex bg-[#F78CA2] bg-opacity-20 rounded-lg p-1">
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              period === "week"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setPeriod("week")}
          >
            This Week
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              period === "month"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setPeriod("month")}
          >
            This Month
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${
              period === "quarter"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setPeriod("quarter")}
          >
            This Quarter
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-lg mb-6 border border-[#F78CA2] border-opacity-30">
        <div>
          <h3 className="font-medium text-[#3D0C11]">AI-powered insights</h3>
          <p className="text-sm text-[#3D0C11] opacity-70 mt-1">
            {getInsightForPeriod()}
          </p>
        </div>
        <div className="text-[#D80032]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {engagementMetrics.map((item) => (
          <div
            key={item.metric}
            className="bg-white p-4 rounded-lg border border-[#F78CA2] border-opacity-30"
          >
            <div className="flex items-center">
              <div
                className="h-10 w-1 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <h4 className="text-sm text-[#3D0C11] opacity-70">
                  {item.metric}
                </h4>
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-[#3D0C11]">
                    {item.value}
                  </span>
                  <span className="ml-2 text-xs text-[#D80032]">
                    {item.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="bg-white h-64 rounded-lg border border-[#F78CA2] border-opacity-30 overflow-hidden">
          {period === "week" && (
            <div className="w-full px-6 flex items-end justify-around h-full pt-4 pb-8">
              {weeklyChartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center h-full">
                  <div className="flex-grow flex items-end">
                    <div
                      className="bg-[#D80032] w-8 rounded-t-md"
                      style={{ height: item.height }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-[#3D0C11]">{item.day}</p>
                </div>
              ))}
            </div>
          )}

          {period === "month" && (
            <div className="w-full px-6 flex items-end justify-around h-full pt-4 pb-8">
              {monthlyChartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center h-full">
                  <div className="flex-grow flex items-end">
                    <div
                      className="bg-[#D80032] w-12 md:w-16 rounded-t-md"
                      style={{ height: item.height }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-[#3D0C11]">{item.week}</p>
                </div>
              ))}
            </div>
          )}

          {period === "quarter" && (
            <div className="w-full px-6 flex items-end justify-around h-full pt-4 pb-8">
              {quarterlyChartData.map((item, index) => (
                <div key={index} className="flex flex-col items-center h-full">
                  <div className="flex-grow flex items-end">
                    <div
                      className="bg-[#D80032] w-16 md:w-24 rounded-t-md"
                      style={{ height: item.height }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2 text-[#3D0C11]">{item.month}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
