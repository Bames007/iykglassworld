"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Pause, Play, Plus } from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
    title: "Maitama Curtain Wall",
    location: "Abuja · FCT",
    discipline: "Unitized Structural Glazing",
    spec: "24mm Low-Iron · Solar Control",
    id: "p1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
    title: "Asokoro Residence",
    location: "Abuja · FCT",
    discipline: "Frameless Structural Glazing",
    spec: "19mm Tempered · Acoustic Lamination",
    id: "p2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2000&auto=format&fit=crop",
    title: "Independence Pavilion",
    location: "Enugu · South-East",
    discipline: "Pivot Glass Entry Systems",
    spec: "15mm Tempered · Brushed Obsidian",
    id: "p3",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    title: "Guzape Commercial Facade",
    location: "Abuja · FCT",
    discipline: "Stick-Built Curtain Wall",
    spec: "32mm Laminated · Low-E Coating",
    id: "p4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    title: "Private Dining Commission",
    location: "GRA · Enugu",
    discipline: "Sculptural Glass Furniture",
    spec: "40mm Tempered · Satin Champagne",
    id: "p5",
  },
];

const specifications = [
  {
    index: "01",
    label: "GLASS SPECIFICATION",
    value: "12mm – 40mm Tempered & Laminated",
  },
  {
    index: "02",
    label: "FABRICATION STUDIOS",
    value: "Abuja (FCT) & Enugu, Nigeria",
  },
  {
    index: "03",
    label: "ENGINEERING PROTOCOL",
    value: "Bespoke CAD & Parametric Glazing",
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [current, paused]);

  const active = projects[current];

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] flex-col bg-[#F8F8F6] pt-24 text-[#111315] selection:bg-[#2563EB] selection:text-white md:pt-28 lg:pt-32"
    >
      {/* Main split — image left / text right */}
      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 lg:grid-cols-2">
        {/* LEFT — Image vitrine with blend mask */}
        <div
          className="relative flex flex-col border-b border-[#111315]/12 lg:border-b-0"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E6E4DD] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[560px] lg:flex-1 lg:[mask-image:linear-gradient(to_right,black_62%,transparent_100%)] lg:[-webkit-mask-image:linear-gradient(to_right,black_62%,transparent_100%)]">
            <motion.div style={{ y: imageY }} className="absolute inset-0">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={false}
                  animate={{ opacity: current === i ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={p.image}
                    alt={`${p.title}, ${p.location} — ${p.discipline}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Corner crosshairs */}
            <div className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-white/70" />
            <div className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-white/70" />
            <div className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/70" />
            <div className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/70" />
          </div>

          {/* Spec overlay — top right only */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-end px-6 pt-6 md:px-10 md:pt-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 mix-blend-difference">
              {active.spec}
            </div>
          </div>

          {/* Controls */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-6 pb-6 md:px-10 md:pb-8">
            <div className="pointer-events-auto flex items-center gap-3">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Show ${p.title}`}
                  aria-current={current === i}
                  className="group relative flex h-4 items-center"
                >
                  <span
                    className={`block h-px transition-all duration-500 ${
                      current === i
                        ? "w-10 bg-[#2563EB]"
                        : "w-6 bg-white/50 group-hover:bg-white/90"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="pointer-events-auto flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.18em] text-white/90 mix-blend-difference">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
                className="flex h-7 w-7 items-center justify-center border border-white/40 bg-black/20 text-white backdrop-blur-sm transition-colors hover:border-white/70 hover:bg-black/40"
              >
                {paused ? (
                  <Play className="h-3 w-3" fill="currentColor" />
                ) : (
                  <Pause className="h-3 w-3" fill="currentColor" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT — Typography & actions */}
        <div className="relative flex flex-col justify-between px-6 py-10 md:px-12 md:py-14 lg:py-16 lg:pl-16">
          <div>
            {/* Professional eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mb-6 flex items-center gap-3 lg:mb-8"
            >
              <span className="inline-block h-1.5 w-1.5 bg-[#2563EB]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
                Bespoke Architectural Glass · Abuja &amp; Enugu
              </span>
            </motion.div>

            {/* Headline — upright, no italics */}
            <h1 className="font-display text-[clamp(2.5rem,4.8vw,5rem)] font-medium leading-[0.98] tracking-[-0.028em] text-[#111315]">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.2 }}
                >
                  Sculpting Light.
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  className="block text-[#111315]/60"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.85, ease: EASE, delay: 0.32 }}
                >
                  Engineering{" "}
                  <span className="text-[#2563EB]">Transparency.</span>
                </motion.span>
              </span>
            </h1>

            {/* Live caption */}
            <div className="mt-6 min-h-[3rem] lg:mt-8 lg:min-h-[3.5rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2563EB]">
                    Now viewing · {active.location}
                  </p>
                  <p className="mt-1.5 font-display text-lg font-medium text-[#111315]/85 lg:text-xl">
                    {active.title} — {active.discipline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 max-w-lg lg:mt-0">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.45 }}
              className="border-l-2 border-[#2563EB] pl-5 text-[15px] font-normal leading-relaxed text-[#454952] lg:text-base"
            >
              Precision curtain walls, frameless structural glazing, and
              sculptural glass furniture engineered for luxury residences and
              commercial landmarks across Abuja and Enugu.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.58 }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#consultation"
                className="group inline-flex items-center justify-between gap-6 bg-[#2563EB] px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#1D4ED8]"
              >
                <span>Commission Custom Glass</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#divisions"
                className="group inline-flex items-center justify-between gap-6 border border-[#111315]/25 bg-transparent px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] transition-colors duration-300 hover:border-[#111315] hover:bg-[#111315] hover:text-[#F8F8F6]"
              >
                <span>Explore Catalog</span>
                <Plus className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom specification ledger */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: EASE, delay: 0.7 }}
        className="relative z-10 border-t border-[#111315]/12 bg-[#F8F8F6]"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-[#111315]/12 md:grid-cols-3 md:divide-x md:divide-y-0">
          {specifications.map((item) => (
            <div
              key={item.index}
              className="group flex items-start justify-between px-6 py-4 transition-colors duration-300 hover:bg-[#F2F1ED] md:px-12 md:py-5"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#5A5E66]">
                  {item.label}
                </p>
                <p className="mt-1 font-sans text-sm font-medium tracking-[-0.01em] text-[#111315]">
                  {item.value}
                </p>
              </div>
              <span className="font-mono text-xs font-medium text-[#2563EB]">
                /{item.index}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
