import React from "react";

function Logo({ src, alt = "Logo", size = "md", className = "" }) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={`rounded-full overflow-hidden ${sizeMap[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

export default Logo;
