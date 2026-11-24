export function GlassMonogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3L28 24H4L16 3Z"
        stroke="url(#mono-a)"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M16 9L23.5 23H8.5L16 9Z"
        stroke="#1A1613"
        strokeOpacity="0.75"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M16 3V24"
        stroke="#1A1613"
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
      <defs>
        <linearGradient id="mono-a" x1="4" y1="3" x2="28" y2="24">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
