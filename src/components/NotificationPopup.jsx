import { useState, useEffect, useRef } from "react";

const NotificationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Campaign Performance",
      message: "Your email campaign has reached 85% open rate!",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: 2,
      title: "New Lead",
      message: "A new lead has been added to your CRM.",
      time: "1 hour ago",
      isRead: false,
    },
    {
      id: 3,
      title: "Task Reminder",
      message: "Don't forget to update social media content calendar.",
      time: "3 hours ago",
      isRead: true,
    },
    {
      id: 4,
      title: "System Update",
      message: "Platform will undergo maintenance at 2AM EST.",
      time: "Yesterday",
      isRead: true,
    },
  ]);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calculate unread count
  const unreadCount = notifications.filter((note) => !note.isRead).length;

  // Mark a single notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((note) =>
        note.id === id ? { ...note, isRead: true } : note
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map((note) => ({ ...note, isRead: true })));
  };

  return (
    <div className="relative" ref={popupRef}>
      {/* Bell icon button with notification badge */}
      <button
        className="text-[#3D0C11] hover:text-[#D80032] relative transition-colors duration-200"
        onClick={togglePopup}
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 lg:h-7 lg:w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          ></path>
        </svg>

        {/* Notification counter badge with pulse animation */}
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#D80032] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
            {unreadCount}
          </div>
        )}
      </button>

      {/* Notification popup with animation */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-[#F78CA2] transform transition-all duration-300 ease-in-out">
          <div className="py-3 px-4 bg-gradient-to-r from-[#F9DEC9] to-white border-b border-[#F78CA2]">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-[#3D0C11] flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#F9DEC9] text-[#3D0C11]">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          <div
            className="max-h-80 overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {notifications.length > 0 ? (
              <div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex p-4 border-b border-[#F9DEC9] hover:bg-[#F9DEC9] hover:bg-opacity-50 cursor-pointer transition-colors duration-200 ${
                      !notification.isRead ? "bg-[#F9DEC9] bg-opacity-30" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`h-3 w-3 rounded-full ${
                          !notification.isRead
                            ? "bg-[#D80032] animate-pulse"
                            : "bg-gray-300"
                        }`}
                      ></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-[#3D0C11]">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 ml-2">
                          {notification.time}
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-sm text-gray-500 flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#F78CA2] mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <span className="text-[#3D0C11]">
                  No notifications at the moment
                </span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#F9DEC9] bg-gradient-to-r from-[#F9DEC9] to-white">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className={`w-full px-4 py-2 text-xs font-medium rounded-lg text-center transition-all duration-200 ${
                unreadCount > 0
                  ? "bg-[#D80032] text-white shadow-md hover:bg-[#3D0C11]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {unreadCount > 0 ? "Mark all as read" : "No new notifications"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;
