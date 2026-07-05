"use client";

import { useState } from "react";

// Configure this to enable real submissions. Set NEXT_PUBLIC_FORM_ENDPOINT in
// your environment (e.g. a Formspree endpoint like https://formspree.io/f/xxxx).
// When empty, the form falls back to a mailto link so nothing is ever lost.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
const FALLBACK_EMAIL = "hello@lynxdock.app";

type Status = "idle" | "submitting" | "success" | "error";

export default function EarlyAccessForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // No backend configured — fall back to a prefilled email.
    if (!ENDPOINT) {
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
        "LynxDock early access"
      )}&body=${encodeURIComponent(
        `Please add me to the LynxDock early-access list: ${value}`
      )}`;
      setStatus("success");
      setMessage("Opening your email client to complete the request.");
      return;
    }

    try {
      setStatus("submitting");
      setMessage("");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: value, source: "lynxdock.app early access" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setMessage("You're on the list. We'll be in touch as early access opens.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mx-auto max-w-md text-sm text-signal-bright"
      >
        {message}
      </p>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 sm:flex-row"
        noValidate
      >
        <label htmlFor="early-access-email" className="sr-only">
          Email address
        </label>
        <input
          id="early-access-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "early-access-error" : undefined}
          className="w-full rounded-lg border border-line bg-graphite-900/70 px-4 py-2.5 text-sm text-white placeholder:text-[#6f838b] focus:border-signal-cyan/60 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-bright"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-signal-cyan/40 bg-signal-cyan/15 px-5 py-2.5 text-sm font-medium text-signal-bright shadow-[0_0_24px_-6px_rgba(53,224,224,0.5)] transition-all hover:bg-signal-cyan/25 hover:border-signal-cyan/70 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Request access"}
        </button>
      </form>
      {status === "error" && (
        <p
          id="early-access-error"
          role="alert"
          className="mt-3 text-sm text-[#f6a5a5]"
        >
          {message}
        </p>
      )}
    </div>
  );
}
