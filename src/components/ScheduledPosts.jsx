import { useState } from "react";

export default function ScheduledPosts() {
  const [view, setView] = useState("list");

  const scheduledPosts = [
    {
      id: 1,
      title: "Product Launch Announcement",
      platform: "All Platforms",
      date: "Today, 3:00 PM",
      status: "scheduled",
      aiEnhanced: true,
    },
    {
      id: 2,
      title: "Weekly Industry Insights",
      platform: "LinkedIn, Twitter",
      date: "Tomorrow, 10:00 AM",
      status: "scheduled",
      aiEnhanced: true,
    },
    {
      id: 3,
      title: "Customer Success Story",
      platform: "Instagram, Facebook",
      date: "Apr 20, 12:00 PM",
      status: "draft",
      aiEnhanced: false,
    },
    {
      id: 4,
      title: "Team Spotlight: Engineering",
      platform: "LinkedIn",
      date: "Apr 21, 2:00 PM",
      status: "scheduled",
      aiEnhanced: true,
    },
  ];

  // Sample calendar data structure
  const calendarDays = [
    { day: "Mon", date: 15, posts: 1 },
    { day: "Tue", date: 16, posts: 0 },
    { day: "Wed", date: 17, posts: 1 },
    { day: "Thu", date: 18, posts: 0 },
    { day: "Fri", date: 19, posts: 1 },
    { day: "Sat", date: 20, posts: 1 },
    { day: "Sun", date: 21, posts: 1 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#3D0C11]">
          Scheduled Posts
        </h2>
        <div className="flex bg-[#F78CA2] bg-opacity-20 rounded-lg p-1">
          <button
            className={`px-3 py-1 rounded-md ${
              view === "list"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setView("list")}
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              view === "calendar"
                ? "bg-white shadow-sm text-[#3D0C11]"
                : "text-[#3D0C11]"
            }`}
            onClick={() => setView("calendar")}
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {view === "list" ? (
        // List View
        <div className="space-y-3">
          {scheduledPosts.map((post) => (
            <div
              key={post.id}
              className="border border-[#F78CA2] border-opacity-30 bg-white rounded-lg p-4 hover:bg-[#F9DEC9] transition-colors"
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-[#3D0C11]">{post.title}</h3>
                    {post.aiEnhanced && (
                      <span className="ml-2 bg-[#F78CA2] bg-opacity-20 text-[#D80032] text-xs px-2 py-0.5 rounded-full">
                        AI Enhanced
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#3D0C11] opacity-70 mt-1">
                    {post.platform}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[#3D0C11]">
                    {post.date}
                  </p>
                  <span
                    className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
                      post.status === "scheduled"
                        ? "bg-green-100 text-green-700"
                        : "bg-[#F78CA2] bg-opacity-30 text-[#3D0C11]"
                    }`}
                  >
                    {post.status === "scheduled" ? "Scheduled" : "Draft"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Calendar View
        <div className="bg-white rounded-lg border border-[#F78CA2] border-opacity-30 overflow-hidden">
          <div className="grid grid-cols-7 gap-0">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className="border-r border-b border-[#F78CA2] border-opacity-20 p-3 last:border-r-0"
              >
                <p className="text-xs text-[#3D0C11] opacity-70 text-center">
                  {day.day}
                </p>
                <p className="text-center font-medium text-[#3D0C11] my-1">
                  {day.date}
                </p>

                {day.posts > 0 ? (
                  <div
                    className="bg-[#D80032] rounded-full h-2 w-2 mx-auto"
                    title={`${day.posts} post(s)`}
                  ></div>
                ) : (
                  <div className="h-2"></div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#F78CA2] border-opacity-20">
            <h3 className="font-medium text-[#3D0C11] mb-2">Upcoming Posts</h3>
            <div className="space-y-2">
              {scheduledPosts.slice(0, 2).map((post) => (
                <div
                  key={post.id}
                  className="flex justify-between items-center py-1"
                >
                  <p className="text-sm text-[#3D0C11]">{post.title}</p>
                  <p className="text-xs text-[#3D0C11] opacity-70">
                    {post.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <button className="mt-4 text-[#D80032] hover:text-[#3D0C11] text-sm font-medium flex items-center">
        View all scheduled posts
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
