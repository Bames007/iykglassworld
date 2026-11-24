"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Ruler,
  DraftingCompass,
  Factory,
  Truck,
  KeyRound,
  ClipboardCheck,
  ChevronDown,
} from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

type Step = {
  index: string;
  title: string;
  subtitle: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
  image: string;
  imageAlt: string;
};

const steps: Step[] = [
  {
    index: "01",
    title: "Survey & Brief",
    subtitle: "A physical read of the site",
    duration: "1–2 weeks",
    icon: Ruler,
    description:
      "We visit the site, measure every opening and structural interface, and sit with the design intent. Sun angles, prevailing wind, setback distances, and the client's daily rhythm all shape the brief before a single CAD file is opened.",
    deliverables: [
      "Site survey report",
      "Structural condition audit",
      "Solar & thermal exposure map",
      "Signed design brief",
    ],
    specs: [
      { label: "Measurement tolerance", value: "± 2 mm" },
      { label: "Survey instrument", value: "Leica total station" },
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Site survey with architectural drawings on site",
  },
  {
    index: "02",
    title: "Engineering & CAD",
    subtitle: "Where geometry becomes physics",
    duration: "2–4 weeks",
    icon: DraftingCompass,
    description:
      "Every pane is modelled in 3D, then stress-tested for wind-load, thermal expansion, and deflection. We produce full fabrication drawings, glass schedule, and an installation sequence — signed off before any material is ordered.",
    deliverables: [
      "Shop drawings (1:1 details)",
      "Glass & hardware schedule",
      "Wind-load simulation report",
      "Installation sequencing plan",
    ],
    specs: [
      { label: "Modelling software", value: "AutoCAD · Rhino" },
      { label: "Structural standard", value: "BS 6399 · Eurocode" },
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop&auto=format",
    imageAlt: "CAD drawings and structural calculations on a desk",
  },
  {
    index: "03",
    title: "Fabrication",
    subtitle: "Cut, bevel, temper, anodize",
    duration: "3–8 weeks",
    icon: Factory,
    description:
      "Fabrication runs from our Abuja and Enugu workshops. Glass is CNC-cut and beveled to drawing tolerance, tempered in-house, and every aluminium profile is anodized or powder-coated to spec. Each pane is signed off by QA before it leaves.",
    deliverables: [
      "CNC-machined glass panes",
      "Anodized/powder-coated mullions",
      "QA sign-off sheet per pane",
      "Pre-assembly dry-fit",
    ],
    specs: [
      { label: "Cut tolerance", value: "± 0.5 mm" },
      { label: "Temper standard", value: "EN 12150" },
    ],
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Glass fabrication workshop with CNC machinery",
  },
  {
    index: "04",
    title: "Installation",
    subtitle: "Precision on a live site",
    duration: "1–3 weeks",
    icon: Truck,
    description:
      "Panes arrive crated with a per-unit QR code. The install team follows the sequence plan, verifies every anchor to torque spec, and photographs each fixing. Structural silicone cure windows are logged and respected — we never compress a cure.",
    deliverables: [
      "Anchor torque verification log",
      "Structural silicone cure record",
      "Daily install photographs",
      "Progress handover to client",
    ],
    specs: [
      { label: "Anchor torque", value: "Verified per unit" },
      { label: "Silicone cure", value: "Min. 21 days logged" },
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Installation crew fitting glazing on site",
  },
  {
    index: "05",
    title: "QA & Handover",
    subtitle: "Every pane, every anchor, every seal",
    duration: "3–5 days",
    icon: ClipboardCheck,
    description:
      "A full walk-through with the client and a signed inspection checklist. We test every operable pane, cycle every smart-glass zone, and hand over the as-built drawings, warranty, and maintenance protocol.",
    deliverables: [
      "Signed inspection checklist",
      "As-built drawing set",
      "Warranty certificate",
      "Maintenance protocol",
    ],
    specs: [
      { label: "Warranty", value: "10 years — glass · 5 years — hardware" },
      { label: "Maintenance cycle", value: "Annual, scheduled" },
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Handover walk-through with client",
  },
  {
    index: "06",
    title: "Aftercare",
    subtitle: "The relationship doesn't end at handover",
    duration: "Annual",
    icon: KeyRound,
    description:
      "Scheduled inspections, gasket replacements, and a direct line to the fabrication team for any pane that needs to be remade. Bespoke glass isn't off-the-shelf — the team that built it stays reachable.",
    deliverables: [
      "Annual inspection report",
      "Priority gasket/hardware supply",
      "Direct line to fabrication",
    ],
    specs: [
      { label: "Response time", value: "≤ 72 hours" },
      { label: "Spare pane stock", value: "Held for 5 years" },
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Finished glazed interior maintained over time",
  },
];

export function TheMethod() {
  const [open, setOpen] = useState<string | null>(steps[0].index);

  return (
    <section
      id="the-method"
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
              The Method · Brief to Aftercare
            </span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66] sm:block">
            {steps.length} Phases
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-16 lg:grid-cols-12">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="col-span-1 max-w-3xl font-display text-[clamp(2.1rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.028em] text-[#111315] lg:col-span-7"
          >
            A commission, <span className="text-[#2563EB]">engineered.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="col-span-1 max-w-md self-end border-l-2 border-[#2563EB] pl-5 text-[14px] leading-relaxed text-[#454952] lg:col-span-5"
          >
            Every pane you see in the portfolio passed through six stages of
            engineering and physical verification. This is what a Doza
            commission actually involves.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical rail */}
          <div
            aria-hidden
            className="absolute left-[18px] top-0 hidden h-full w-px bg-gradient-to-b from-[#111315]/15 via-[#111315]/15 to-transparent md:block"
          />

          <div className="space-y-4 md:space-y-3">
            {steps.map((step, i) => {
              const isOpen = open === step.index;
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.75,
                    ease: EASE,
                    delay: i * 0.05,
                  }}
                  className="relative pl-0 md:pl-14"
                >
                  {/* Step marker */}
                  <div className="absolute left-0 top-4 hidden h-9 w-9 items-center justify-center border border-[#111315]/15 bg-[#F8F8F6] md:flex">
                    <span className="font-mono text-[10px] font-medium text-[#2563EB]">
                      {step.index}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden border transition-colors duration-500 ${
                      isOpen
                        ? "border-[#2563EB]/40 bg-white"
                        : "border-[#111315]/10 bg-white/40 hover:border-[#111315]/25"
                    }`}
                  >
                    {/* Header row */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpen((o) => (o === step.index ? null : step.index))
                      }
                      className="group flex w-full items-center gap-4 px-5 py-4 text-left md:gap-6 md:px-7 md:py-5"
                      aria-expanded={isOpen}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors ${
                          isOpen
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-[#111315]/20 text-[#111315]/70 group-hover:border-[#111315]/40"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#2563EB]">
                            /{step.index}
                          </span>
                          <h3 className="font-display text-lg font-medium tracking-[-0.01em] text-[#111315] md:text-xl">
                            {step.title}
                          </h3>
                          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-[#5A5E66] sm:inline">
                            · {step.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="hidden items-center gap-4 sm:flex">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#5A5E66]">
                          {step.duration}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 text-[#5A5E66] transition-transform duration-500 ${
                            isOpen ? "rotate-180 text-[#2563EB]" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Expandable body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#111315]/10 p-5 md:p-7">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                              {/* Image */}
                              <div className="relative col-span-1 aspect-[4/3] overflow-hidden bg-[#E6E4DD] lg:col-span-5">
                                <Image
                                  src={step.image}
                                  alt={step.imageAlt}
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 40vw"
                                  className="object-cover object-center"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="pointer-events-none absolute left-3 top-3 h-2.5 w-2.5 border-l border-t border-white/80" />
                                <div className="pointer-events-none absolute right-3 top-3 h-2.5 w-2.5 border-r border-t border-white/80" />
                                <div className="pointer-events-none absolute bottom-3 left-3 h-2.5 w-2.5 border-b border-l border-white/80" />
                                <div className="pointer-events-none absolute bottom-3 right-3 h-2.5 w-2.5 border-b border-r border-white/80" />
                              </div>

                              {/* Text */}
                              <div className="col-span-1 flex flex-col lg:col-span-7">
                                <p className="text-[13.5px] leading-relaxed text-[#454952]">
                                  {step.description}
                                </p>

                                {/* Deliverables */}
                                <div className="mt-5">
                                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
                                    Deliverables
                                  </p>
                                  <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                                    {step.deliverables.map((d) => (
                                      <li
                                        key={d}
                                        className="flex items-start gap-2 text-[12.5px] text-[#454952]"
                                      >
                                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                                        {d}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Specs */}
                                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#111315]/10 pt-4">
                                  {step.specs.map((s) => (
                                    <div key={s.label}>
                                      <p className="font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] text-[#5A5E66]">
                                        {s.label}
                                      </p>
                                      <p className="mt-0.5 text-[12.5px] font-medium text-[#111315]">
                                        {s.value}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#111315]/10 pt-6 md:flex-row md:items-center"
        >
          <p className="max-w-xl text-[13px] leading-relaxed text-[#5A5E66]">
            Timelines shown are typical for a mid-size commission. Complex
            façade systems — unitized, smart-glass, or hydraulic pivot — may
            extend the schedule; every brief is planned with the client.
          </p>
          <a
            href="#consultation"
            className="group inline-flex items-center gap-3 border-b border-[#111315]/20 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            Start a commission
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
