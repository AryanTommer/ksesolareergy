interface KSELogoProps {
  className?: string;
}

export function KSELogo({ className = "" }: KSELogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      className={className}
    >
      <circle cx="250" cy="250" r="240" fill="#FFFFFF" />
      <circle
        cx="250"
        cy="250"
        r="240"
        fill="none"
        stroke="#F0F0F0"
        strokeWidth="2"
      />
      <g transform="translate(0, 0)">
        <text
          x="25"
          y="345"
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: "220px",
            fontStyle: "italic",
            fill: "#1A315A",
            letterSpacing: "-5px",
          }}
        >
          K
        </text>
        <text
          x="165"
          y="345"
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: "220px",
            fontStyle: "italic",
            fill: "#1A315A",
            letterSpacing: "-5px",
          }}
        >
          S
        </text>
        <text
          x="290"
          y="345"
          style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: "220px",
            fontStyle: "italic",
            fill: "#1A315A",
            letterSpacing: "-5px",
          }}
        >
          E
        </text>
        <path
          d="M 400 140 L 310 260 L 345 260 L 270 400 L 325 240 L 290 240 Z"
          fill="#69C545"
        />
      </g>
    </svg>
  );
}
