import React, { useState, useEffect } from "react";
import testing from "../assets/testing.gif";

export default function PricingSection() {
  // State to track which plan is being hovered
  const [hoveredPlan, setHoveredPlan] = useState(null);
  // State for typing effect on compare button
  const [isCompareHovered, setIsCompareHovered] = useState(false);
  const [typingText, setTypingText] = useState("");
  // State for scroll-triggered animations
  const [isVisible, setIsVisible] = useState(false);
  // State for feature comparison toggle
  const [showComparison, setShowComparison] = useState(false);
  // State for pulsing elements
  const [isPulsing, setIsPulsing] = useState(true);

  // Initialize visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("pricing-section");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.disconnect();
    };
  }, []);

  // Set up pulsing animation interval
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing((prev) => !prev);
    }, 2000);

    return () => clearInterval(pulseInterval);
  }, []);

  // Handle typing effect when Compare button is hovered
  useEffect(() => {
    if (isCompareHovered) {
      const text = "Compare Features...";
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setTypingText(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);

      return () => {
        clearInterval(typingInterval);
      };
    } else {
      setTypingText("");
    }
  }, [isCompareHovered]);

  // Function to generate random dust particles
  const generateDustParticles = (count, color) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 2 + 1,
        delay: Math.random() * 0.5,
        color: color,
      });
    }
    return particles;
  };

  // Function to handle redirect to contact page
  const handleRedirectToContact = () => {
    window.location.href = "/contact"; // Redirect to contact page
  };
  const handleRedirectTocomparision = () => {
    window.location.href = "/pricing#pricing-table"; // Redirect to contact page
  };

  // Pre-generate particles for each plan
  const basicParticles = generateDustParticles(25, "#D80032");
  const standardParticles = generateDustParticles(25, "#F78CA2");
  const premiumParticles = generateDustParticles(25, "#3D0C11");

  // Feature comparison data

  // Helper function for check/cross icons
  const FeatureIcon = ({ included }) =>
    included ? (
      <svg
        className="h-5 w-5 text-green-500 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="h-5 w-5 text-green-500 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    );

  return (
    <section
      id="pricing-section"
      className="py-16 bg-gradient-to-b from-gray-100 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for desktop layout - side by side */}
        <div
          className={`flex flex-col lg:flex-row ${
            isVisible ? "animate-fadeIn" : "opacity-0"
          }`}
        >
          {/* Left side - Header and description - Now centered */}
          <div className="lg:w-1/3 lg:pr-12 mb-10 lg:mb-0 flex items-center justify-center">
            <div className="sticky lg:top-8 text-center">
              <div className="relative inline-block mb-6">
                <h2
                  className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent relative z-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #3D0C11, #D80032)",
                  }}
                >
                  Flexible Plans for Every Business
                </h2>
                {/* Animated gradient underline */}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700 rounded-full animate-pulse"></div>
              </div>

              <p className="text-lg text-gray-600 transition-all duration-300 hover:text-gray-800">
                We believe in making marketing accessible to everyone. Our
                diverse pricing options ensure that you can find a plan that
                fits your business size and objectives. Explore our offerings
                and choose the right level of support and features to elevate
                your marketing strategy!
              </p>
              <div className="mt-6 hidden lg:block">
                <button
                  className={`text-white px-6 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center relative overflow-hidden shadow-lg ${
                    isPulsing ? "shadow-red-300" : ""
                  }`}
                  style={{
                    background:
                      "linear-gradient(135deg, #3D0C11 0%, #D80032 100%)",
                    backgroundSize: "200% 200%",
                    animation: "gradientShift 5s ease infinite",
                  }}
                  onMouseEnter={() => setIsCompareHovered(true)}
                  onMouseLeave={() => setIsCompareHovered(false)}
                  onClick={handleRedirectTocomparision}
                >
                  <img
                    src={testing.src}
                    alt="Compare"
                    className="w-9 h-9 mr-2 transition-transform duration-300 hover:rotate-12"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                  <span className="relative min-w-[180px] inline-block text-left">
                    {isCompareHovered ? (
                      <h1 className="typing-effect m-0 text-base font-medium">
                        {typingText}
                      </h1>
                    ) : (
                      "Compare All Features"
                    )}
                  </span>
                  {/* Button shine effect */}
                  <div className="absolute top-0 -left-10 w-20 h-full transform -skew-x-30 bg-white opacity-30 animate-shine"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Pricing cards */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-4">
              {/* Basic Plan */}
              <div
                className={`bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-auto transform transition-all duration-500 hover:shadow-2xl relative ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${hoveredPlan === "basic" ? "scale-105 shadow-xl" : ""}`}
                style={{ transitionDelay: "0.1s" }}
              >
                {/* Header - Custom shape with rotation but text remains flat */}
                <div className="h-48 overflow-hidden relative">
                  <div
                    className="absolute inset-0 w-140 h-140 -top-20 -left-20"
                    style={{ transform: "rotate(45deg)" }}
                  >
                    <div className="bg-gradient-to-r from-[#3D0C11] to-[#D80032] h-56 w-full"></div>
                    <div className="h-8 w-full bg-gradient-to-r from-[#D80032] to-[#F78CA2] mt-1"></div>
                  </div>
                  {/* Flat text overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                    <h3 className="text-2xl font-bold text-white">
                      Starter Plan
                    </h3>
                    <div className="text-white mt-2">
                      <span className="text-3xl font-bold">$99</span>
                      <span className="text-sm ml-1">per month</span>
                    </div>
                    {/* Interactive badge */}
                    <div className="absolute top-3 left-3 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                      Starter
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Campaign Optimization
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={false} />
                      <span className="ml-3 text-gray-700">
                        Basic Customer Targeting
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={false} />
                      <span className="ml-3 text-gray-700">
                        Social Media Management (up to 3 platforms)
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={false} />
                      <span className="ml-3 text-gray-700">
                        Monthly Performance Reporting
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={false} />
                      <span className="ml-3 text-gray-700">Email Support</span>
                    </li>
                  </ul>

                  <div className="mt-8 relative">
                    <button
                      className="w-full py-3 text-white font-medium rounded focus:outline-none uppercase relative overflow-hidden group"
                      style={{
                        background:
                          "linear-gradient(to right, #D80032, #F78CA2)",
                      }}
                      onClick={handleRedirectToContact}
                      onMouseEnter={() => setHoveredPlan("basic")}
                      onMouseLeave={() => setHoveredPlan(null)}
                    >
                      <span className="relative z-10">SELECT</span>
                      {/* Button shine effect */}
                      <div className="absolute top-0 -left-1/2 w-1/2 h-full bg-white opacity-20 transform skew-x-12 transition-all duration-700 group-hover:left-full"></div>

                      {hoveredPlan === "basic" && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl animate-bounce z-10">
                          😊
                        </span>
                      )}
                    </button>

                    {/* Celebration dust particles */}
                    {hoveredPlan === "basic" && (
                      <div className="absolute inset-0 pointer-events-none">
                        {basicParticles.map((particle) => (
                          <div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                              left: `${particle.left}%`,
                              top: `${particle.top}%`,
                              width: `${particle.size}px`,
                              height: `${particle.size}px`,
                              background: particle.color,
                              opacity: 0,
                              animation: `float ${particle.duration}s ease-out ${particle.delay}s forwards`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Standard Plan */}
              <div
                className={`bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-auto transform transition-all duration-500 hover:shadow-2xl relative ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${hoveredPlan === "standard" ? "scale-105 shadow-xl" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                {/* Most popular ribbon */}

                {/* Header - Custom shape with rotation but text remains flat */}
                <div className="h-48 overflow-hidden relative">
                  <div
                    className="absolute inset-0 w-140 h-140 -top-20 -left-20"
                    style={{ transform: "rotate(45deg)" }}
                  >
                    <div className="bg-gradient-to-r from-[#D80032] to-[#F78CA2] h-56 w-full"></div>
                    <div className="h-8 w-full bg-gradient-to-r from-[#F78CA2] to-[#F9DEC9] mt-1"></div>
                  </div>
                  {/* Flat text overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                    <h3 className="text-2xl font-bold text-white">
                      Growth Plan
                    </h3>
                    <div className="text-white mt-2">
                      <span className="text-3xl font-bold">$199</span>
                      <span className="text-sm ml-1">per month</span>
                    </div>
                    {/* Interactive badge */}
                    <div className="absolute top-3 left-3 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                      Recommended
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Advanced Customer Targeting
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Personalized Email Marketing
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={false} />
                      <span className="ml-3 text-gray-700">
                        Real-Time Marketing Analytics
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={false} />
                      <span className="ml-3 text-gray-700">
                        Priority Email Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Smart Social Media Scheduling
                      </span>
                    </li>
                  </ul>

                  <div className="mt-8 relative">
                    <button
                      className="w-full py-3 text-white font-medium rounded focus:outline-none uppercase relative overflow-hidden group"
                      style={{
                        background:
                          "linear-gradient(to right, #F78CA2, #F9DEC9)",
                        color: "#3D0C11",
                      }}
                      onClick={handleRedirectToContact}
                      onMouseEnter={() => setHoveredPlan("standard")}
                      onMouseLeave={() => setHoveredPlan(null)}
                    >
                      <span className="relative z-10 font-bold">SELECT</span>
                      {/* Button shine effect */}
                      <div className="absolute top-0 -left-1/2 w-1/2 h-full bg-white opacity-20 transform skew-x-12 transition-all duration-700 group-hover:left-full"></div>

                      {hoveredPlan === "standard" && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl animate-bounce z-10">
                          😄
                        </span>
                      )}
                    </button>

                    {/* Celebration dust particles */}
                    {hoveredPlan === "standard" && (
                      <div className="absolute inset-0 pointer-events-none">
                        {standardParticles.map((particle) => (
                          <div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                              left: `${particle.left}%`,
                              top: `${particle.top}%`,
                              width: `${particle.size}px`,
                              height: `${particle.size}px`,
                              background: particle.color,
                              opacity: 0,
                              animation: `float ${particle.duration}s ease-out ${particle.delay}s forwards`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Premium Plan */}
              <div
                className={`bg-white rounded-lg shadow-lg overflow-hidden w-full md:w-auto transform transition-all duration-500 hover:shadow-2xl relative ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                } ${hoveredPlan === "premium" ? "scale-105 shadow-xl" : ""}`}
                style={{ transitionDelay: "0.3s" }}
              >
                {/* Header - Custom shape with rotation but text remains flat */}
                <div className="h-48 overflow-hidden relative">
                  <div
                    className="absolute inset-0 w-140 h-140 -top-20 -left-20"
                    style={{ transform: "rotate(45deg)" }}
                  >
                    <div className="bg-gradient-to-r from-[#3D0C11] to-[#D80032] h-56 w-full"></div>
                    <div className="h-8 w-full bg-gradient-to-r from-[#F78CA2] to-[#F9DEC9] mt-1"></div>
                  </div>
                  {/* Flat text overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                    <h3 className="text-2xl font-bold text-white">
                      Professional Plan
                    </h3>
                    <div className="text-white mt-2">
                      <span className="text-3xl font-bold">$299</span>
                      <span className="text-sm ml-1">per month</span>
                    </div>
                    {/* Interactive badge */}
                    <div className="absolute top-3 left-3 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                      All Features
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Chatbot Automation for 24/7 support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Advanced Competitor Analysis
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Dedicated Account Manager
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Phone & Email Support
                      </span>
                    </li>
                    <li className="flex items-center">
                      <FeatureIcon included={true} />
                      <span className="ml-3 text-gray-700">
                        Custom AI Strategy Sessions
                      </span>
                    </li>
                  </ul>

                  <div className="mt-8 relative">
                    <button
                      className="w-full py-3 text-white font-medium rounded focus:outline-none uppercase relative overflow-hidden group"
                      style={{
                        background:
                          "linear-gradient(to right, #3D0C11, #D80032)",
                      }}
                      onClick={handleRedirectToContact}
                      onMouseEnter={() => setHoveredPlan("premium")}
                      onMouseLeave={() => setHoveredPlan(null)}
                    >
                      <span className="relative z-10">SELECT</span>
                      {/* Button shine effect */}
                      <div className="absolute top-0 -left-1/2 w-1/2 h-full bg-white opacity-20 transform skew-x-12 transition-all duration-700 group-hover:left-full"></div>

                      {hoveredPlan === "premium" && (
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl animate-bounce z-10">
                          😁
                        </span>
                      )}
                    </button>

                    {/* Celebration dust particles */}
                    {hoveredPlan === "premium" && (
                      <div className="absolute inset-0 pointer-events-none">
                        {premiumParticles.map((particle) => (
                          <div
                            key={particle.id}
                            className="absolute rounded-full"
                            style={{
                              left: `${particle.left}%`,
                              top: `${particle.top}%`,
                              width: `${particle.size}px`,
                              height: `${particle.size}px`,
                              background: particle.color,
                              opacity: 0,
                              animation: `float ${particle.duration}s ease-out ${particle.delay}s forwards`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile CTA - only visible on smaller screens */}
            <div className="mt-8 text-center lg:hidden">
              <button
                className="bg-gradient-to-r from-[#3D0C11] to-[#D80032] hover:from-[#D80032] hover:to-[#F78CA2] text-white px-6 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center mx-auto shadow-lg"
                onMouseEnter={() => setIsCompareHovered(true)}
                onMouseLeave={() => setIsCompareHovered(false)}
                onClick={handleRedirectTocomparision}
              >
                <img
                  src={testing.src}
                  alt="Compare"
                  className="w-5 h-5 mr-2"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="relative min-w-[180px] inline-block text-left">
                  {isCompareHovered ? (
                    <h1 className="typing-effect m-0 text-base font-medium">
                      {typingText}
                    </h1>
                  ) : (
                    "Compare All Features"
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation for dust particles, typing effect, and other animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          25% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .typing-effect {
          border-right: 2px solid white;
          animation: blinkCursor 0.8s infinite;
          padding-right: 2px;
          display: inline-block;
          min-width: 10px;
          font-weight: bold;
        }

        @keyframes blinkCursor {
          0%,
          100% {
            border-color: transparent;
          }
          50% {
            border-color: white;
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .animate-shine {
          animation: shine 3s infinite linear;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
