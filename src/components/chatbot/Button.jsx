// src/components/chatbot/Button.jsx
import React from "react";

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}) {
  const variants = {
    primary: "bg-[#D80032] text-white hover:bg-[#3D0C11]",
    secondary: "border border-[#D80032] text-[#D80032] hover:bg-[#F9DEC9]",
  };

  return (
    <button
      type={type}
      className={`px-4 py-2 rounded transition-colors ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
