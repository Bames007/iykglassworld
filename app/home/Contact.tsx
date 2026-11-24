"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react";
import { useConsultation } from "../components/consultation/ConsultationProvider";

const EASE = [0.19, 1, 0.22, 1] as const;

const studios = [
  {
    city: "Abuja",
    address: "Plot 1142, Kur Mohammed Ave, Central Business District",
    phone: "+234 803 000 0001",
    hours: "Mon — Fri · 08:00 — 17:00",
  },
  {
    city: "Enugu",
    address: "14A Independence Layout, Enugu North",
    phone: "+234 803 000 0002",
    hours: "Mon — Fri · 08:00 — 17:00",
  },
];

export function Contact() {
  const { open } = useConsultation();

  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-[#F8F8F6] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Section header */}
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
              Consultation · Abuja &amp; Enugu
            </span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66] sm:block">
            Response within 2 business days
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="mb-12 max-w-4xl font-display text-[clamp(2.1rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.028em] text-[#111315] md:mb-16"
        >
          Let's talk about <span className="text-[#2563EB]">the glass.</span>
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left — contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            className="col-span-1 space-y-6 lg:col-span-5"
          >
            <div className="space-y-3">
              <a
                href="mailto:hello@iykglassworld.com"
                className="group flex items-center gap-4 border border-[#111315]/10 bg-white p-4 transition-colors hover:border-[#2563EB]/40"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[#111315]/15 text-[#2563EB]">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#5A5E66]">
                    Email
                  </p>
                  <p className="mt-0.5 truncate text-[13.5px] font-medium text-[#111315]">
                    hello@iykglassworld.com
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#5A5E66] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2563EB]" />
              </a>

              <a
                href="tel:+2348030000001"
                className="group flex items-center gap-4 border border-[#111315]/10 bg-white p-4 transition-colors hover:border-[#2563EB]/40"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-[#111315]/15 text-[#2563EB]">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-[#5A5E66]">
                    Call
                  </p>
                  <p className="mt-0.5 truncate text-[13.5px] font-medium text-[#111315]">
                    +234 803 000 0001
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#5A5E66] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#2563EB]" />
              </a>
            </div>

            <div className="border-t border-[#111315]/10 pt-6">
              <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
                Studios
              </p>
              <div className="space-y-4">
                {studios.map((s) => (
                  <div
                    key={s.city}
                    className="border-l-2 border-[#2563EB] pl-4"
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-[#2563EB]" />
                      <p className="text-[13.5px] font-medium text-[#111315]">
                        {s.city}
                      </p>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[#454952]">
                      {s.address}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#5A5E66]">
                      <span>{s.phone}</span>
                      <span className="h-2 w-px bg-[#111315]/15" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {s.hours}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.28 }}
            className="col-span-1 lg:col-span-7"
          >
            <div className="flex h-full flex-col justify-between bg-[#111315] p-6 text-white md:p-10">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="inline-block h-1.5 w-1.5 bg-[#2563EB]" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/60">
                    Commission Brief
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.1] tracking-[-0.02em]">
                  Every commission begins with a{" "}
                  <span className="text-[#2563EB]">site visit.</span>
                </h3>
                <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-white/60">
                  Share your site, your intent, and your timeline. We'll visit,
                  survey, and respond with a plan — no obligation, no pressure.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                  <Stat value="2 days" label="Response time" />
                  <Stat value="Free" label="Site visit" />
                </div>
              </div>

              <button
                type="button"
                onClick={open}
                className="group mt-8 inline-flex items-center justify-between gap-4 bg-[#2563EB] px-6 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#1D4ED8]"
              >
                <span className="inline-flex items-center gap-2.5">
                  <MessageSquare className="h-4 w-4" />
                  Start a consultation
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-xl font-medium text-white">{value}</p>
      <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/40">
        {label}
      </p>
    </div>
  );
}
