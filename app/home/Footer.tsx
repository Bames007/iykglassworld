"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* ─── Social SVGs ─── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "https://instagram.com/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com/", Icon: LinkedInIcon },
  { label: "X", href: "https://x.com/", Icon: XIcon },
  {
    label: "WhatsApp",
    href: "https://wa.me/2348030000001",
    Icon: WhatsAppIcon,
  },
  { label: "TikTok", href: "https://tiktok.com/", Icon: TikTokIcon },
];

const navColumns = [
  {
    title: "Studio",
    links: [
      { label: "Selected Works", href: "#our-works" },
      { label: "Motion Archive", href: "#video-gallery" },
      { label: "The Method", href: "#the-method" },
      { label: "Client Voices", href: "#client-voices" },
    ],
  },
  {
    title: "Divisions",
    links: [
      { label: "Curtain Wall Systems", href: "#divisions" },
      { label: "Structural Glazing", href: "#divisions" },
      { label: "Interior Glass", href: "#divisions" },
      { label: "Glass Furniture", href: "#divisions" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Abuja Studio", href: "#consultation" },
      { label: "Enugu Studio", href: "#consultation" },
      { label: "Start a Brief", href: "#consultation" },
      {
        label: "hello@iykglassworld.com",
        href: "mailto:hello@iykglassworld.com",
      },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#111315] text-white">
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-20 lg:py-24">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
                aria-label="IYK Glassworld — home"
              >
                <span className="flex h-9 w-9 items-center justify-center border border-white/20">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4 text-[#2563EB]"
                    aria-hidden
                  >
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <path d="M7 3v18M17 3v18M3 7h18M3 17h18" />
                  </svg>
                </span>
                <span className="font-display text-lg font-medium tracking-[-0.01em]">
                  IYK Glassworld
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/50">
                Bespoke architectural glass — curtain walls, structural glazing,
                and sculptural furniture. Engineered and fabricated in Abuja and
                Enugu.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {navColumns.map((col) => (
              <nav
                key={col.title}
                className="col-span-1 md:col-span-2"
                aria-label={col.title}
              >
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[12.5px] text-white/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Commission column */}
            <div className="col-span-2 md:col-span-2">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/40">
                Commission
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/60">
                Tell us about the site. We'll respond in two business days.
              </p>
              <a
                href="#consultation"
                className="group mt-4 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Start a brief
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* Legal / credit row */}
          <div className="flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span>© {year} IYK Glassworld</span>
              <span className="hidden h-2.5 w-px bg-white/15 md:inline-block" />
              <a href="#" className="transition-colors hover:text-white/70">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white/70">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-white/70">
                Cookies
              </a>
            </div>

            <a
              href="https://ebcomtechnologies.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-white"
            >
              <span>Built by</span>
              <span className="inline-flex items-center gap-1 text-white/80 group-hover:text-[#2563EB]">
                Ebcom Technologies
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Giant brand watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden border-t border-white/5"
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-center px-6 md:px-12">
          <span
            className="block w-full whitespace-nowrap text-center font-display font-medium leading-none tracking-[-0.045em] text-white/[0.035]"
            style={{ fontSize: "clamp(4rem, 18vw, 18rem)" }}
          >
            IYK
          </span>
        </div>
      </div>
    </footer>
  );
}
