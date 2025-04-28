import { useState, useEffect, useRef } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "How does it help my business?",
      answer:
        "Our AI-powered marketing agent uses advanced algorithms to automate tasks like social media management, email marketing, customer support, and competitor analysis saving time and boosting results with data-driven decisions.",
    },
    {
      question: "Can I customize campaigns based on my business goals?",
      answer:
        "Absolutely! You can define specific objectives like increasing sales, engagement, or leads, and the platform will adapt strategies, content, and analytics to meet your goals.",
    },
    {
      question: "How does social media automation work?",
      answer:
        "Our platform schedules and publishes content, tracks real-time trends, and engages your audience intelligently helping you stay active and relevant across all platforms without manual effort.",
    },
    {
      question: "Will the AI handle customer support too? ",
      answer:
        "Yes, our built-in AI chatbot offers 24/7 support, answers common queries, and guides visitors enhancing user experience while freeing up your team.",
    },
    {
      question: "How does the platform help with email marketing?",
      answer:
        "We use AI to analyze user behavior and segment your audience, sending highly personalized emails that improve open rates, engagement, and conversions.",
    },
    {
      question: "Can I monitor what my competitors are doing?",
      answer:
        "Definitely. Our competitor analysis tool tracks your rivals campaigns, social presence, and market strategies so you can identify gaps, trends, and new opportunities in real time.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    };
  }, []);

  // Auto-cycle through FAQs
  useEffect(() => {
    if (!isVisible) return;

    let timer;

    // If no FAQ is open and the section is visible, cycle through FAQs
    if (openIndex === null) {
      timer = setTimeout(() => {
        setOpenIndex(0);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [isVisible, openIndex]);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className={`py-16 bg-gray-50 transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center transition-all duration-700 ${
            isVisible
              ? "opacity-100 transform-none"
              : "opacity-0 -translate-y-10"
          }`}
        >
          {/* Enhanced heading with underline like in HowItWorks component */}
          <div className="relative inline-block mb-8">
            <h2
              className="text-3xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to left, #3D0C11, #D80032)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FREQUENTLY ASKED QUESTIONS
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
          <p className="mt-4 text-xl text-gray-600">
            Have questions? We're here to help.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow overflow-hidden transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform-none"
                  : index % 2 === 0
                  ? "opacity-0 -translate-x-20"
                  : "opacity-0 translate-x-20"
              }`}
              style={{
                transitionDelay: `${200 * index}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                className={`flex w-full justify-between items-center p-4 text-left focus:outline-none transition-colors duration-300 ${
                  hoveredIndex === index || openIndex === index
                    ? "bg-red-50"
                    : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <span
                  className={`text-lg font-medium transition-all duration-300 ${
                    openIndex === index
                      ? "text-red-600"
                      : hoveredIndex === index
                      ? "text-red-500"
                      : "text-gray-900"
                  }`}
                >
                  {faq.question}
                </span>
                <div
                  className={`relative w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                    openIndex === index || hoveredIndex === index
                      ? "bg-red-100 rounded-full"
                      : ""
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-all duration-300 ${
                      openIndex === index
                        ? "text-red-600 rotate-180"
                        : hoveredIndex === index
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4">
                  <p className="text-gray-600 pt-2 border-t border-gray-100">
                    {faq.answer}
                  </p>

                  {/* Adding a subtle feedback option */}
                  <div className="mt-3 pt-2 flex justify-end items-center text-sm text-gray-400">
                    <span>Was this helpful?</span>
                    <button className="ml-2 p-1 hover:text-green-500 transition-colors duration-300">
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
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    </button>
                    <button className="ml-2 p-1 hover:text-red-500 transition-colors duration-300">
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
                        <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicators similar to HowItWorks */}
        <div className="flex justify-center mt-8">
          {faqs.map((_, index) => (
            <button
              key={`indicator-${index}`}
              className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                openIndex === index
                  ? "bg-red-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => toggleFAQ(index)}
              aria-label={`FAQ ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Adding subtle animations */}
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
      `}</style>
    </section>
  );
}
