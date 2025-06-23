// src/components/ui/button.jsx
import React from 'react';

export function Button({ children, onClick, variant, className, ...props }) {
  let baseClasses = "px-4 py-2 rounded font-semibold";
  if (variant === "destructive") {
    baseClasses += " bg-red-500 text-white";
  } else if (variant === "outline") {
    baseClasses += " border border-gray-400 text-gray-800";
  } else if (variant === "secondary") {
    baseClasses += " bg-gray-200 text-gray-800";
  } else {
    baseClasses += " bg-blue-500 text-white";
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}