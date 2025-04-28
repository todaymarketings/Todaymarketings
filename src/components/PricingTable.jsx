import React, { useState, useEffect } from "react";

const PricingTable = () => {
  const [isMobile, setIsMobile] = useState(false);

  const features = [
    "Custom AI Strategy for Campaign Optimization",
    "Smart A/B Testing for Ads",
    "Integrated CRM Insights and Mapping",
    "SEO by Real-Time AI Insights",
    "Chatbot Automated  for  Social Posts",
    "Multi-Channel Campaign Dashboard",
    "AI-Powered Ad Budget Optimization Tools",
    "Audience Segmentation and Retargeting",
    "Voice of Customer Analysis",
    "Campaign Performance Alerts",
    "Custom Branded Analytics Dashboards",
    "One-Click Integration with Marketing Tools",
    "Marketing Performance Summary Reports",
  ];

  const plans = [
    {
      name: "Starter Plan",
      values: [
        "✔️",
        "❌",
        "❌",
        "❌",
        "❌",
        "✔️",
        "❌",
        "❌",
        "❌",
        "❌",
        "✔️",
        "❌",
        "❌",
      ],
    },
    {
      name: "Growth Plan",
      values: [
        "❌",
        "✔️",
        "❌",
        "✔️",
        "✔️",
        "✔️",
        "✔️",
        "❌",
        "✔️",
        "❌",
        "❌",
        "❌",
        "✔️",
      ],
    },
    {
      name: "Professional Plan",
      values: [
        "❌",
        "❌",
        "✔️",
        "✔️",
        "✔️",
        "✔️",
        "✔️",
        "✔️",
        "❌",
        "✔️",
        "❌",
        "✔️",
        "✔️",
      ],
    },
  ];

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkMobileView();

    // Add resize listener
    window.addEventListener("resize", checkMobileView);

    // Cleanup listener
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const DesktopView = () => (
    <div className="mt-28">
      <div className="pricing-table desktop-view bg-white text-gray-800 mx-auto max-w-6xl px-4 shadow-lg">
        <div className="pricing-header bg-gray-100 text-gray-900 font-bold flex rounded-t-xl overflow-hidden">
          <div className="pricing-header-cell flex-1 p-4 text-center text-lg">
            Features
          </div>
          {plans.map((plan, index) => (
            <div
              key={index}
              className="pricing-header-cell flex-1 p-4 text-center text-lg"
            >
              {plan.name}
            </div>
          ))}
        </div>

        <div className="rounded-b-xl overflow-hidden">
          {features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className="pricing-row flex border-b border-gray-200 hover:bg-pink-50 transition-all duration-300 ease-in-out hover:border-l-4 hover:border-l-red-600 group"
            >
              <div className="pricing-feature flex-1 p-4 font-medium group-hover:text-red-700 transition-colors">
                {feature}
              </div>
              {plans.map((plan, planIndex) => (
                <div
                  key={planIndex}
                  className="pricing-value flex-1 p-4 text-center group-hover:text-red-500 transition-colors duration-300 ease-in-out"
                >
                  {plan.values[featureIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MobileView = () => {
    const [expandedFeature, setExpandedFeature] = useState(0);

    return (
      <div className="mobile-view bg-white text-gray-800 px-4 mt-28">
        {features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="mobile-feature-row mb-4 bg-white rounded-lg overflow-hidden shadow-md"
          >
            <div
              className="mobile-feature-header bg-gray-100 p-4 font-bold text-base flex justify-between items-center cursor-pointer"
              onClick={() =>
                setExpandedFeature(
                  featureIndex === expandedFeature ? -1 : featureIndex
                )
              }
            >
              <span className="flex-grow text-gray-900">{feature}</span>
              <span className="ml-2 transform transition-transform duration-300 ease-in-out text-red-600">
                {expandedFeature === featureIndex ? "▲" : "▼"}
              </span>
            </div>

            {expandedFeature === featureIndex && (
              <div className="mobile-feature-table w-full">
                {plans.map((plan, planIndex) => (
                  <div
                    key={planIndex}
                    className="mobile-feature-plan flex border-b border-gray-200 last:border-b-0 hover:bg-pink-50"
                  >
                    <div className="mobile-plan-name w-2/5 p-3 font-medium bg-gray-50 flex items-center text-gray-800">
                      {plan.name}
                    </div>
                    <div className="mobile-plan-value w-3/5 p-3 flex items-center text-sm break-words">
                      {plan.values[featureIndex]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
};

export default PricingTable;
