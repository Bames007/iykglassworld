"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";
import { ConsultationModal } from "../ConsultationModal";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };

const ConsultationCtx = createContext<Ctx | null>(null);

/**
 * Safe by default. If the provider is missing (e.g. a component is
 * rendered outside the app tree, or the provider was accidentally
 * removed), we log a warning in dev and return a no-op — the page
 * still renders, the button just does nothing.
 */
export function useConsultation(): Ctx {
  const ctx = useContext(ConsultationCtx);

  if (!ctx) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[useConsultation] No <ConsultationProvider> found in the tree. " +
          "The consultation modal will not open. " +
          "Wrap your tree (usually app/layout.tsx) with <ConsultationProvider>.",
      );
    }
    return { open: () => {}, close: () => {}, isOpen: false };
  }

  return ctx;
}

export function ConsultationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    if (
      typeof window !== "undefined" &&
      window.location.hash === "#consultation"
    ) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, []);

  // Delegated click — catches every `href="#consultation"` on the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        'a[href="#consultation"], [data-open-consultation]',
      );
      if (target) {
        e.preventDefault();
        open();
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  // Direct-link support (/page#consultation)
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#consultation") open();
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open]);

  return (
    <ConsultationCtx.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && <ConsultationModal onClose={close} />}
      </AnimatePresence>
    </ConsultationCtx.Provider>
  );
}
