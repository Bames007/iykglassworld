"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

type LightRefractionProps = {
  children: React.ReactNode;
  className?: string;
};

export function LightRefraction({ children, className }: LightRefractionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className ?? ""}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(56,189,248,0.18), transparent 45%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
