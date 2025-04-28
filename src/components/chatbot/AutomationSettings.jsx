// src/components/chatbot/AutomationSettings.jsx
import React, { useState } from "react";

export default function AutomationSettings({ initialSettings, onUpdate }) {
  const [settings, setSettings] = useState(
    initialSettings || {
      enableAutomatedResponses: true,
      enable24Support: true,
      enableContinuousLearning: true,
      responseTime: "Instant (0-2 seconds)",
      autoCategorizeInquiries: true,
      enableSentimentAnalysis: true,
      autoPrioritizeUrgent: true,
      dataCollection: "Essential Only",
    }
  );

  const handleChange = (field, value) => {
    const updatedSettings = { ...settings, [field]: value };
    setSettings(updatedSettings);
    onUpdate(updatedSettings);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-md font-medium mb-2 text-[#D80032]">
          Response Automation
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-response"
              checked={settings.enableAutomatedResponses}
              onChange={(e) =>
                handleChange("enableAutomatedResponses", e.target.checked)
              }
              className="mr-2 accent-[#D80032]"
            />
            <label htmlFor="auto-response" className="text-sm text-[#3D0C11]">
              Enable automated responses
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="after-hours"
              checked={settings.enable24Support}
              onChange={(e) =>
                handleChange("enable24Support", e.target.checked)
              }
              className="mr-2 accent-[#D80032]"
            />
            <label htmlFor="after-hours" className="text-sm text-[#3D0C11]">
              24/7 support (after hours)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="learning"
              checked={settings.enableContinuousLearning}
              onChange={(e) =>
                handleChange("enableContinuousLearning", e.target.checked)
              }
              className="mr-2 accent-[#D80032]"
            />
            <label htmlFor="learning" className="text-sm text-[#3D0C11]">
              Continuous learning from interactions
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3D0C11] mb-1">
              Response Time
            </label>
            <select
              className="w-full p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
              value={settings.responseTime}
              onChange={(e) => handleChange("responseTime", e.target.value)}
            >
              <option>Instant (0-2 seconds)</option>
              <option>Quick (3-5 seconds)</option>
              <option>Natural (5-8 seconds)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2 text-[#D80032]">
          Customer Query Management
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="auto-categorize"
              checked={settings.autoCategorizeInquiries}
              onChange={(e) =>
                handleChange("autoCategorizeInquiries", e.target.checked)
              }
              className="mr-2 accent-[#D80032]"
            />
            <label htmlFor="auto-categorize" className="text-sm text-[#3D0C11]">
              Auto-categorize inquiries
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="sentiment"
              checked={settings.enableSentimentAnalysis}
              onChange={(e) =>
                handleChange("enableSentimentAnalysis", e.target.checked)
              }
              className="mr-2 accent-[#D80032]"
            />
            <label htmlFor="sentiment" className="text-sm text-[#3D0C11]">
              Sentiment analysis
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="priority"
              checked={settings.autoPrioritizeUrgent}
              onChange={(e) =>
                handleChange("autoPrioritizeUrgent", e.target.checked)
              }
              className="mr-2 accent-[#D80032]"
            />
            <label htmlFor="priority" className="text-sm text-[#3D0C11]">
              Auto-prioritize urgent issues
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#3D0C11] mb-1">
              Data Collection
            </label>
            <select
              className="w-full p-2 border border-[#F78CA2] rounded focus:outline-none focus:ring-2 focus:ring-[#D80032] focus:border-transparent"
              value={settings.dataCollection}
              onChange={(e) => handleChange("dataCollection", e.target.value)}
            >
              <option>Essential Only</option>
              <option>Comprehensive</option>
              <option>Minimal</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
