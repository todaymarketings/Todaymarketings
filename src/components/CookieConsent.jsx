import { useState, useEffect } from "react";

// Cookie management utilities
const CookieManager = {
  setCookie: (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  getCookie: (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  eraseCookie: (name) => {
    document.cookie = name + "=; Max-Age=-99999999; path=/";
  },
};

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    preferences: false,
  });
  const [animation, setAnimation] = useState("");

  // Your color theme
  const themeColors = {
    primary: "#D80032",
    secondary: "#F78CA2",
    dark: "#3D0C11",
  };

  useEffect(() => {
    // Check if consent was previously given
    const consentGiven = CookieManager.getCookie("cookie_consent");

    if (!consentGiven) {
      setTimeout(() => {
        setShowBanner(true);
        setAnimation("animate-slide-up");
      }, 1000);
    } else {
      try {
        const savedPreferences = JSON.parse(
          CookieManager.getCookie("cookie_preferences")
        );
        if (savedPreferences) {
          setPreferences(savedPreferences);
        }
      } catch (e) {
        console.error("Error parsing cookie preferences", e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };

    setAnimation("animate-slide-down");
    setTimeout(() => {
      savePreferences(allConsent);
    }, 500);
  };

  const handleSavePreferences = () => {
    setAnimation("animate-slide-down");
    setTimeout(() => {
      savePreferences(preferences);
    }, 500);
  };

  const savePreferences = (prefs) => {
    // Save preferences
    CookieManager.setCookie("cookie_consent", "true", 365);
    CookieManager.setCookie("cookie_preferences", JSON.stringify(prefs), 365);

    // Apply preferences
    if (prefs.analytics) {
      // Initialize analytics cookies/scripts
      console.log("Analytics cookies enabled");
    } else {
      // Remove analytics cookies
      console.log("Analytics cookies disabled");
    }

    if (prefs.marketing) {
      // Initialize marketing cookies/scripts
      console.log("Marketing cookies enabled");
    } else {
      // Remove marketing cookies
      console.log("Marketing cookies disabled");
    }

    if (prefs.preferences) {
      // Initialize preferences cookies/scripts
      console.log("Preferences cookies enabled");
    } else {
      // Remove preferences cookies
      console.log("Preferences cookies disabled");
    }

    setShowBanner(false);
    setIsOpen(false);
  };

  const handleTogglePreference = (type) => {
    if (type === "necessary") return; // Cannot toggle necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const openSettings = () => {
    setIsOpen(true);
  };

  const openBanner = () => {
    setShowBanner(true);
    setAnimation("animate-slide-up");
  };

  // Add these styles to your global CSS or component
  const styles = `
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    
    @keyframes slideDown {
      from { transform: translateY(0); }
      to { transform: translateY(100%); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .animate-slide-up {
      animation: slideUp 0.5s forwards;
    }
    
    .animate-slide-down {
      animation: slideDown 0.5s forwards;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.3s forwards;
    }
    
    .animate-pulse {
      animation: pulse 2s infinite;
    }
    
    .custom-switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 24px;
    }
    
    .custom-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #F78CA2;
      transition: .4s;
      border-radius: 24px;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    
    input:checked + .slider {
      background-color: #D80032;
    }
    
    input:checked + .slider:before {
      transform: translateX(22px);
    }
    
    .cookie-indicator {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 80px;
      display: flex;
      align-items: center;
      z-index: 40;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .indicator-line {
      width: 5px;
      height: 100%;
      background-color: #D80032;
      border-radius: 4px 0 0 4px;
      transition: all 0.3s ease;
    }
    
    .cookie-content {
      background-color: #D80032;
      color: white;
      padding: 10px 12px;
      border-radius: 8px 0 0 8px;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      max-width: 0;
      overflow: hidden;
      opacity: 0;
      white-space: nowrap;
      transition: max-width 0.3s ease, opacity 0.2s ease, padding 0.3s ease;
    }
    
    .cookie-indicator:hover .cookie-content {
      max-width: 200px;
      opacity: 1;
      padding: 10px 12px;
    }
    
    .cookie-indicator:hover .indicator-line {
      width: 0;
    }
    
    .modal-backdrop {
      backdrop-filter: blur(3px);
    }
    
    .cookie-card {
      transition: all 0.2s ease;
    }
    
    .cookie-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }
    
    .button-icon {
      transition: transform 0.2s ease;    
    }
    
    .button-wrapper:hover .button-icon {
      transform: translateX(3px);
    }
  `;

  return (
    <>
      <style>{styles}</style>

      {showBanner && (
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg p-0 border-t border-gray-200 z-50 ${animation}`}
        >
          <div className="max-w-6xl mx-auto relative">
            {/* Cookie icon decoration */}
            <div
              className="absolute -top-12 left-8 bg-white p-3 rounded-full shadow-lg animate-pulse"
              style={{ backgroundColor: themeColors.secondary, color: "white" }}
            >
              <svg
                className="w-8 h-8"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 00-4.89 9.5 1 1 0 11-1.42 1.4 8 8 0 1112.62-9.4 1 1 0 11-1.42 1.4A6 6 0 0010 4z" />
                <circle cx="7.5" cy="7.5" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="14.5" cy="7.5" r="1.5" />
                <circle cx="7.5" cy="12" r="1.5" />
              </svg>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h3
                  className="text-xl font-bold"
                  style={{ color: themeColors.dark }}
                >
                  Cookie Consent
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  We use cookies to enhance your browsing experience, serve
                  personalized ads or content, and analyze our traffic. By
                  clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-nowrap gap-3 whitespace-nowrap">
                <button
                  onClick={openSettings}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition transform hover:scale-105 border border-gray-300 font-medium flex items-center button-wrapper"
                  style={{ minWidth: "100px" }}
                >
                  <svg
                    className="w-4 h-4 mr-2 button-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm text-white rounded-lg transition transform hover:scale-105 font-medium flex items-center button-wrapper"
                  style={{
                    backgroundColor: themeColors.primary,
                    minWidth: "100px",
                  }}
                >
                  <svg
                    className="w-4 h-4 mr-2 button-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in modal-backdrop">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2
                  className="text-2xl font-bold"
                  style={{ color: themeColors.primary }}
                >
                  Cookie Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600">
                  Manage your cookie preferences. Necessary cookies are required
                  for the website to function properly.
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cookie-card">
                  <div>
                    <h3 className="font-medium text-lg">Necessary Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Required for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>
                  <div className="relative">
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled={true}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cookie-card">
                  <div>
                    <h3 className="font-medium text-lg">Analytics Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Help us understand how visitors interact with the website.
                    </p>
                  </div>
                  <div className="relative">
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handleTogglePreference("analytics")}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cookie-card">
                  <div>
                    <h3 className="font-medium text-lg">Marketing Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Used to track visitors across websites for advertising
                      purposes.
                    </p>
                  </div>
                  <div className="relative">
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handleTogglePreference("marketing")}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition cookie-card">
                  <div>
                    <h3 className="font-medium text-lg">Preferences Cookies</h3>
                    <p className="text-sm text-gray-500">
                      Remember your preferences and settings.
                    </p>
                  </div>
                  <div className="relative">
                    <label className="custom-switch">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={() => handleTogglePreference("preferences")}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition transform hover:scale-105 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-5 py-2 text-white rounded-lg transition transform hover:scale-105 font-medium"
                  style={{ backgroundColor: themeColors.primary }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = themeColors.dark)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      themeColors.primary)
                  }
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Even more minimal indicator - just a 5px line that expands on hover */}
      {!showBanner && (
        <div
          onClick={openBanner}
          className="cookie-indicator"
          aria-label="Cookie Settings"
        >
          {/* The 5px line that's always visible */}
          <div className="indicator-line"></div>
          {/* Content that appears on hover */}
          <div className="cookie-content">
            <svg
              className="w-5 h-5 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Manage Cookies
          </div>
        </div>
      )}
    </>
  );
}
