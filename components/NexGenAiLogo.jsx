import React from "react";

const NexGenAiLogo = ({ width = 240, height = 60 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
  >
    <defs>
      <linearGradient id="ai-gradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00c6fb" />
        <stop offset="100%" stopColor="#005bea" />
      </linearGradient>
    </defs>
    {/* NEX */}
    <text
      x="5"
      y="38"
      fontFamily="Montserrat, Arial, sans-serif"
      fontWeight="bold"
      fontSize="32"
      fill="#fff"
      letterSpacing="2"
    >
      NEX
    </text>
    {/* Stylized G (with tie/jacket) */}
    <g>
      <text
        x="80"
        y="38"
        fontFamily="Montserrat, Arial, sans-serif"
        fontWeight="bold"
        fontSize="32"
        fill="#fff"
        letterSpacing="2"
      >
        G
      </text>
      {/* Tie/jacket effect inside G */}
      <rect x="93" y="18" width="4" height="16" rx="1.5" fill="#005bea" />
      <polygon points="95,34 92,44 98,44" fill="#00c6fb" />
    </g>
    {/* EN */}
    <text
      x="110"
      y="38"
      fontFamily="Montserrat, Arial, sans-serif"
      fontWeight="bold"
      fontSize="32"
      fill="#fff"
      letterSpacing="2"
    >
      EN
    </text>
    {/* AI in gradient */}
    <text
      x="170"
      y="38"
      fontFamily="Montserrat, Arial, sans-serif"
      fontWeight="bold"
      fontSize="32"
      fill="url(#ai-gradient)"
      letterSpacing="2"
    >
      Ai
    </text>
  </svg>
);

export default NexGenAiLogo; 