"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Layers,
  Ruler,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { useConsultation } from "../components/consultation/ConsultationProvider";

const EASE = [0.19, 1, 0.22, 1] as const;

const stats = [
  { value: "11", suffix: "+", label: "Years of Practice" },
  { value: "240", suffix: "+", label: "Projects Delivered" },
  { value: "98", suffix: "%", label: "Client Retention" },
];

const principles = [
  {
    icon: Ruler,
    title: "Measured Precision",
    description:
      "Every panel engineered to tolerances within 0.5mm, verified through CAD simulation before a single cut is made.",
  },
  {
    icon: Layers,
    title: "Material Integrity",
    description:
      "Low-Iron, tempered, and laminated glass sourced exclusively through certified European mills.",
  },
  {
    icon: ShieldCheck,
    title: "Structural Confidence",
    description:
      "Wind-load, thermal, and acoustic performance modeled to EN 12150 and ASTM C1048 standards.",
  },
];

export function About() {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { open } = useConsultation();

  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#F8F8F6] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-10 flex items-center justify-between border-t border-[#111315]/15 pt-5 md:mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 bg-[#2563EB]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
              About · IYK Glassworld
            </span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66] sm:block">
            Since 2014
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mb-12 max-w-5xl font-display text-[clamp(2.1rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.028em] text-[#111315] md:mb-16"
        >
          An engineering practice devoted to{" "}
          <span className="text-[#2563EB]">precision</span>, material integrity,
          and the discipline of light.
        </motion.h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div ref={imageContainerRef} className="relative lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.1, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden border border-[#111315]/10 bg-[#E6E4DD] lg:aspect-[5/6]"
            >
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 -top-8 -bottom-8"
              >
                <Image
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop"
                  alt="Architectural glass façade detail in natural light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
              className="absolute left-2 top-8 md:left-4 lg:-left-6"
            >
              <div className="w-40 rounded-xl border border-white/40 bg-white/55 p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:w-48 md:p-5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#2563EB]">
                  Studio
                </p>
                <p className="mt-1.5 font-display text-2xl font-medium leading-tight text-[#111315] md:text-3xl">
                  Abuja
                </p>
                <p className="mt-0.5 text-[11px] text-[#454952]">
                  FCT · Nigeria
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
              className="absolute bottom-8 right-2 md:right-4 lg:-right-6"
            >
              <div className="w-44 rounded-xl border border-white/40 bg-white/55 p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl md:w-52 md:p-5">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#2563EB]">
                  Fabrication
                </p>
                <p className="mt-1.5 font-display text-2xl font-medium leading-tight text-[#111315] md:text-3xl">
                  Enugu
                </p>
                <p className="mt-0.5 text-[11px] text-[#454952]">
                  South-East · Nigeria
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="text-[15px] leading-relaxed text-[#454952] md:text-base"
            >
              IYK Glassworld is an architectural glass engineering practice
              operating between Abuja and Enugu. For over a decade we have
              designed, fabricated, and installed structural glazing, curtain
              walls, frameless systems, and sculptural glass furniture for
              residential and commercial landmarks across Nigeria.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.28 }}
              className="mt-5 text-[15px] leading-relaxed text-[#454952] md:text-base"
            >
              We treat glass as a material with a voice — one that can hold,
              divide, and illuminate a space without interrupting it. Every
              commission begins with a study of light, sightlines, and thermal
              behavior, and ends with a hand-finished surface engineered for the
              decades ahead.
            </motion.p>

            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-[#111315]/10 py-5 md:mt-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: 0.4 + i * 0.1,
                  }}
                >
                  <p className="font-display text-2xl font-medium tracking-tight text-[#111315] md:text-3xl">
                    {s.value}
                    <span className="text-[#2563EB]">{s.suffix}</span>
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#5A5E66]">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTAs — both a scroll link and the modal */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
              className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center md:mt-10"
            >
              <button
                type="button"
                onClick={open}
                className="group inline-flex items-center gap-3 bg-[#2563EB] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1D4ED8]"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Start a consultation
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <a
                href="#process"
                className="group inline-flex items-center gap-3 border-b border-[#111315]/20 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Read our engineering process
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-[#111315]/10 bg-white/40 p-6 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors duration-500 hover:border-[#2563EB]/30 md:p-8"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#2563EB]/0 blur-3xl transition-all duration-700 group-hover:bg-[#2563EB]/20" />
              <p.icon
                className="mb-5 h-6 w-6 text-[#2563EB] md:mb-6"
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl font-medium text-[#111315] md:text-2xl">
                {p.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-[#454952] md:text-sm">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
