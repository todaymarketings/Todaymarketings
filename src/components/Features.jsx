import { useState, useEffect, useRef } from "react";
import ser1 from "../assets/ser1.svg";
import ser2 from "../assets/ser2.svg";
import ser3 from "../assets/ser3.svg";
import ser4 from "../assets/ser4.svg";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "-30px",
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

  // Mouse move effect for cards
  const handleMouseMove = (e, index) => {
    if (!cardsRef.current[index]) return;

    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (index) => {
    if (!cardsRef.current[index]) return;

    cardsRef.current[index].style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  };

  const features = [
    {
      title: "Social Media Management",
      description:
        "Automate posts, track trends, and engage your audience in real-time with AI precision.",
      icon: <img src={ser1.src} alt="" />,
      iconBg: "bg-ser1",
      color: "#D80032",
    },
    {
      title: "Personalized Email Marketing",
      description:
        "Deliver customized emails that drive higher open rates and conversions with AI-driven insights.",
      icon: <img src={ser2.src} alt="" />,
      iconBg: "bg-ser2",
      color: "#3D0C11",
    },
    {
      title: "Chatbot Automation",
      description:
        "Provide 24/7 customer support with AI chatbots that efficiently resolve queries and boost satisfaction.",
      icon: <img src={ser3.src} alt="" />,
      iconBg: "bg-ser3",
      color: "#F78CA2",
    },
    {
      title: "Competitor Analysis",
      description:
        "Strength AI to monitor competitors, identify market trends, and uncover strategic opportunities.",
      icon: <img src={ser4.src} alt="" />,
      iconBg: "bg-ser4",
      color: "#A41034",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className={`py-12 md:py-20 bg-gray-50 text-gray-900 transition-all duration-700 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center">
          {/* Heading and description */}
          <div
            className={`
            w-full md:w-2/5 md:order-last order-first text-center 
            flex flex-col justify-center items-center mb-12 md:mb-0 md:pl-8
            transition-all duration-1000 delay-300
            ${isVisible ? "opacity-100" : "opacity-0 translate-x-10"}
          `}
          >
            <div className="max-w-sm mx-auto">
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent relative"
                style={{
                  backgroundImage: "linear-gradient(to left, #3D0C11, #D80032)",
                }}
              >
                Our Services
                <span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-900 transform scale-x-0 origin-left transition-transform duration-700 delay-700"
                  style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)" }}
                ></span>
              </h2>
              <p className="mt-6 md:mt-8 text-gray-600 text-sm md:text-base">
                We help you grow smarter with AI-driven tools that simplify
                social media management, personalize email campaigns, automate
                customer support, and give you a competitive edge with real-time
                market insights all designed to boost engagement and drive
                results.
              </p>
            </div>
          </div>

          {/* Feature cards section */}
          <div
            className={`
            w-full md:w-3/5 md:order-first order-last 
            transition-all duration-1000 delay-500
            ${isVisible ? "opacity-100" : "opacity-0 -translate-x-10"}
          `}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature-card-container ${
                    index % 2 === 0 ? "mt-0 md:mt-8" : "mt-0"
                  } transition-all duration-700 transform ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-20"
                  }`}
                  style={{
                    transitionDelay: `${isVisible ? 700 + index * 200 : 0}ms`,
                  }}
                >
                  <div
                    className="feature-card"
                    ref={(el) => (cardsRef.current[index] = el)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onClick={() =>
                      setActiveFeature(activeFeature === index ? null : index)
                    }
                  >
                    <div
                      className={`feature-card-inner ${
                        activeFeature === index ? "is-flipped" : ""
                      }`}
                    >
                      {/* Front of card */}
                      <div
                        className="feature-card-front bg-white rounded-lg overflow-hidden flex flex-col items-center p-6 shadow-lg text-center relative"
                        style={{
                          transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        <div
                          className={`${feature.iconBg} inline-flex items-center justify-center p-4 rounded-full text-white mx-auto relative`}
                        >
                          {feature.icon}
                          <div
                            className={`absolute inset-0 rounded-full ${
                              isVisible ? "icon-pulse" : ""
                            }`}
                            style={{
                              animationDelay: `${1000 + index * 200}ms`,
                            }}
                          ></div>
                        </div>
                        <h3 className="mt-4 text-xl font-bold text-gray-900 mb-2">
                          {feature.title}
                        </h3>

                        <button className="px-6 py-2 bg-gradient-to-r from-red-800 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
                          Click to learn more
                        </button>

                        <div className="card-shine absolute inset-0 pointer-events-none"></div>
                      </div>

                      {/* Back of card */}
                      <div
                        className="feature-card-back rounded-lg p-6 flex flex-col justify-center items-center shadow-lg"
                        style={{
                          background: `linear-gradient(145deg, ${feature.color}dd, ${feature.color}99)`,
                          transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
                        }}
                      >
                        <h3 className="text-xl font-bold text-white mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-base text-white text-center mb-4">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-card-container {
          perspective: 1000px;
          height: 280px;
        }

        .feature-card {
          width: 100%;
          height: 100%;
          cursor: pointer;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .feature-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .feature-card-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .feature-card-front,
        .feature-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1rem;
        }

        .feature-card-back {
          transform: rotateY(180deg);
        }

        .card-shine {
          border-radius: 1rem;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.35) 0%,
            rgba(255, 255, 255, 0) 60%
          );
          background-size: 200% 200%;
          animation: shimmer 3s infinite alternate;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover .card-shine {
          opacity: 1;
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        .icon-pulse {
          animation: pulse 2s;
          animation-iteration-count: 2;
        }
      `}</style>
    </section>
  );
}
