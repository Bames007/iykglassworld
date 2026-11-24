"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Layers,
  MapPin,
  Maximize2,
  Ruler,
  X,
} from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

type Project = {
  id: string;
  number: string;
  title: string;
  location: string;
  category: string;
  year: string;
  image: string;
  description: string;
  scope: string;
  timeline: string;
  area: string;
  client: string;
  materials: string[];
  services: string[];
  span: string;
};

const projects: Project[] = [
  {
    id: "maitama",
    number: "01",
    title: "Maitama Curtain Wall",
    location: "Maitama, Abuja",
    category: "Curtain Wall System",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    description:
      "A four-storey private residence wrapped in a unitized curtain wall with concealed mullions. The façade balances thermal performance with an uninterrupted visual plane, using low-iron tempered glass with a sapphire solar-control coating.",
    scope:
      "Design, fabrication, and installation of unitized curtain wall with concealed mullion system.",
    timeline: "9 months · Mar — Nov 2024",
    area: "680 sqm façade",
    client: "Private client · Residential",
    materials: [
      "24mm low-iron tempered glass",
      "Sapphire low-E solar coating",
      "Anodized aluminium mullions",
      "Concealed stainless steel fixings",
    ],
    services: [
      "Structural engineering",
      "Thermal performance simulation",
      "Custom CNC fabrication",
      "Site installation & glazing",
    ],
    span: "lg:col-span-6 lg:row-span-2",
  },
  {
    id: "asokoro",
    number: "02",
    title: "Asokoro Commercial Tower",
    location: "Asokoro, Abuja",
    category: "Structural Glazing",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
    description:
      "A seven-storey office tower clad in a stick-built structural glazing system. The project prioritised sightline clarity and envelope performance, achieving a 34% cooling-load reduction over the base design.",
    scope:
      "Stick-built structural glazing across all elevations with integrated sunshade detailing.",
    timeline: "14 months · Aug 2022 — Oct 2023",
    area: "2,140 sqm façade",
    client: "Commercial developer · Office",
    materials: [
      "32mm laminated low-E glass",
      "Thermally broken aluminium frames",
      "Silicone structural joints",
    ],
    services: [
      "Envelope engineering",
      "Wind-load modelling",
      "Fabrication & installation",
    ],
    span: "lg:col-span-6",
  },
  {
    id: "independence",
    number: "03",
    title: "Independence Layout Residence",
    location: "Independence Layout, Enugu",
    category: "Frameless Glazing",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
    description:
      "A private residence defined by frameless glass walls that dissolve the boundary between the living space and a tropical courtyard. Hydraulic pivot doors anchor the entrance pavilion.",
    scope:
      "Frameless structural glazing, hydraulic pivot entry doors, and custom corner glass detailing.",
    timeline: "6 months · Apr — Oct 2024",
    area: "420 sqm glazed area",
    client: "Private client · Residential",
    materials: [
      "15mm tempered glass",
      "Hydraulic pivot floor springs",
      "Brushed obsidian hardware",
    ],
    services: [
      "Bespoke detailing",
      "Hydraulic pivot system integration",
      "Custom fabrication",
    ],
    span: "lg:col-span-3",
  },
  {
    id: "guzape",
    number: "04",
    title: "Guzape Hills Villa",
    location: "Guzape, Abuja",
    category: "Furniture & Glazing",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    description:
      "A private villa combining structural glazing with a commissioned suite of sculptural glass furniture. The dining table — a 3.2m single span of 40mm tempered glass — anchors the double-height living pavilion.",
    scope:
      "Structural glazing for the pavilion alongside bespoke glass furniture commissions.",
    timeline: "11 months · Jan — Nov 2023",
    area: "560 sqm glazing · 8 furniture pieces",
    client: "Private client · Residential",
    materials: [
      "40mm tempered glass tabletop",
      "19mm tempered glazing",
      "Satin champagne hardware",
    ],
    services: [
      "Furniture design & fabrication",
      "Structural glazing",
      "Interior integration",
    ],
    span: "lg:col-span-3",
  },
  {
    id: "gra",
    number: "05",
    title: "GRA Enugu Penthouse",
    location: "GRA, Enugu",
    category: "Interior Glazing",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
    description:
      "A penthouse refurbishment using fluted and reeded glass partitions to compartmentalise without interrupting the flow of light. Every partition was fabricated to millimetre tolerance for a seamless transition between rooms.",
    scope:
      "Interior glass partitions with fluted and reeded textures, including a frameless shower enclosure suite.",
    timeline: "4 months · Jun — Sep 2024",
    area: "180 sqm interior",
    client: "Private client · Residential",
    materials: [
      "12mm fluted glass",
      "10mm tempered reeded glass",
      "Frameless shower hardware",
    ],
    services: [
      "Interior glass design",
      "Precision fabrication",
      "Installation & finishing",
    ],
    span: "lg:col-span-4",
  },
  {
    id: "cbd",
    number: "06",
    title: "Central Business District HQ",
    location: "Central Business District, Abuja",
    category: "Curtain Wall System",
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2000&auto=format&fit=crop",
    description:
      "A corporate headquarters featuring a fully unitized curtain wall with integrated smart privacy glazing on the executive floors. The switchable film zones transition from clear to opaque at the touch of a control interface.",
    scope:
      "Unitized curtain wall with switchable smart privacy glazing on three executive levels.",
    timeline: "18 months · Feb 2021 — Jul 2022",
    area: "3,400 sqm façade",
    client: "Corporate · Headquarters",
    materials: [
      "28mm unitized double-glazed units",
      "Smart switchable PDLC film",
      "Thermally broken aluminium",
    ],
    services: [
      "Envelope engineering",
      "Smart glass integration",
      "Full fabrication & installation",
    ],
    span: "lg:col-span-4",
  },
  {
    id: "trans-ekulu",
    number: "07",
    title: "Trans-Ekulu Residence",
    location: "Trans-Ekulu, Enugu",
    category: "Custom Commission",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    description:
      "A full custom commission integrating glass throughout — from floating staircase balustrades and frameless shelving to a wall of structural glazing that opens onto a garden terrace.",
    scope:
      "Full custom glass commission covering stair balustrades, shelving, and terrace glazing.",
    timeline: "8 months · Feb — Sep 2023",
    area: "340 sqm glazing · 14 custom pieces",
    client: "Private client · Residential",
    materials: [
      "12mm tempered glass balustrades",
      "19mm structural glazing",
      "Custom standoff hardware",
    ],
    services: [
      "Design development",
      "Fabrication",
      "Installation & hand-finishing",
    ],
    span: "lg:col-span-4",
  },
];

export function OurWorks() {
  const [active, setActive] = useState<Project | null>(null);

  // Lock body scroll + Escape key when modal is open
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="our-works"
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
              Selected Works · 2022 — 2024
            </span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66] sm:block">
            {projects.length} Commissions
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
          A portfolio measured in{" "}
          <span className="text-[#2563EB]">transparency</span>.
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:auto-rows-[300px] lg:grid-cols-12">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => setActive(project)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                ease: EASE,
                delay: i * 0.06,
              }}
              className={`group relative overflow-hidden border border-[#111315]/10 bg-[#E6E4DD] text-left transition-colors duration-500 hover:border-[#2563EB]/40 ${project.span} ${
                i === 0
                  ? "aspect-[4/5] lg:aspect-auto"
                  : "aspect-[4/3] lg:aspect-auto"
              }`}
              aria-label={`View details for ${project.title}`}
            >
              {/* Image */}
              <Image
                src={project.image}
                alt={`${project.title}, ${project.location}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
              />

              {/* Dark gradient for legibility */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />

              {/* Hover refraction glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.35),transparent_60%)]" />
              </div>

              {/* Top row — number + category */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-medium tracking-[0.22em] text-[#2563EB]">
                    /{project.number}
                  </span>
                  <span className="h-3 w-px bg-white/30" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/85">
                    {project.category}
                  </span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all duration-500 group-hover:border-[#2563EB] group-hover:bg-[#2563EB]">
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>

              {/* Bottom — title + location */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium leading-tight text-white md:text-2xl lg:text-[1.65rem]">
                  {project.title}
                </h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative z-10 block max-h-[92vh] w-full max-w-6xl overflow-y-auto overscroll-contain bg-[#F8F8F6] shadow-2xl lg:grid lg:h-[86vh] lg:max-h-none lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)] lg:overflow-hidden"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-colors hover:border-[#2563EB] hover:bg-[#2563EB]"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image side */}
        <div className="relative aspect-[16/10] w-full shrink-0 bg-[#E6E4DD] lg:col-span-7 lg:aspect-auto lg:h-full">
          <Image
            src={project.image}
            alt={`${project.title}, ${project.location}`}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-center"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-tr lg:from-black/30 lg:to-transparent" />

          {/* Number badge bottom left */}
          <div className="absolute bottom-5 left-5 flex items-center gap-3 md:bottom-6 md:left-6">
            <span className="font-mono text-[10px] font-medium tracking-[0.22em] text-[#2563EB]">
              /{project.number}
            </span>
            <span className="h-3 w-px bg-white/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="flex flex-col p-6 md:p-8 lg:col-span-5 lg:h-full lg:overflow-y-auto lg:p-10">
          {/* Header */}
          <div>
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A5E66]">
              <MapPin className="h-3 w-3 text-[#2563EB]" />
              {project.location}
              <span className="mx-1 text-[#111315]/20">|</span>
              <Calendar className="h-3 w-3 text-[#2563EB]" />
              {project.year}
            </p>
            <h3
              id="project-modal-title"
              className="mt-3 font-display text-[clamp(1.65rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#111315]"
            >
              {project.title}
            </h3>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#454952] md:text-sm">
              {project.description}
            </p>
          </div>

          {/* Spec grid */}
          <div className="mt-7 grid grid-cols-2 gap-4 border-t border-[#111315]/10 pt-6">
            <SpecItem
              icon={<Ruler className="h-3.5 w-3.5" />}
              label="Area"
              value={project.area}
            />
            <SpecItem
              icon={<Calendar className="h-3.5 w-3.5" />}
              label="Timeline"
              value={project.timeline}
            />
            <SpecItem
              icon={<Maximize2 className="h-3.5 w-3.5" />}
              label="Client"
              value={project.client}
              className="col-span-2"
            />
          </div>

          {/* Scope */}
          <div className="mt-6 border-t border-[#111315]/10 pt-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
              Scope
            </p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#454952]">
              {project.scope}
            </p>
          </div>

          {/* Materials */}
          <div className="mt-6 border-t border-[#111315]/10 pt-6">
            <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
              <Layers className="h-3 w-3 text-[#2563EB]" />
              Materials
            </p>
            <ul className="mt-3 space-y-1.5">
              {project.materials.map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-2 text-[13px] text-[#454952]"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#2563EB]" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="mt-6 border-t border-[#111315]/10 pt-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
              Services Delivered
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.services.map((s) => (
                <span
                  key={s}
                  className="border border-[#111315]/15 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-[#111315]/75"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href="#consultation"
            onClick={onClose}
            className="group mt-8 inline-flex items-center justify-between gap-4 bg-[#2563EB] px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#1D4ED8]"
          >
            <span>Commission a similar project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SpecItem({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#5A5E66]">
        <span className="text-[#2563EB]">{icon}</span>
        {label}
      </p>
      <p className="mt-1.5 text-[13px] font-medium leading-tight text-[#111315]">
        {value}
      </p>
    </div>
  );
}
