/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export interface LogoProps {
  className?: string;
  height?: number | string;
  variant?: 'default' | 'light';
}

/**
 * Official Corporación Emacin S.A.C. Brand Logo
 * Exactly preserves original colors, shape, and solid white background as in the official brand image:
 * - Solid pure white background card with subtle rounded corners and clean padding
 * - Outer yellow-to-orange-red crescent 'C' with gloss highlights
 * - Sculpted 3D navy blue 'e' with electric cyan specular reflection
 * - "CORPORACIÓN" in vivid emerald / teal green
 * - "emacin" in deep 3D navy blue metallic finish with soft depth
 *
 * NOTE: The background and original colors are NEVER removed, even if variant="light" is passed.
 */
export const Logo: React.FC<LogoProps> = ({
  className = '',
  height = '50px',
}) => {
  const heightStyle = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`inline-flex items-center select-none transition-transform hover:scale-[1.02] shadow-md rounded-xl overflow-hidden bg-white ${className}`}
      role="img"
      aria-label="Corporación Emacin S.A.C. - Plásticos de Ingeniería y Aislamientos Industriales"
    >
      <svg
        viewBox="0 0 540 160"
        style={{ height: heightStyle, width: 'auto' }}
        className="block h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Card subtle soft shadow */}
          <filter id="emacinCardFilter" x="-5%" y="-10%" width="110%" height="125%">
            <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000000" floodOpacity="0.12" />
          </filter>

          {/* Yellow-to-Orange Crescent 3D Gradient */}
          <linearGradient id="emacinCrescentGradient" x1="12%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#FFF200" />
            <stop offset="25%" stopColor="#FFD200" />
            <stop offset="55%" stopColor="#FFA000" />
            <stop offset="85%" stopColor="#FF7000" />
            <stop offset="100%" stopColor="#FF4D00" />
          </linearGradient>

          {/* Gloss highlight arc along top rim */}
          <linearGradient id="emacinCrescentGloss" x1="15%" y1="0%" x2="80%" y2="80%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* 3D Navy Blue Gradient for inner 'e' */}
          <linearGradient id="emacinInnerEGradient" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#1671C2" />
            <stop offset="35%" stopColor="#0A4F94" />
            <stop offset="70%" stopColor="#05366A" />
            <stop offset="100%" stopColor="#021E3E" />
          </linearGradient>

          {/* Specular cyan streak for 'e' */}
          <linearGradient id="emacinCyanSpecular" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6DC5FF" />
            <stop offset="50%" stopColor="#3297F2" />
            <stop offset="100%" stopColor="#0A4C8E" />
          </linearGradient>

          {/* 3D Metallic Navy Gradient for wordmark 'emacin' */}
          <linearGradient id="emacinWordmarkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0E60A0" />
            <stop offset="25%" stopColor="#094C86" />
            <stop offset="65%" stopColor="#053664" />
            <stop offset="100%" stopColor="#021E3D" />
          </linearGradient>

          {/* Soft shadow for wordmark and icon onto white card */}
          <filter id="emacinTextShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="2.5" stdDeviation="2.5" floodColor="#021C38" floodOpacity="0.22" />
          </filter>

          <filter id="emacinIconShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="1" dy="3" stdDeviation="3.5" floodColor="#001830" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* 1. SOLID PURE WHITE BACKGROUND AS IN OFFICIAL BRAND IMAGE */}
        <rect
          x="0"
          y="0"
          width="540"
          height="160"
          rx="12"
          fill="#FFFFFF"
        />

        {/* 2. THE ISOTYPE / EMBLEM (LEFT) */}
        <g transform="translate(18, 11)" filter="url(#emacinIconShadow)">
          {/* Outer Yellow/Orange Crescent Swoosh ('C') */}
          <path
            d="M 146 25 
               C 120 -3 66 1 31 31 
               C -6 61 -2 108 30 128 
               C 64 148 123 140 148 99 
               C 140 103 118 106 94 102 
               C 57 96 35 70 47 41 
               C 57 19 102 12 146 25 Z"
            fill="url(#emacinCrescentGradient)"
          />

          {/* Crescent Upper Gloss Arc */}
          <path
            d="M 140 27
               C 116 5 71 7 43 33
               C 23 51 17 73 19 89
               C 21 69 31 49 49 36
               C 77 15 115 15 140 27 Z"
            fill="url(#emacinCrescentGloss)"
          />

          {/* Inner dynamic lowercase 'e' in sculpted 3D Navy Blue */}
          <path
            d="M 49 72 
               C 49 51 67 37 89 37 
               C 112 37 127 51 127 72 
               C 127 76 124 79 117 79 
               L 63 79 
               C 65 94 78 103 97 101 
               C 109 100 120 94 126 87 
               L 133 97 
               C 123 108 108 113 89 113 
               C 64 113 49 93 49 72 Z 
               M 89 50 
               C 76 50 66 59 64 71 
               L 114 71 
               C 112 60 100 50 89 50 Z"
            fill="url(#emacinInnerEGradient)"
          />

          {/* Specular cyan streak for 'e' */}
          <path
            d="M 67 68 L 106 57 L 101 53 L 69 64 Z"
            fill="url(#emacinCyanSpecular)"
            opacity="0.9"
          />

          {/* Subtle light edge bevel reflection on 'e' */}
          <path
            d="M 53 70 C 53 56 65 43 86 41 L 87 44 C 69 46 57 57 57 70 Z"
            fill="#8AC5FF"
            opacity="0.65"
          />
        </g>

        {/* 3. 'CORPORACIÓN' IN VIVID EMERALD / TEAL GREEN */}
        <text
          x="182"
          y="47"
          fill="#009E60"
          fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
          fontSize="22"
          fontWeight="800"
          letterSpacing="5.5"
        >
          CORPORACIÓN
        </text>

        {/* 4. 'emacin' IN DEEP SCULPTED METALLIC 3D NAVY BLUE */}
        <g filter="url(#emacinTextShadow)">
          <text
            x="178"
            y="123"
            fill="url(#emacinWordmarkGradient)"
            fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            fontSize="82"
            fontWeight="900"
            letterSpacing="-1.5"
          >
            emacin
          </text>
        </g>
      </svg>
    </div>
  );
};
