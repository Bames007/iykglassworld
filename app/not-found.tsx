"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Compass, MessageSquare } from "lucide-react";
import { GlassMonogram } from "./components/GlassMonogram";
import { useConsultation } from "./components/consultation/ConsultationProvider";

const EASE = [0.19, 1, 0.22, 1] as const;

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Our Works", href: "/#works" },
  { label: "Gallery", href: "/#gallery" },
  { label: "The Method", href: "/#method" },
];

export default function NotFound() {
  const { open: openConsultation } = useConsultation();

  return (
    <main className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#F8F8F6] px-6 py-8 text-[#111315] md:px-12 md:py-10">
      {/* Architectural Grid & Light Refraction Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(17,19,21,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,19,21,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#2563EB]/10 blur-[120px]"
      />

      {/* Top Brand Bar */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-[#111315]/10 pb-6"
      >
        <Link href="/" className="flex items-center gap-3">
          <GlassMonogram className="h-8 w-8" />
          <span className="font-sans text-[0.7rem] font-medium tracking-[0.28em] text-[#1A1613] md:text-xs">
            IYK GLASSWORLD
          </span>
        </Link>

        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#5A5E66]">
          Status · 404
        </span>
      </motion.header>

      {/* Center Content */}
      <section className="relative z-10 mx-auto my-auto w-full max-w-[1440px] py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
              className="mb-6 flex items-center gap-3"
            >
              <span className="inline-block h-1.5 w-1.5 bg-[#2563EB]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
                Error 404 · Unmapped Coordinate
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
              className="font-display text-[clamp(2.4rem,5.2vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em] text-[#111315]"
            >
              This elevation does not{" "}
              <span className="text-[#2563EB]">exist</span> in our archive.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.22 }}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#454952] md:text-base"
            >
              The page or specification you are looking for may have been moved,
              archived, or entered with an outdated link. Return to our primary
              showcase or speak directly with our engineering team.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.32 }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[#1A1613] px-6 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#F3EFE6] transition-all duration-300 hover:bg-[#2563EB]"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Return to Homepage
              </Link>

              <button
                type="button"
                onClick={openConsultation}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#111315]/15 bg-white/60 px-6 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] backdrop-blur-xl transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                <MessageSquare className="h-3.5 w-3.5 text-[#2563EB]" />
                Request Consultation
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </div>

          {/* Right Frosted Architectural Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#111315]/10 bg-white/55 p-8 shadow-[0_20px_50px_-20px_rgba(17,19,21,0.14)] backdrop-blur-2xl md:p-10">
              <div className="flex items-center justify-between border-b border-[#111315]/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <Compass
                    className="h-4 w-4 text-[#2563EB]"
                    strokeWidth={1.6}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5A5E66]">
                    Site Directory
                  </span>
                </div>
                <span className="font-mono text-xs font-medium text-[#2563EB]">
                  TOL ±0.5MM
                </span>
              </div>

              <div className="my-8 select-none font-display text-7xl font-medium tracking-tighter text-[#111315]/10 md:text-8xl">
                404
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#5A5E66]">
                  Navigate Directly To
                </p>
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  {quickLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl border border-[#111315]/10 bg-[#F8F8F6]/80 px-4 py-3 text-xs font-medium tracking-wide text-[#111315] transition-colors hover:border-[#2563EB]/40 hover:text-[#2563EB]"
                    >
                      {item.label}
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#5A5E66] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2563EB]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Studio Coordinates */}
      <footer className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-start justify-between gap-2 border-t border-[#111315]/10 pt-6 text-[11px] uppercase tracking-[0.2em] text-[#5A5E66] sm:flex-row sm:items-center">
        <span>Abuja · Enugu — Nigeria</span>
        <span>Architectural Glass Engineering</span>
      </footer>
    </main>
  );
}
