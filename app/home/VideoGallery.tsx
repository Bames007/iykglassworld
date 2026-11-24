"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play, X, Clock, Clapperboard } from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

const categories = [
  "All",
  "Installations",
  "Fabrication",
  "Showcase",
  "Process",
] as const;
type Category = (typeof categories)[number];

type Film = {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<Category, "All">;
  duration: string;
  durationSeconds: number;
  year: string;
  poster: string;
  videoUrl: string;
  tags: string[];
  featured?: boolean;
  behindTheScenes?: boolean;
};

/*
  NOTE ON VIDEO SOURCES
  ─────────────────────
  The `videoUrl` fields below point to sample Pexels stock clips so the
  gallery works end-to-end on first load. Replace each with your real
  project films (self-hosted MP4 or signed Vimeo/CDN URL) before launch.
  The `poster` images can also be swapped for real project stills.
*/

const films: Film[] = [
  {
    id: "maitama-film",
    title: "The Maitama Curtain Wall",
    subtitle: "A four-storey unitized façade, from CAD to silicon",
    category: "Installations",
    duration: "3:42",
    durationSeconds: 222,
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2000&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/2887463/2887463-hd_1920_1080_25fps.mp4",
    tags: ["Curtain Wall", "Unitized", "Residential"],
    featured: true,
  },
  {
    id: "fabrication-film",
    title: "Inside the Enugu Workshop",
    subtitle: "CNC beveling, polishing, and hand-finished edges",
    category: "Fabrication",
    duration: "2:18",
    durationSeconds: 138,
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/2098989/2098989-hd_1920_1080_30fps.mp4",
    tags: ["Workshop", "CNC", "Hand-Finish"],
  },
  {
    id: "guzape-film",
    title: "Guzape Hills Villa",
    subtitle: "Where structural glazing meets custom furniture",
    category: "Showcase",
    duration: "1:56",
    durationSeconds: 116,
    year: "2023",
    poster:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4",
    tags: ["Villa", "Furniture", "Interior"],
  },
  {
    id: "cbd-film",
    title: "The Smart Glass HQ",
    subtitle: "Switchable privacy glazing in live operation",
    category: "Installations",
    duration: "2:34",
    durationSeconds: 154,
    year: "2022",
    poster:
      "https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/3444431/3444431-hd_1920_1080_25fps.mp4",
    tags: ["Smart Glass", "PDLC", "Office"],
  },
  {
    id: "gra-film",
    title: "Fluted Partitions, GRA",
    subtitle: "Precision interior glazing for a penthouse refurbishment",
    category: "Fabrication",
    duration: "1:48",
    durationSeconds: 108,
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/2099568/2099568-hd_1920_1080_25fps.mp4",
    tags: ["Fluted Glass", "Interior", "Penthouse"],
  },
  {
    id: "anodizing-film",
    title: "The Abuja Anodizing Line",
    subtitle: "How mill-finish aluminium becomes a 20-year façade element",
    category: "Process",
    duration: "2:52",
    durationSeconds: 172,
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/3196036/3196036-hd_1920_1080_25fps.mp4",
    tags: ["Anodizing", "Aluminium", "Workshop"],
    behindTheScenes: true,
  },
  {
    id: "testing-film",
    title: "When Glass Meets Weather",
    subtitle: "Pressure, wind-load, and thermal cycling on the test rig",
    category: "Process",
    duration: "4:18",
    durationSeconds: 258,
    year: "2023",
    poster:
      "https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/2098988/2098988-hd_1920_1080_25fps.mp4",
    tags: ["QA", "Wind-Load", "Certification"],
    behindTheScenes: true,
  },
  {
    id: "cut-bevel-temper",
    title: "Cut, Bevel, Temper",
    subtitle: "A 90-second journey from raw sheet to finished pane",
    category: "Process",
    duration: "1:32",
    durationSeconds: 92,
    year: "2024",
    poster:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://videos.pexels.com/video-files/3196035/3196035-hd_1920_1080_25fps.mp4",
    tags: ["Tempering", "Beveling", "Process"],
    behindTheScenes: true,
  },
];

function formatTotalRuntime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function VideoGallery() {
  const [category, setCategory] = useState<Category>("All");
  const [playing, setPlaying] = useState<Film | null>(null);

  const visible = useMemo(
    () => films.filter((f) => category === "All" || f.category === category),
    [category],
  );

  const featured = visible.find((f) => f.featured) ?? visible[0];
  const rest = visible.filter((f) => f.id !== featured?.id);

  const totalRuntime = useMemo(
    () => films.reduce((sum, f) => sum + f.durationSeconds, 0),
    [],
  );

  // Category count map
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: films.length };
    for (const c of categories.slice(1)) {
      counts[c] = films.filter((f) => f.category === c).length;
    }
    return counts;
  }, []);

  useEffect(() => {
    if (!playing) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [playing]);

  return (
    <section
      id="video-gallery"
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
              Motion Archive · Selected Films
            </span>
          </div>
          <div className="hidden items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#5A5E66] sm:flex">
            <span className="inline-flex items-center gap-1.5">
              <Clapperboard className="h-3 w-3 text-[#2563EB]" />
              {films.length} Films
            </span>
            <span className="h-3 w-px bg-[#111315]/15" />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-[#2563EB]" />
              {formatTotalRuntime(totalRuntime)} Runtime
            </span>
          </div>
        </motion.div>

        {/* Headline + filter tabs */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="max-w-3xl font-display text-[clamp(2.1rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.028em] text-[#111315]"
          >
            The practice, in <span className="text-[#2563EB]">motion</span>.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="flex flex-wrap gap-1"
            role="tablist"
            aria-label="Filter films by category"
          >
            {categories.map((c) => {
              const isActive = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setCategory(c)}
                  className={`relative px-3.5 py-2 text-[10.5px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#111315]"
                      : "text-[#5A5E66] hover:text-[#111315]"
                  }`}
                >
                  {c}
                  <span className="ml-1.5 font-mono text-[9px] text-[#5A5E66]/70">
                    {categoryCounts[c]}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="video-tab-underline"
                      className="absolute inset-x-2 -bottom-px h-px bg-[#2563EB]"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Featured film + grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">
          {featured && (
            <motion.button
              key={featured.id}
              type="button"
              onClick={() => setPlaying(featured)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="group relative col-span-1 aspect-video overflow-hidden border border-[#111315]/10 bg-[#E6E4DD] text-left transition-colors duration-500 hover:border-[#2563EB]/40 lg:col-span-12"
              aria-label={`Play film: ${featured.title}`}
            >
              <Image
                src={featured.poster}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1400px"
                className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.02]"
                priority
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.28),transparent_55%)]" />
              </div>

              <div className="pointer-events-none absolute left-4 top-4 h-3 w-3 border-l border-t border-white/70" />
              <div className="pointer-events-none absolute right-4 top-4 h-3 w-3 border-r border-t border-white/70" />
              <div className="pointer-events-none absolute bottom-4 left-4 h-3 w-3 border-b border-l border-white/70" />
              <div className="pointer-events-none absolute bottom-4 right-4 h-3 w-3 border-b border-r border-white/70" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2563EB]" />
                  <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/90">
                    Featured Film · {featured.year}
                  </span>
                </div>
                <span className="border border-white/25 bg-black/25 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {featured.duration}
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#2563EB] group-hover:bg-[#2563EB]/40 md:h-24 md:w-24">
                  <Play
                    className="ml-0.5 h-7 w-7 text-white md:h-8 md:w-8"
                    fill="currentColor"
                  />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {featured.category}
                </p>
                <h3 className="mt-1.5 max-w-2xl font-display text-2xl font-medium leading-tight text-white md:text-3xl lg:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-[13px] text-white/75">
                  {featured.subtitle}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/25 bg-black/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/85 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          )}

          {rest.map((film, i) => (
            <motion.button
              key={film.id}
              type="button"
              onClick={() => setPlaying(film)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.06 }}
              className="group relative col-span-1 aspect-[4/3] overflow-hidden border border-[#111315]/10 bg-[#E6E4DD] text-left transition-colors duration-500 hover:border-[#2563EB]/40 lg:col-span-3"
              aria-label={`Play film: ${film.title}`}
            >
              <Image
                src={film.poster}
                alt={film.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.05]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.3),transparent_60%)]" />
              </div>

              {film.behindTheScenes && (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 border border-white/30 bg-black/40 px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  <Clapperboard className="h-2.5 w-2.5" /> BTS
                </span>
              )}

              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/85">
                  {film.category}
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/85">
                  {film.duration}
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-[#2563EB] group-hover:bg-[#2563EB]/50">
                  <Play
                    className="ml-0.5 h-4 w-4 text-white"
                    fill="currentColor"
                  />
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-display text-base font-medium leading-tight text-white md:text-lg">
                  {film.title}
                </h3>
                <p className="mt-1 line-clamp-1 text-[11px] text-white/70">
                  {film.subtitle}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Footer note + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#111315]/10 pt-6 md:flex-row md:items-center"
        >
          <p className="max-w-xl text-[13px] leading-relaxed text-[#5A5E66]">
            Films are shot on site across Abuja and Enugu. Every project is
            documented from first sketch to final installation — including the
            fabrication floor and QA rig.
          </p>
          <a
            href="#consultation"
            className="group inline-flex items-center gap-3 border-b border-[#111315]/20 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            Request the full film reel
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      <AnimatePresence>
        {playing && (
          <VideoModal film={playing} onClose={() => setPlaying(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function VideoModal({ film, onClose }: { film: Film; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.99 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative z-10 flex w-full max-w-6xl flex-col overflow-hidden bg-[#0E1116] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-[#2563EB] hover:bg-[#2563EB]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={film.videoUrl}
            poster={film.poster}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="border-t border-white/10 bg-[#0E1116] px-5 py-4 md:px-7 md:py-5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span className="h-1 w-1 bg-[#2563EB]" />
            <span>{film.category}</span>
            <span className="text-white/20">|</span>
            <span>{film.year}</span>
            <span className="text-white/20">|</span>
            <span>{film.duration}</span>
            {film.behindTheScenes && (
              <>
                <span className="text-white/20">|</span>
                <span className="inline-flex items-center gap-1 text-[#2563EB]">
                  <Clapperboard className="h-2.5 w-2.5" /> Behind the Scenes
                </span>
              </>
            )}
          </div>
          <h3
            id="video-modal-title"
            className="mt-2 font-display text-xl font-medium leading-tight text-white md:text-2xl"
          >
            {film.title}
          </h3>
          <p className="mt-1 text-[13px] text-white/60">{film.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {film.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
