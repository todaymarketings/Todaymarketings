import { useState, useEffect, useRef } from "react";
import par1 from "../assets/par1.png";
import par2 from "../assets/par2.png";
import par3 from "../assets/par3.png";
import par4 from "../assets/par4.png";
import par5 from "../assets/par5.png";
import par6 from "../assets/par6.png";
import parjoin from "../assets/parjoin.png";

export default function Partners() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null); // New state for clicked/selected partner
  const [isWheelPaused, setIsWheelPaused] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const sectionRef = useRef(null);
  const detailRef = useRef(null);

  // Partner data with image imports and more detailed information
  const partners = [
    {
      img: par1.src,
      link: "https://zapier.com/",
      name: "Zapier",
      description:
        "Connect your apps and automate workflows with Zapier integration.",
    },
    {
      img: par2.src,
      link: "https://www.activecampaign.com/",
      name: "Active Campaign",
      description:
        "Customer experience automation platform to enhance your marketing.",
    },
    {
      img: par3.src,
      link: "https://www.chatwoot.com/",
      name: "Chatwoot",
      description:
        "Open-source customer engagement suite for omnichannel support.",
    },
    {
      img: par4.src,
      link: "https://www.semrush.com/",
      name: "Semrush",
      description:
        "All-in-one digital marketing toolkit for SEO and competitive analysis.",
    },
    {
      img: par5.src,
      link: "https://www.canva.com/",
      name: "Canva",
      description:
        "Design platform for creating professional graphics and visual content.",
    },
    {
      img: par6.src,
      link: "https://groq.com/",
      name: "Groq",
      description:
        "Ultra-fast, AI-powered language model delivering real-time conversational intelligence.",
    },
  ];

  // Orbit radius configuration
  const orbitRadius = 180;

  // Set up intersection observer to detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setHoveredPartner(null);
          setSelectedPartner(null); // Reset selected partner too
          setShowDetail(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle clicking outside the detail panel to close it
  useEffect(() => {
    if (!showDetail) return;

    const handleClickOutside = (event) => {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setShowDetail(false);
        setSelectedPartner(null); // Clear selected partner when closing details
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetail]);

  // Handle partner hover
  const handlePartnerHover = (index) => {
    // Only set hovered partner if not showing details
    if (!showDetail) {
      setHoveredPartner(index);
      setIsWheelPaused(true);
    }
  };

  // Handle partner click to show detail
  const handlePartnerClick = (e, index) => {
    e.preventDefault();
    setSelectedPartner(index); // Set the selected partner
    setHoveredPartner(index);
    setIsWheelPaused(true);
    setShowDetail(true);
  };

  // Clear hover state - but only if not showing details
  const handlePartnerLeave = () => {
    if (!showDetail) {
      setIsWheelPaused(false);
      setHoveredPartner(null);
    }
  };

  // Close detail panel and reset states
  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedPartner(null);
    setIsWheelPaused(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 overflow-hidden relative bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left half - Text content with staggered fade-in animations */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-12 md:mb-0">
            <div className="relative inline-block">
              <h2
                className={`text-4xl font-bold mb-2 transition-all duration-1000 transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                } bg-clip-text text-transparent`}
                style={{
                  backgroundImage: "linear-gradient(to left, #3D0C11, #D80032)",
                }}
              >
                Our Partners
              </h2>
              <span
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-900 to-red-500 transform transition-transform duration-1000 delay-300 ${
                  isVisible ? "scale-x-100" : "scale-x-0"
                }`}
                style={{
                  transformOrigin: "left",
                }}
              ></span>
            </div>

            <p
              className={`text-xl text-gray-600 mt-8 transition-all duration-1000 delay-500 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              We team up with trusted partners who share our vision to deliver
              smarter, AI-driven marketing success.
            </p>

            <div
              className={`mt-6 transition-all duration-1000 delay-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            ></div>
          </div>

          {/* Right half - Interactive wheel of partners */}
          <div className="w-full md:w-1/2 relative h-96">
            {/* Center logo - the hub of the wheel */}
            <div
              className={`absolute z-10 bg-white rounded-xl shadow-lg p-4 w-32 h-32 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              } hover:shadow-xl hover:scale-110`}
            >
              <img
                src={parjoin.src}
                alt="Partners"
                className="w-24 h-24 object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23FF5C35'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16' fill='%23ffffff'%3ELogo%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Connection lines between hub and partners */}
            <div
              className={`connection-lines ${isVisible ? "fade-in" : ""} ${
                isWheelPaused ? "paused" : ""
              }`}
            >
              {partners.map((_, index) => {
                const angle = (index / partners.length) * 360;
                const radians = (angle * Math.PI) / 180;
                const x = Math.cos(radians) * orbitRadius;
                const y = Math.sin(radians) * orbitRadius;

                // Highlight the line if it corresponds to hovered or selected partner
                const isHighlighted =
                  hoveredPartner === index ||
                  (showDetail && selectedPartner === index);

                return (
                  <div
                    key={`line-${index}`}
                    className={`connection-line ${
                      isHighlighted ? "highlighted" : ""
                    }`}
                    style={{
                      width: `${orbitRadius}px`,
                      height: "2px",
                      top: "50%",
                      left: "50%",
                      transformOrigin: "left center",
                      transform: `rotate(${angle}deg)`,
                      opacity:
                        hoveredPartner === null ||
                        hoveredPartner === index ||
                        (showDetail && selectedPartner === index)
                          ? 1
                          : 0.3,
                      transition: "opacity 0.3s ease",
                    }}
                  />
                );
              })}
            </div>

            {/* Wheel of partners with interactive features */}
            <div
              className={`partner-wheel ${isVisible ? "wheel-fade-in" : ""} ${
                isWheelPaused ? "paused" : ""
              }`}
            >
              {partners.map((partner, index) => {
                // Calculate position on the wheel
                const angle = (index / partners.length) * 360;
                const radians = (angle * Math.PI) / 180;
                const x = Math.cos(radians) * orbitRadius;
                const y = Math.sin(radians) * orbitRadius;

                // Calculate delay for staggered appearance
                const staggerDelay = 200 * index;

                // Determine if this partner should be highlighted (either hovered or selected in detail view)
                const isHighlighted =
                  hoveredPartner === index ||
                  (showDetail && selectedPartner === index);

                return (
                  <a
                    key={index}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-item absolute"
                    style={{
                      top: `calc(50% + ${y}px)`,
                      left: `calc(50% + ${x}px)`,
                      transform: "translate(-50%, -50%)",
                      transitionDelay: `${800 + staggerDelay}ms`,
                      zIndex: isHighlighted ? 20 : 10,
                    }}
                    onMouseEnter={() => handlePartnerHover(index)}
                    onMouseLeave={handlePartnerLeave}
                    onClick={(e) => handlePartnerClick(e, index)}
                  >
                    <div
                      className={`partner-logo ${
                        isVisible ? "partner-fade-in" : "opacity-0"
                      } ${isHighlighted ? "highlighted-partner" : ""}`}
                    >
                      <img
                        src={partner.img}
                        alt={partner.name}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23f0f4f8'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%23334e68'%3E" +
                            partner.name +
                            "%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Partner detail panel */}
            {showDetail && selectedPartner !== null && (
              <div
                ref={detailRef}
                className="partner-detail"
                style={{
                  opacity: showDetail ? 1 : 0,
                  transform: showDetail ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="detail-header">
                  <img
                    src={partners[selectedPartner].img}
                    alt={partners[selectedPartner].name}
                    className="detail-logo"
                  />
                  <h3>{partners[selectedPartner].name}</h3>
                </div>
                <p className="detail-description">
                  {partners[selectedPartner].description}
                </p>
                <div className="detail-actions">
                  <a
                    href={partners[selectedPartner].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="learn-more-btn"
                  >
                    Learn More
                  </a>
                  <button className="close-btn" onClick={handleCloseDetail}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS for the animations and interactions */}
      <style jsx>{`
        .partner-wheel {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          animation: spin 40s linear infinite;
        }

        .wheel-fade-in {
          opacity: 1;
        }

        .wheel-fade-in.paused {
          animation-play-state: paused;
        }

        .partner-logo {
          opacity: 0;
          transform: scale(0.8);
          position: relative;
          width: 90px;
          height: 90px;
          border-radius: 12px;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
            0 1px 3px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
          /* Add counter-rotation to keep logos horizontal */
          animation: counter-spin 40s linear infinite;
        }

        .partner-wheel.paused .partner-logo {
          animation-play-state: paused;
        }

        .partner-fade-in {
          opacity: 1;
          transform: scale(1);
        }

        /* Modified highlighted-partner class to prevent rotation transformation */
        .highlighted-partner {
          /* Remove the scale transform that was causing rotation issues */
          animation-play-state: paused;
          /* Use separate CSS properties to control effects */
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1),
            0 5px 10px rgba(0, 0, 0, 0.05);
          background-color: white;
          border-color: #d80032;
          z-index: 30;
          /* Add slight zoom without affecting rotation */
          width: 103px;
          height: 103px;
        }

        .connection-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 2s ease-in-out;
          animation: spin 40s linear infinite;
        }

        .connection-lines.fade-in {
          opacity: 1;
        }

        .connection-lines.paused {
          animation-play-state: paused;
        }

        .connection-line {
          position: absolute;
          background: linear-gradient(
            to right,
            transparent,
            rgba(216, 0, 50, 0.5)
          );
          transition: all 0.5s ease;
        }

        .connection-line.highlighted {
          background: linear-gradient(
            to right,
            transparent,
            rgba(216, 0, 50, 1)
          );
          height: 3px;
          box-shadow: 0 0 10px rgba(216, 0, 50, 0.5);
        }

        .partner-detail {
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
            0 5px 15px rgba(0, 0, 0, 0.05);
          padding: 16px;
          z-index: 40;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border-top: 4px solid #d80032;
        }

        .detail-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 12px;
        }

        .detail-logo {
          width: 40px;
          height: 40px;
          object-fit: contain;
          margin-right: 12px;
        }

        .detail-header h3 {
          font-weight: bold;
          font-size: 18px;
          color: #333;
        }

        .detail-description {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .detail-actions {
          display: flex;
          justify-content: space-between;
        }

        .learn-more-btn {
          padding: 8px 16px;
          background: linear-gradient(to right, #3d0c11, #d80032);
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: medium;
          text-decoration: none;
          transition: all 0.3s;
        }

        .learn-more-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(216, 0, 50, 0.3);
        }

        .close-btn {
          padding: 8px 16px;
          background: #f0f0f0;
          color: #666;
          border-radius: 20px;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
        }

        .close-btn:hover {
          background: #e0e0e0;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes counter-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @media (max-width: 768px) {
          .partner-logo {
            width: 70px;
            height: 70px;
          }

          .partner-detail {
            width: 280px;
          }
        }
      `}</style>
    </section>
  );
}
