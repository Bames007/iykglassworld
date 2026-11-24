"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GlassMonogram } from "./GlassMonogram";
import { useConsultation } from "./consultation/ConsultationProvider";

const links = [
  { label: "About", href: "#about" },
  { label: "Our Works", href: "#works" },
  { label: "Gallery", href: "#gallery" },
  { label: "The Method", href: "#method" },
  { label: "Client Voices", href: "#voices" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { open: openConsultation } = useConsultation();

  const handleMobileConsultation = () => {
    setOpen(false);
    openConsultation();
  };

  return (
    <>
      <motion.header
        id="navbar"
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
      >
        <nav
          aria-label="Primary Navigation"
          className="mx-auto flex max-w-[1480px] items-center justify-between rounded-2xl border border-[#1A1613]/10 bg-[#F3EFE6]/70 px-4 py-3 shadow-[0_8px_32px_-12px_rgba(26,22,19,0.12)] backdrop-blur-2xl md:px-6 md:py-4"
        >
          <a href="#hero" className="flex items-center gap-3">
            <GlassMonogram className="h-8 w-8 md:h-9 md:w-9" />
            <span className="font-sans text-[0.7rem] font-medium tracking-[0.28em] text-[#1A1613] md:text-xs">
              IYK GLASSWORLD
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-[0.7rem] font-light tracking-[0.18em] text-[#1A1613]/65 transition-colors duration-300 hover:text-[#1A1613]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={openConsultation}
            className="group hidden cursor-pointer items-center gap-2 rounded-full bg-[#1A1613] px-5 py-2.5 font-sans text-[0.7rem] font-medium tracking-[0.14em] text-[#F3EFE6] transition-all duration-500 hover:bg-[#2563EB] lg:flex"
          >
            Request Consultation
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-lg border border-[#1A1613]/15 p-2 text-[#1A1613]/70 transition-colors hover:border-[#1A1613]/30 hover:text-[#1A1613] lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#F3EFE6] lg:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <a
                href="#hero"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <GlassMonogram className="h-8 w-8" />
                <span className="font-sans text-[0.65rem] font-medium tracking-[0.28em] text-[#1A1613]">
                  IYK GLASSWORLD
                </span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[#1A1613]/15 p-2 text-[#1A1613]/70 hover:text-[#1A1613]"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-16 flex flex-col gap-2 px-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-[#1A1613]/10 py-5 font-display text-3xl font-medium tracking-tight text-[#1A1613]/90"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto px-6 pb-10">
              <button
                type="button"
                onClick={handleMobileConsultation}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#1A1613] py-4 font-sans text-sm font-medium tracking-[0.14em] text-[#F3EFE6] transition-colors hover:bg-[#2563EB]"
              >
                Request Consultation
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
