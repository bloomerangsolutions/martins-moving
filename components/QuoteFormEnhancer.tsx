"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/nav";

/**
 * Attaches submit behaviour to the server-rendered .quote-form markup that the
 * body builders emit inside the sticky rail. Mounted once from the root layout.
 */
export default function QuoteFormEnhancer() {
  useEffect(() => {
    const forms = Array.from(document.querySelectorAll<HTMLFormElement>("form.quote-form"));

    const onSubmit = async (event: SubmitEvent) => {
      event.preventDefault();
      const form = event.currentTarget as HTMLFormElement;
      const status = form.querySelector<HTMLElement>(".form-status");
      const set = (text: string, color = "") => {
        if (status) {
          status.textContent = text;
          status.style.color = color;
        }
      };

      const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
      if (data.botcheck) return;
      if (!String(data.name || "").trim() || !String(data.phone || "").trim()) {
        set("Please add your name and phone.", "#ba1a1a");
        return;
      }
      data.page = form.dataset.page || "";

      const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
      if (button) button.disabled = true;
      set("Sending...");

      try {
        const res = await fetch("/api/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && json?.ok) {
          form.reset();
          set("Thanks. We will call you back shortly.", "#00682f");
        } else {
          set(`Something went wrong. Please call ${siteConfig.phone}.`, "#ba1a1a");
        }
      } catch {
        set(`Network error. Please call ${siteConfig.phone}.`, "#ba1a1a");
      } finally {
        if (button) button.disabled = false;
      }
    };

    forms.forEach((f) => f.addEventListener("submit", onSubmit));
    return () => forms.forEach((f) => f.removeEventListener("submit", onSubmit));
  }, []);

  return null;
}
