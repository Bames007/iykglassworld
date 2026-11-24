"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  BadgeCheck,
} from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
  location: string;
  year: string;
  rating: number;
  photo?: string;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: "t-guzape",
    quote:
      "We commissioned IYK Glassworld for the villa's glazing, then ended up asking them to do the dining table too. The precision on that 3.2-metre span is something no other fabricator in Abuja would even quote. What sold us was the fabrication floor — they showed us the tempering line before we signed.",
    name: "Tunde O.",
    role: "Private client",
    project: "Guzape Hills Villa",
    location: "Abuja",
    year: "2023",
    rating: 5,
    photo:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "t-asokoro",
    quote:
      "Our base design was over-budget on cooling load. IYK Glassworld's team ran wind-load and thermal simulations in week two and came back with a different glass spec that cut our HVAC sizing by a third. They engineer, they don't just fabricate.",
    name: "Adeola N.",
    role: "Development Director",
    project: "Asokoro Commercial Tower",
    location: "Abuja",
    year: "2023",
    rating: 5,
  },
  {
    id: "t-gra",
    quote:
      "The fluted glass partitions were fabricated to millimetre tolerance. When the tiles came off the wall, the panes still met flush. That's not marketing — that's what good fabrication looks like five years later.",
    name: "Chinelo E.",
    role: "Private client",
    project: "GRA Enugu Penthouse",
    location: "Enugu",
    year: "2024",
    rating: 5,
  },
  {
    id: "t-cbd",
    quote:
      "The switchable smart glass was a first for our building. IYK Glassworld handled the electrical integration themselves — no finger-pointing between glazier and electrician. Two years in, zero pane failures.",
    name: "Emeka A.",
    role: "Facilities Lead",
    project: "Central Business District HQ",
    location: "Abuja",
    year: "2022",
    rating: 5,
  },
  {
    id: "t-trans-ekulu",
    quote:
      "We gave them a rough sketch for the staircase balustrade and got back full shop drawings two weeks later. The install team cleaned up better than our general contractor. Rare thing in this market.",
    name: "Ifeoma D.",
    role: "Homeowner",
    project: "Trans-Ekulu Residence",
    location: "Enugu",
    year: "2023",
    rating: 5,
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function ClientVoices() {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const rest = testimonials.filter((t) => t.id !== featured.id);

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const activeFeatured = testimonials[current];

  return (
    <section
      id="client-voices"
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
              Client Voices · Verified Commissions
            </span>
          </div>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66] sm:block">
            {testimonials.length} Testimonials
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
            Words from <span className="text-[#2563EB]">the field.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="col-span-1 max-w-md self-end border-l-2 border-[#2563EB] pl-5 text-[14px] leading-relaxed text-[#454952] lg:col-span-5"
          >
            Every testimonial below is tied to a commissioned project in our
            portfolio — with the client's permission. No anonymous praise, no
            stock reviews.
          </motion.p>
        </div>

        {/* Featured rotating testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mb-4 overflow-hidden border border-[#111315]/10 bg-[#E6E4DD]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image side */}
            <div className="relative col-span-1 aspect-[4/3] bg-[#D6D3CA] lg:col-span-5 lg:aspect-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeatured.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={
                      activeFeatured.photo ??
                      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"
                    }
                    alt={`${activeFeatured.project}, ${activeFeatured.location}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent lg:bg-gradient-to-tr" />
                </motion.div>
              </AnimatePresence>

              {/* Crosshairs */}
              <div className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-white/70" />
              <div className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-white/70" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-white/70" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-white/70" />

              {/* Project tag */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                <span className="border border-white/30 bg-black/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {activeFeatured.location}
                </span>
                <span className="border border-white/30 bg-black/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {activeFeatured.year}
                </span>
              </div>
            </div>

            {/* Quote side */}
            <div className="col-span-1 flex flex-col justify-between p-6 md:p-10 lg:col-span-7">
              <div>
                <Quote className="h-8 w-8 text-[#2563EB]" fill="currentColor" />
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={activeFeatured.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="mt-4 font-display text-[clamp(1.15rem,2.1vw,1.65rem)] font-medium leading-[1.35] tracking-[-0.01em] text-[#111315]"
                  >
                    "{activeFeatured.quote}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-[#111315]/10 pt-5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display text-base font-medium text-[#111315]">
                      {activeFeatured.name}
                    </p>
                    <BadgeCheck
                      className="h-4 w-4 text-[#2563EB]"
                      aria-label="Verified commission"
                    />
                  </div>
                  <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.18em] text-[#5A5E66]">
                    {activeFeatured.role} · {activeFeatured.project}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < activeFeatured.rating
                            ? "text-[#2563EB]"
                            : "text-[#111315]/15"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Previous testimonial"
                      className="flex h-8 w-8 items-center justify-center border border-[#111315]/20 text-[#111315] transition-colors hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Next testimonial"
                      className="flex h-8 w-8 items-center justify-center border border-[#111315]/20 text-[#111315] transition-colors hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid of remaining testimonials */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {rest.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.06 }}
              className="group flex h-full flex-col justify-between border border-[#111315]/10 bg-white p-5 transition-colors duration-500 hover:border-[#2563EB]/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote
                    className="h-5 w-5 text-[#2563EB]/70"
                    fill="currentColor"
                  />
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-2.5 w-2.5 ${
                          idx < t.rating
                            ? "text-[#2563EB]"
                            : "text-[#111315]/15"
                        }`}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-3 text-[13px] leading-relaxed text-[#454952]">
                  "{t.quote}"
                </blockquote>
              </div>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-[#111315]/10 pt-4">
                <div className="flex h-9 w-9 items-center justify-center border border-[#111315]/15 bg-[#F8F8F6] font-mono text-[10px] font-medium text-[#111315]">
                  {initials(t.name)}
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-1 truncate text-[12.5px] font-medium text-[#111315]">
                    {t.name}
                    <BadgeCheck className="h-3 w-3 shrink-0 text-[#2563EB]" />
                  </p>
                  <p className="truncate font-mono text-[9.5px] uppercase tracking-[0.15em] text-[#5A5E66]">
                    {t.project} · {t.year}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
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
            Want to speak directly with a past client before commissioning?
            We'll arrange it — reference the project code above when you reach
            out.
          </p>
          <a
            href="#consultation"
            className="group inline-flex items-center gap-3 border-b border-[#111315]/20 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            Request a client reference
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
