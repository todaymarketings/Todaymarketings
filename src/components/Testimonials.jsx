import { useState, useEffect, useRef } from "react";
// Import images - keep as is
import testi1 from "../assets/testi1.svg";
import testi2 from "../assets/testi2.svg";
import testi3 from "../assets/testi3.svg";
import testi4 from "../assets/testi4.svg";
import testi5 from "../assets/testi5.svg";
import testi6 from "../assets/testi6.svg";

export default function Testimonials() {
  // Create testimonials data
  const testimonials = [
    {
      id: 1,
      content:
        "Today Marketing's AI agent has completely transformed our marketing efforts. We've seen a significant increase in leads and sales since implementing their solutions.",
      author: "Sarah",
      position: "Marketing Manager at LSEG",
      rating: 5,
      image: testi1,
    },
    {
      id: 2,
      content:
        "Social media management saved us hours on social media tasks. Their AI spots trends we'd miss and keeps our followers hooked with timely posts.",
      author: "Pradeep",
      position: "Founder of Urban Pulse",
      rating: 5,
      image: testi2,
    },
    {
      id: 3,
      content:
        "Our email campaigns feel personal and convert like never before. The AI crafts emails that our customers love, boosting our open rates by 25%.",
      author: "Evangelin",
      position: "E-Commerce Director at Shop Bloom",
      rating: 4,
      image: testi3,
    },
    {
      id: 4,
      content:
        "It tracks market trends and uncovers opportunities we'd never spot on our own. Our Strategy planning is now faster, smarter, and more effective.",
      author: "Lisa",
      position: "Customer Service Lead at TechTide",
      rating: 5,
      image: testi4,
    },
    {
      id: 5,
      content:
        "It streamlines everything from campaign setup to performance tracking. The AI insights are spot-on, and we've never been more confident in our marketing decisions.",
      author: "Jason",
      position: "Marketing Director, Growth Sphere",
      rating: 5,
      image: testi5,
    },
    {
      id: 6,
      content:
        "The real-time insights from Today Marketing's AI analytics dashboard are incredible. We're making smarter decisions and seeing measurable growth across all our campaigns.",
      author: "Stephy",
      position: "CMO, Robinhood",
      rating: 4,
      image: testi6,
    },
  ];

  // State for tracking active testimonial index
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  // State for animation visibility
  const [isVisible, setIsVisible] = useState(false);
  // State for transition direction
  const [direction, setDirection] = useState("next");
  // State for hover effects
  const [hoveredIndex, setHoveredIndex] = useState(null);
  // State for auto-cycling
  const [isAutoCycling, setIsAutoCycling] = useState(true);

  // Ref for the section element
  const sectionRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Function to handle testimonial selection
  const handleTestimonialSelect = (index) => {
    // Set direction based on index change
    setDirection(index > activeIndex ? "next" : "prev");
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    // Pause auto-cycling when user interacts
    setIsAutoCycling(false);
    // Resume auto-cycling after 10 seconds of inactivity
    clearTimeout(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setTimeout(() => {
      setIsAutoCycling(true);
    }, 10000);
  };

  // Function to go to next testimonial
  const nextTestimonial = () => {
    setPrevIndex(activeIndex);
    setDirection("next");
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Function to go to previous testimonial
  const prevTestimonial = () => {
    setPrevIndex(activeIndex);
    setDirection("prev");
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span
            key={i}
            className="text-maroon4 transform transition-transform duration-300 inline-block"
          >
            ★
          </span>
        );
      } else {
        stars.push(
          <span
            key={i}
            className="text-gray-300 transition-colors duration-300 inline-block"
          >
            ★
          </span>
        );
      }
    }
    return stars;
  };

  // Get image source with fallback
  const getImageSrc = (imageImport) => {
    // Try different ways to access the image depending on your framework
    if (typeof imageImport === "string") return imageImport;
    if (imageImport && imageImport.src) return imageImport.src;
    if (imageImport && typeof imageImport === "object")
      return imageImport.default || imageImport;

    // Fallback to placeholder if all else fails
    return "/api/placeholder/100/100";
  };

  // Effect for auto-cycling through testimonials
  useEffect(() => {
    if (!isVisible || !isAutoCycling) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, isAutoCycling, activeIndex]);

  // Effect to set up Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the section enters the viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset animation when section leaves viewport
          setIsVisible(false);
        }
      },
      {
        // Adjust threshold as needed (0.1 means when 10% of the element is visible)
        threshold: 0.1,
        // Optional: margin around the root
        rootMargin: "0px",
      }
    );

    // Start observing the section
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, []);

  // Current active testimonial based on index
  const activeTestimonial = testimonials[activeIndex];

  // The heading and description section that will be positioned differently based on screen size
  const HeadingSection = () => (
    <div className="text-center lg:text-left">
      {/* Enhanced heading with underline like in the other components */}
      <div className="relative inline-block mb-8">
        <h2
          className={`text-3xl font-bold transition-all duration-700 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 -translate-y-4"
          } bg-clip-text text-transparent`}
          style={{
            backgroundImage: "linear-gradient(to left, #3D0C11, #D80032)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          WHAT OUR CLIENTS SAY
        </h2>
        <span
          className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-900 to-red-500 transform transition-transform duration-700 delay-500 ${
            isVisible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{
            transformOrigin: "left",
          }}
        ></span>
      </div>
      <p
        className={`text-lg text-gray-600 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-4"
        }`}
      >
        Don't just take our word for it - hear from some of our satisfied
        customers who have experienced the difference firsthand.
      </p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`py-12 bg-gray-50 transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile and tablet heading - only visible on smaller screens */}
        <div className="lg:hidden mb-8">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <HeadingSection />
          </div>
        </div>

        {/* Main flex container - row on desktop, column on mobile/tablet */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Active Testimonial */}
          <div
            className={`lg:w-2/3 mb-8 lg:mb-0 transition-all duration-1000 ${
              isVisible ? "translate-x-0" : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg h-auto min-h-[24rem] flex flex-col relative overflow-hidden">
              {/* Navigation controls */}
              <div className="absolute z-10 flex justify-between w-full left-0 top-1/2 -translate-y-1/2 px-4">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:text-red-600 focus:outline-none"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 hover:bg-red-50 hover:text-red-600 focus:outline-none"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* Profile image centered at top */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={getImageSrc(activeTestimonial.image)}
                    alt={activeTestimonial.author}
                    className={`w-24 h-24 object-cover rounded-full shadow-lg transition-all duration-500 animate-fadeIn z-10 relative ${
                      isVisible ? "scale-100" : "scale-0"
                    }`}
                  />
                  <div className="absolute inset-0 bg-red-500 rounded-full animate-pulse mix-blend-multiply filter blur-xl opacity-20"></div>
                </div>
              </div>

              {/* Rating with animated stars */}
              <div className="flex justify-center text-2xl mb-4">
                {renderStars(activeTestimonial.rating)}
              </div>

              {/* Testimonial content with slide animation */}
              <div className="relative overflow-hidden flex-grow">
                <blockquote
                  key={activeIndex}
                  className={`text-lg italic text-gray-800 text-center mb-auto transition-all duration-500 absolute inset-0 flex items-center justify-center ${
                    direction === "next"
                      ? "animate-slideInRight"
                      : "animate-slideInLeft"
                  }`}
                >
                  <span className="text-red-600 text-opacity-20 text-5xl absolute top-0 left-4">
                    "
                  </span>
                  <span className="px-8">{activeTestimonial.content}</span>
                  <span className="text-red-600 text-opacity-20 text-5xl absolute bottom-0 right-4">
                    "
                  </span>
                </blockquote>
              </div>

              {/* Name and position at bottom */}
              <div
                className={`text-center mt-6 transition-all duration-700 delay-300 relative z-10 ${
                  isVisible
                    ? "opacity-100 transform-none"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <h3 className="text-lg font-bold text-maroon2">
                  {activeTestimonial.author}
                </h3>
                <p className="text-maroon3">{activeTestimonial.position}</p>
              </div>
            </div>

            {/* Profile Images for Selection with improved interactivity */}
            <div
              className={`mt-8 flex flex-wrap gap-4 justify-center lg:justify-start transition-all duration-1000 delay-700 ${
                isVisible
                  ? "opacity-100 transform-none"
                  : "opacity-0 translate-y-6"
              }`}
            >
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => handleTestimonialSelect(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative w-16 h-16 rounded-full overflow-hidden transition-all duration-300 transform ${
                    activeIndex === index
                      ? "ring-4 ring-red-600 scale-110 z-10"
                      : hoveredIndex === index
                      ? "opacity-90 scale-105 ring-2 ring-red-300 z-10"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={getImageSrc(testimonial.image)}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                  {/* Rating indicators on hover */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-1 flex justify-center transition-all duration-300 ${
                      activeIndex === index || hoveredIndex === index
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-[8px]">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Progress indicator dots */}
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={`indicator-${index}`}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-red-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => handleTestimonialSelect(index)}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play toggle */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoCycling(!isAutoCycling)}
                className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                  isAutoCycling
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {isAutoCycling ? (
                  <>
                    <span className="mr-1">Auto-Play ON</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  </>
                ) : (
                  <>
                    <span className="mr-1">Auto-Play OFF</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side - Heading (only visible on desktop) */}
          <div
            className={`hidden lg:flex lg:w-1/3 lg:pl-12 items-center justify-center transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <HeadingSection />
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.4;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
