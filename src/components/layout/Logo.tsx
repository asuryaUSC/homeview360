"use client";

import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeMap = {
    sm: 32, // 8 * 4px
    md: 72, // 10 * 4px
    lg: 52, // 12 * 4px
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Image */}
      <div
        className="relative transition-transform hover:scale-110 duration-300"
        style={{
          width: `${sizeMap[size]}px`,
          height: `${sizeMap[size]}px`,
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={1000}
          height={500}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className={`${textSizes[size]} font-bold text-black leading-none tracking-tight`}
        >
          HomeView
        </span>
        <span className="text-xs font-medium text-gray-500 leading-none tracking-wider">
          360°
        </span>
      </div>
    </div>
  );
}
