"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  X,
  ArrowUpRight,
  Check,
  Loader2,
  AlertCircle,
  Ruler,
  Building2,
  Home,
  Store,
} from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

const projectTypes = [
  { id: "curtain-wall", label: "Curtain Wall", icon: Building2 },
  { id: "frameless", label: "Frameless Glazing", icon: Ruler },
  { id: "residential", label: "Residential Villa", icon: Home },
  { id: "commercial", label: "Commercial Fit-out", icon: Store },
] as const;

const budgets = [
  "Under ₦5M",
  "₦5M — ₦15M",
  "₦15M — ₦40M",
  "₦40M — ₦100M",
  "Above ₦100M",
  "Not sure yet",
];

const timelines = [
  "ASAP — under 1 month",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Exploratory — no fixed date",
];

type Payload = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  location: string;
  message: string;
};

export function ConsultationModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  /** Optional: wire to your API / Firebase. If omitted, shows the success state. */
  onSubmit?: (payload: Payload) => Promise<void>;
}) {
  const [step, setStep] = useState<"form" | "sending" | "done" | "error">(
    "form",
  );
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Payload>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "curtain-wall",
    budget: budgets[1],
    timeline: timelines[1],
    location: "",
    message: "",
  });

  // Body lock + Escape
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && step !== "sending") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [step, onClose]);

  const update = <K extends keyof Payload>(key: K, value: Payload[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const valid =
    form.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim().length >= 6 &&
    form.location.trim().length > 1 &&
    form.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStep("sending");
    setError(null);
    try {
      if (onSubmit) {
        await onSubmit(form);
      } else {
        // Default: simulate network latency — replace with your API call.
        await new Promise((r) => setTimeout(r, 900));
      }
      setStep("done");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send your request. Please try again.",
      );
      setStep("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => step !== "sending" && onClose()}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-10 block max-h-[92vh] w-full max-w-5xl overflow-y-auto overscroll-contain bg-[#F8F8F6] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] md:grid md:h-[88vh] md:max-h-none md:grid-cols-12 md:grid-rows-[minmax(0,1fr)] md:overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={step === "sending"}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center border border-[#111315]/20 bg-[#F8F8F6]/80 text-[#111315] backdrop-blur-sm transition-colors hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white disabled:opacity-40"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Brand rail */}
        <aside className="hidden flex-col justify-between bg-[#111315] p-8 text-white md:col-span-4 md:flex md:p-10">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 bg-[#2563EB]" />
              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
                Commission Enquiry
              </span>
            </div>
            <h3 className="mt-6 font-display text-[clamp(1.5rem,2.2vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.02em]">
              Start with a <span className="text-[#2563EB]">conversation.</span>
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-white/60">
              Tell us about the site, the intent, and the timeline. IYK
              Glassworld responds within two business days with a site-visit
              proposal.
            </p>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-6">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/40">
                Direct
              </p>
              <p className="mt-1 text-[13px] font-medium">
                hello@iykglassworld.com
              </p>
            </div>
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/40">
                Studios
              </p>
              <p className="mt-1 text-[13px] font-medium">Abuja · Enugu</p>
            </div>
          </div>
        </aside>

        {/* Form side */}
        <div className="flex-1 overflow-y-auto p-6 md:col-span-8 md:p-10">
          {step === "done" ? (
            <div className="flex h-full flex-col items-start justify-center py-10">
              <div className="flex h-14 w-14 items-center justify-center border border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]">
                <Check className="h-6 w-6" />
              </div>
              <h3
                id="consultation-modal-title"
                className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#111315]"
              >
                Enquiry received.
              </h3>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-[#454952]">
                Thanks, {form.name.split(" ")[0]}. We've received your brief and
                will respond to <b>{form.email}</b> within two business days to
                arrange a site visit.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="group mt-8 inline-flex items-center gap-3 border-b border-[#111315]/20 pb-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#111315] transition-colors hover:border-[#2563EB] hover:text-[#2563EB]"
              >
                Close
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6 flex items-center gap-2.5">
                <span className="inline-block h-1.5 w-1.5 bg-[#2563EB]" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
                  Step 01 · Project Brief
                </span>
              </div>

              <h3
                id="consultation-modal-title"
                className="font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[#111315]"
              >
                Tell us about the project.
              </h3>

              <fieldset className="mt-6">
                <legend className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#5A5E66]">
                  Project type
                </legend>
                <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {projectTypes.map((pt) => {
                    const Icon = pt.icon;
                    const active = form.projectType === pt.id;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => update("projectType", pt.id)}
                        aria-pressed={active}
                        className={`flex flex-col items-start gap-2 border px-3 py-3 text-left transition-colors duration-200 ${
                          active
                            ? "border-[#2563EB] bg-[#2563EB] text-white"
                            : "border-[#111315]/15 bg-white text-[#111315] hover:border-[#111315]/40"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-[11px] font-medium leading-tight">
                          {pt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Adaeze Okafor"
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  />
                </Field>
                <Field label="Company / Firm" optional>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Optional"
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  />
                </Field>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Email" required>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  />
                </Field>
                <Field label="Phone" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Site location" required>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    placeholder="Maitama, Abuja"
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  />
                </Field>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Budget range">
                  <select
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Timeline">
                  <select
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    className="w-full border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  >
                    {timelines.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Project brief" required>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Describe the site, the glass system you're considering, and any constraints."
                    className="w-full resize-none border border-[#111315]/15 bg-white px-3.5 py-2.5 text-[13.5px] text-[#111315] outline-none transition-colors focus:border-[#2563EB]"
                  />
                </Field>
              </div>

              {step === "error" && error && (
                <div className="mt-4 flex items-start gap-2 border border-[#DC2626]/30 bg-[#DC2626]/10 px-3 py-2.5 text-[#7F1D1D]">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="text-[12.5px] leading-snug">{error}</p>
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse items-stretch justify-between gap-3 border-t border-[#111315]/10 pt-5 sm:flex-row sm:items-center">
                <p className="max-w-xs text-[11px] leading-relaxed text-[#5A5E66]">
                  By submitting, you agree to be contacted about your enquiry.
                  We don't share your details.
                </p>
                <button
                  type="submit"
                  disabled={!valid || step === "sending"}
                  className="group inline-flex items-center justify-center gap-3 bg-[#2563EB] px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:bg-[#111315]/20"
                >
                  {step === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#5A5E66]">
        {label}
        {required && <span className="text-[#2563EB]">*</span>}
        {optional && (
          <span className="font-sans text-[9.5px] normal-case tracking-normal text-[#5A5E66]/70">
            (optional)
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
