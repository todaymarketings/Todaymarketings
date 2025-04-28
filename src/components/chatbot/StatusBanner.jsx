// src/components/chatbot/StatusBanner.jsx
import React from "react";

export default function StatusBanner({ isActive }) {
  return (
    <div className="bg-[#F9DEC9] p-4 rounded-lg mb-6">
      <p className="text-[#3D0C11]">
        <span className="font-medium">Status:</span>
        <span className="text-[#D80032] font-semibold">
          {isActive ? "Active" : "Inactive"}
        </span>{" "}
        -
        {isActive
          ? " Your AI chatbot is currently providing 24/7 customer support"
          : " Your AI chatbot is currently offline"}
      </p>
    </div>
  );
}
