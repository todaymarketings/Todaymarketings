import { useState, useEffect } from "react";
import logodark from "../assets/logodark.svg";

export default function Footer() {
  const [activePath, setActivePath] = useState("/");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Use the same links as in the navbar
  const links = [
    { name: "Home", href: "/", icon: "home" },
    { name: "About Us", href: "/about", icon: "info" },
    { name: "Pricing", href: "/pricing", icon: "dollar" },
    { name: "Blog", href: "/blog", icon: "document" },
    { name: "Contact", href: "/contact", icon: "mail" },
  ];

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle email submission
  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Clear any previous errors
    setEmailError("");

    // Here you would typically send the email to your server
    // For now, we'll just show the success popup
    setShowSuccessPopup(true);

    // Clear the email input
    setEmail("");

    // Hide the popup after 5 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 5000);
  };

  // Set active path based on current location and update when it changes
  useEffect(() => {
    // Initial path setting
    const path = window.location.pathname;
    setActivePath(path);

    // Create an event listener for location changes
    const handleLocationChange = () => {
      setActivePath(window.location.pathname);
    };

    // Add event listener for popstate (back/forward navigation)
    window.addEventListener("popstate", handleLocationChange);

    // For single-page applications with client-side routing
    // We need to intercept link clicks to update the active path
    const interceptClicks = () => {
      document.addEventListener("click", (e) => {
        // Check if the clicked element is an anchor tag or inside an anchor tag
        const link = e.target.closest("a");
        if (
          link &&
          link.href.includes(window.location.origin) &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          const url = new URL(link.href);
          if (url.pathname !== activePath) {
            setActivePath(url.pathname);
          }
        }
      });
    };

    interceptClicks();

    // Cleanup function
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  // Check if a link is active - same function as in Navbar
  const isActive = (href) => {
    if (href === "/" && activePath === "/") {
      return true;
    }
    return href !== "/" && activePath.startsWith(href);
  };

  // Icon components
  const getIcon = (iconName) => {
    switch (iconName) {
      case "home":
        return (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "info":
        return (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "dollar":
        return (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "document":
        return (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      case "mail":
        return (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      case "phone":
        return (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        );
      case "arrow-right":
        return (
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-200 transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[#3D0C11] text-white py-12 relative overflow-hidden">
      {/* Light effect on the right side */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-white opacity-5 absolute right-0 mr-16"></div>
        <div className="w-64 h-64 rounded-full bg-white opacity-10 blur-xl absolute right-0 mr-32"></div>
        <div className="w-32 h-32 rounded-full bg-white opacity-20 blur-lg absolute right-0 mr-24"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top section with email signup */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-0">
                Get update
              </h2>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className={`w-full py-3 px-4 bg-transparent border-b ${
                    emailError ? "border-red-500" : "border-gray-600"
                  } text-white focus:outline-none focus:border-[#f04da1]`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-3 text-[#f04da1] focus:outline-none hover:text-[#ff6db8] transition duration-150"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {emailError && (
                  <p className="absolute text-red-400 text-xs mt-1">
                    {emailError}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Middle section with links - MODIFIED GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-opacity-20 border-gray-300">
          {/* Logo and company description - INCREASED WIDTH AND JUSTIFIED TEXT */}
          <div className="col-span-1 md:col-span-6">
            <div className="flex-shrink-0 mb-6">
              <a href="/" className="text-white">
                <img src={logodark.src} alt="Logo" />
              </a>
            </div>
            <p className="text-gray-300 mb-4 text-justify">
              Today Marketings is an all-in-one AI marketing platform that helps
              businesses grow by automating social media, personalizing emails,
              and delivering smarter, data-driven marketing campaigns.
            </p>
          </div>

          {/* Navigation Links - REDUCED WIDTH AND ADDED ARROW HOVER EFFECT */}
          <div className="md:col-span-2">
            <h3 className="text-gray-200 font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`group flex items-center text-sm transition-colors ${
                      isActive(link.href)
                        ? "text-[#f04da1] font-bold"
                        : "text-gray-300 hover:text-white transition duration-150"
                    }`}
                  >
                    {getIcon(link.icon)}
                    <span>{link.name}</span>
                    <span className="nav-arrow opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                      {getIcon("arrow-right")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links - REDUCED WIDTH AND ADDED ARROW HOVER EFFECT */}
          <div className="md:col-span-2">
            <h3 className="text-gray-200 font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/terms"
                  className="group flex items-center text-sm text-gray-300 hover:text-white transition duration-150"
                >
                  <span>Terms and Conditions</span>
                  <span className="nav-arrow opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 ml-1">
                    {getIcon("arrow-right")}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/Privacypolicy"
                  className="group flex items-center text-sm text-gray-300 hover:text-white transition duration-150"
                >
                  <span>Privacy Policy</span>
                  <span className="nav-arrow opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 ml-1">
                    {getIcon("arrow-right")}
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact section - REDUCED WIDTH */}
          <div className="md:col-span-2">
            <h3 className="text-gray-200 font-medium mb-4">Let's chat!</h3>
            <div className="flex items-center mb-2">
              <div className="mr-2">{getIcon("mail")}</div>
              <a
                href="mailto:info@todaymarketings.com"
                className="group flex items-center text-sm text-gray-300 hover:text-white transition duration-150"
              >
                <span>info@todaymarketings.com</span>
                <span className="nav-arrow opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 ml-1">
                  {getIcon("arrow-right")}
                </span>
              </a>
            </div>
            <div className="flex items-center mb-2">
              <div className="mr-2">{getIcon("phone")}</div>
              <a
                href="tel:0263111913"
                className="group flex items-center text-sm text-gray-300 hover:text-white transition duration-150"
              >
                <span>0263111913</span>
                <span className="nav-arrow opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1 ml-1">
                  {getIcon("arrow-right")}
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright line */}
        <div className="border-t border-opacity-20 border-gray-300 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Todaymarketings.com. All rights
            reserved.
          </p>
        </div>
      </div>

      {/* Success Popup Message */}
      {showSuccessPopup && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-[#3D0C11] to-[#f04da1] text-white p-4 rounded-lg shadow-lg z-50 max-w-sm animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Thanks for subscribing!</p>
              <p className="mt-1 text-xs opacity-90">
                We'll keep you updated with new trends and insights.
              </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="inline-flex text-white focus:outline-none"
                onClick={() => setShowSuccessPopup(false)}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add this CSS for the fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </footer>
  );
}
