import { useEffect, useRef, useState } from "react";
import parjoin from "../assets/parjoin.jpg";
import how1 from "../assets/how1.svg";
import how2 from "../assets/how2.svg";
import how3 from "../assets/how3.svg";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // Start step animations when section becomes visible
        if (entry.isIntersecting) {
          // Auto-cycle through steps
          const timer = setTimeout(() => {
            setAnimationComplete(true);
          }, 2000);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2, rootMargin: "-50px" }
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

  // Auto-cycle through steps when animation is complete
  useEffect(() => {
    if (!animationComplete) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % 3;
      });
    }, 3000);

    // Initialize with first step
    setActiveStep(0);

    return () => clearInterval(interval);
  }, [animationComplete]);

  const steps = [
    {
      number: "1",
      title:
        "We start with what matters to you, Whether it's more sales, followers, or engagement.",
      icon: how3,
      label: "Goal-Oriented Strategy",
    },
    {
      number: "2",
      title: "Our platform automates, analyzes, and optimizes your campaigns.",
      icon: how2,
      label: "Smart Automation & Optimization",
    },
    {
      number: "3",
      title:
        "Gain valuable insights, monitor performance, and watch your marketing efforts deliver real impact.",
      icon: how1,
      label: "Actionable Insights Dashboard",
    },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <section
      id="how-it-works"
      className="py-16 bg-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced heading with underline */}
        <div className="relative inline-block mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold transform transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            } bg-clip-text text-transparent relative`}
            style={{
              backgroundImage: "linear-gradient(to left, #D80032, #3D0C11)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            HOW WORKS
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

        <div className="flex flex-col xl:flex-row items-center">
          {/* Left side - Interactive Steps */}
          <div className="w-full xl:w-2/5 mb-12 xl:mb-0">
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start transform transition-all duration-700 cursor-pointer group p-4 rounded-lg ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-[-50px] opacity-0"
                  } ${
                    activeStep === index
                      ? "bg-gradient-to-r from-red-50 to-transparent border-l-4 border-red-600 shadow-sm"
                      : "hover:bg-gray-50"
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`text-white w-10 h-10 flex items-center justify-center font-bold rounded-full mr-4 flex-shrink-0 transition-all duration-300 ${
                      activeStep === index
                        ? "bg-red-600 scale-110"
                        : "bg-maroon2 group-hover:scale-105"
                    }`}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-gray-800 transition-all duration-300 ${
                        activeStep === index ? "font-medium" : ""
                      }`}
                    >
                      {step.title}
                    </p>

                    <div
                      className={`mt-2 h-1 bg-gradient-to-r from-red-500 to-transparent transition-all duration-500 ${
                        activeStep === index
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Dynamic Visual representation */}
          <div className="w-full xl:w-3/5">
            {/* Mobile and tablet layout */}
            <div className="flex flex-col items-center justify-center xl:hidden">
              {steps.map((step, index) => (
                <div key={`mobile-step-${index}`} className="mb-6 last:mb-0">
                  {index > 0 && (
                    <div
                      className={`mb-6 transform transition-all duration-700 ${
                        isVisible
                          ? "translate-y-0 opacity-100 rotate-0"
                          : "translate-y-10 opacity-0 rotate-90"
                      }`}
                      style={{ transitionDelay: `${200 + index * 150}ms` }}
                    >
                      <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                        <span className="text-2xl font-bold text-maroon2">
                          {index === 1 ? "+" : "="}
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`text-center transform transition-all duration-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                    } ${
                      activeStep === index ? "scale-110 z-10" : "scale-100 z-0"
                    }`}
                    style={{
                      transitionDelay: `${100 + index * 200}ms`,
                      transition:
                        "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    <div
                      className={`${
                        index === 2 ? "bg-maroon3" : "bg-white"
                      } shadow-md rounded-md p-4 w-48 h-48 flex items-center justify-center mx-auto transition-all duration-500 ${
                        activeStep === index
                          ? "shadow-xl ring-2 ring-red-400 ring-opacity-50"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div>
                        <div className="relative">
                          <img
                            src={step.icon.src}
                            alt={step.label}
                            className={`mx-auto transition-transform duration-500 ${
                              activeStep === index ? "scale-110" : "scale-100"
                            }`}
                            style={{ width: "130px" }}
                          />
                          <div
                            className={`absolute inset-0 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-0 transition-opacity duration-700 ${
                              activeStep === index ? "opacity-20" : ""
                            }`}
                          ></div>
                        </div>
                        <p
                          className={`mt-4 font-medium transition-all duration-300 ${
                            activeStep === index ? "text-red-700" : ""
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop layout - horizontal */}
            <div className="hidden xl:flex xl:flex-row items-center justify-center">
              {steps.map((step, index) => (
                <div
                  key={`desktop-step-${index}`}
                  className="flex items-center"
                >
                  <div
                    className={`text-center transform transition-all duration-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-20 opacity-0"
                    } ${
                      activeStep === index
                        ? "scale-110 z-10"
                        : "scale-100 z-0 hover:scale-105"
                    }`}
                    style={{
                      transitionDelay: `${100 + index * 200}ms`,
                      transition:
                        "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                    onClick={() => handleStepClick(index)}
                  >
                    <div
                      className={`${
                        index === 2 ? "bg-maroon3" : "bg-white"
                      } shadow-md rounded-md p-4 w-48 h-48 flex items-center justify-center mx-auto cursor-pointer transition-all duration-500 ${
                        activeStep === index
                          ? "shadow-xl ring-2 ring-red-400 ring-opacity-70"
                          : "hover:shadow-lg"
                      }`}
                    >
                      <div>
                        <div className="relative">
                          <img
                            src={step.icon.src}
                            alt={step.label}
                            className={`mx-auto transition-transform duration-500 ${
                              activeStep === index ? "scale-110" : "scale-100"
                            }`}
                            style={{ width: "130px" }}
                          />
                          <div
                            className={`absolute inset-0 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-0 transition-opacity duration-700 ${
                              activeStep === index ? "opacity-20" : ""
                            }`}
                          ></div>
                        </div>
                        <p
                          className={`mt-4 font-medium transition-all duration-300 ${
                            activeStep === index ? "text-red-700" : ""
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  {index < 2 && (
                    <div
                      className={`mx-4 transform transition-all duration-700 ${
                        isVisible
                          ? "translate-y-0 opacity-100 rotate-0"
                          : "translate-y-10 opacity-0 rotate-90"
                      }`}
                      style={{ transitionDelay: `${200 + index * 150}ms` }}
                    >
                      <div
                        className={`bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition-all duration-300 ${
                          activeStep === index || activeStep === index + 1
                            ? "bg-red-50 scale-110"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-2xl font-bold transition-colors duration-300 ${
                            activeStep === index || activeStep === index + 1
                              ? "text-red-600"
                              : "text-maroon2"
                          }`}
                        >
                          {index === 0 ? "+" : "="}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center mt-12">
          {steps.map((_, index) => (
            <button
              key={`indicator-${index}`}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                activeStep === index
                  ? "bg-red-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleStepClick(index)}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
