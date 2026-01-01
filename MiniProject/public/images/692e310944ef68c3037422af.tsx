import React, { useState } from 'react';

interface BhaktivedantaLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const BhaktivedantaLogo: React.FC<BhaktivedantaLogoProps> = ({
  className = "",
  width = 300,
  height = 80
}) => {
  const [imageError, setImageError] = useState(false);
  const [svgError, setSvgError] = useState(false);

  // Fallback SVG logo (same as before)
  const FallbackLogo = () => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 80"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background */}
      <rect width="300" height="80" fill="white" rx="4"/>

      {/* Lotus/Devotion Symbol */}
      <g transform="translate(20, 15)">
        {/* Outer petals */}
        <path d="M25 10 Q 30 5 35 10 Q 40 20 25 30 Q 10 20 15 10 Q 20 5 25 10 Z" fill="#fb923c" opacity="0.8"/>
        {/* Inner petals */}
        <path d="M25 15 Q 32 18 38 15 Q 42 28 25 35 Q 8 28 12 15 Q 18 18 25 15 Z" fill="#dc2626" opacity="0.9"/>
        {/* Center */}
        <circle cx="25" cy="25" r="4" fill="#fbbf24"/>
        {/* Cross symbol */}
        <path d="M23 20 L27 20 L27 30 L23 30 Z M20 23 L30 23 L30 27 L20 27 Z" fill="white"/>
      </g>

      {/* Hospital Name */}
      <text x="70" y="25" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#1e40af">
        BHAKTIVEDANTA
      </text>
      <text x="70" y="42" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="600" fill="#1d4ed8">
        HOSPITAL &amp; RESEARCH INSTITUTE
      </text>

      {/* Tagline */}
      <text x="70" y="58" fontFamily="Arial, sans-serif" fontSize="8" fill="#6b7280" fontStyle="italic">
        Serving in Devotion • Excellence in Healthcare
      </text>

      {/* Decorative border */}
      <rect x="2" y="2" width="296" height="76" fill="none" stroke="#fb923c" strokeWidth="1" rx="4"/>
    </svg>
  );

  // Try PNG first, then SVG, then fallback
  if (!imageError) {
    return (
      <img
        src="/logo.png"
        alt="Bhaktivedanta Hospital & Research Institute"
        className={className}
        style={{ width, height, objectFit: 'contain' }}
        onError={() => setImageError(true)}
      />
    );
  }

  if (!svgError) {
    return (
      <img
        src="/logo.svg"
        alt="Bhaktivedanta Hospital & Research Institute"
        className={className}
        style={{ width, height, objectFit: 'contain' }}
        onError={() => setSvgError(true)}
      />
    );
  }

  // Fallback to the original SVG
  return <FallbackLogo />;
};

export default BhaktivedantaLogo;
