"use client";

import { useEffect, useId, useRef, useState } from "react";
import { supportEmail } from "@/data/siteShell";

// The site's existing form service: the production build sets NEXT_PUBLIC_FORM_ENDPOINT (a Formspree form that
// accepts a JSON POST), as the early-access form always has. When the build has no endpoint, the form says so
// and never reports that anything was sent.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

export type EnquiryKind = "demo" | "beta" | "business";

type FieldName = "name" | "email" | "organisation" | "interest" | "message";

const COPY: Record<
  EnquiryKind,
  {
    subject: string;
    submit: string;
    organisationLabel: string;
    messageLabel: string;
    messageHint: string;
    messageRequired: boolean;
    interest?: { label: string; options: string[] };
  }
> = {
  demo: {
    subject: "LynxDock demo request",
    submit: "Request a demo",
    organisationLabel: "Community or company (optional)",
    messageLabel: "What would you like to see?",
    messageHint: "A sentence or two is enough.",
    messageRequired: true,
  },
  beta: {
    subject: "LynxDock beta access request",
    submit: "Request beta access",
    organisationLabel: "Community (optional)",
    messageLabel: "Anything we should know? (optional)",
    messageHint: "For example the games you play together and roughly how many people would join.",
    messageRequired: false,
    interest: {
      label: "How would you use LynxDock?",
      options: ["As a member", "Running our community's server", "Not sure yet"],
    },
  },
  business: {
    subject: "LynxDock business enquiry",
    submit: "Send enquiry",
    organisationLabel: "Organisation (optional)",
    messageLabel: "Your enquiry",
    messageHint: "What you have in mind, and how to reach you if not by email.",
    messageRequired: true,
    interest: {
      label: "Enquiry type",
      options: ["Community pilot", "Partnership", "Investment", "Acquisition", "Something else"],
    },
  },
};

type Status = "idle" | "submitting" | "delivered" | "failed" | "not-connected";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnquiryForm({
  kind,
  autoFocus = false,
  onDone,
}: {
  kind: EnquiryKind;
  autoFocus?: boolean;
  onDone?: () => void;
}) {
  const copy = COPY[kind];
  const uid = useId().replace(/:/g, "");
  const id = (f: string) => `${kind}-${uid}-${f}`;
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (autoFocus) firstRef.current?.focus();
  }, [autoFocus]);
  useEffect(() => {
    if (status === "delivered" || status === "failed" || status === "not-connected") statusRef.current?.focus();
  }, [status]);

  function validate(data: FormData) {
    const next: Partial<Record<FieldName, string>> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email)) next.email = "Enter an email address like name@example.com.";
    if (copy.messageRequired && !message) next.message = "Add a short message.";
    if (copy.interest && !data.get("interest")) next.interest = `Choose an option for "${copy.interest.label}".`;
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as FieldName[])[0];
    if (firstInvalid) {
      const el = form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return;
    }
    if (String(data.get("_gotcha") ?? "") !== "") return;

    if (!ENDPOINT) {
      setStatus("not-connected");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kind,
          _subject: copy.subject,
          name: String(data.get("name")).trim(),
          email: String(data.get("email")).trim(),
          organisation: String(data.get("organisation") ?? "").trim(),
          interest: String(data.get("interest") ?? ""),
          message: String(data.get("message") ?? "").trim(),
          source: `lynxdock.app ${window.location.pathname}`,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("delivered");
      form.reset();
    } catch {
      setStatus("failed");
    }
  }

  const err = (f: FieldName) =>
    errors[f] ? (
      <p id={id(`${f}-error`)} className="field-error">
        {errors[f]}
      </p>
    ) : null;
  const describedBy = (f: FieldName, hint = false) =>
    [hint ? id(`${f}-hint`) : "", errors[f] ? id(`${f}-error`) : ""].filter(Boolean).join(" ") || undefined;

  if (status === "delivered") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card-2">
        <p className="strong">Thank you. Your message was delivered.</p>
        <p className="small mt-2">The LynxDock team will reply by email.</p>
        {onDone && (
          <button type="button" className="btn btn-secondary btn-sm mt-4" onClick={onDone}>
            Close
          </button>
        )}
      </div>
    );
  }

  // Without JavaScript the form can only post to the endpoint itself. With no endpoint it stays disabled, so a
  // no-JS submit can never put anyone's details into a URL.
  const blockedWithoutScript = !ENDPOINT && !hydrated;

  return (
    <form
      ref={formRef}
      method="post"
      action={ENDPOINT || undefined}
      noValidate
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      aria-describedby={!ENDPOINT ? id("not-connected") : undefined}
    >
      {!ENDPOINT && (
        <p id={id("not-connected")} className="card-notice small">
          <span className="strong text-[#ecd6a8]">This build is not connected to the form service.</span> You can
          try the form, but nothing you enter is sent. To reach us now, email{" "}
          <a className="text-link" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          .
        </p>
      )}
      <input type="hidden" name="_subject" value={copy.subject} />
      <input type="hidden" name="kind" value={kind} />
      <div className="field">
        <label htmlFor={id("name")}>Name</label>
        <input
          ref={firstRef}
          id={id("name")}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          className="input"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={describedBy("name")}
        />
        {err("name")}
      </div>
      <div className="field">
        <label htmlFor={id("email")}>Email</label>
        <input
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={200}
          className="input"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={describedBy("email")}
        />
        {err("email")}
      </div>
      <div className="field">
        <label htmlFor={id("organisation")}>{copy.organisationLabel}</label>
        <input
          id={id("organisation")}
          name="organisation"
          type="text"
          autoComplete="organization"
          maxLength={160}
          className="input"
        />
      </div>
      {copy.interest && (
        <fieldset className="field" aria-describedby={describedBy("interest")}>
          <legend className="mb-1 text-sm font-semibold text-ink">{copy.interest.label}</legend>
          <div className="flex flex-col gap-1">
            {copy.interest.options.map((o) => (
              <label key={o} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[0.9375rem] font-normal text-[#d7e1e5]">
                <input
                  type="radio"
                  name="interest"
                  value={o}
                  aria-invalid={errors.interest ? true : undefined}
                  className="h-[18px] w-[18px] accent-[#5ce1df]"
                />
                {o}
              </label>
            ))}
          </div>
          {err("interest")}
        </fieldset>
      )}
      <div className="field">
        <label htmlFor={id("message")}>{copy.messageLabel}</label>
        <textarea
          id={id("message")}
          name="message"
          rows={4}
          maxLength={1500}
          required={copy.messageRequired}
          className="input"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true)}
        />
        <p id={id("message-hint")} className="hint">
          {copy.messageHint}
        </p>
        {err("message")}
      </div>
      {/* Spam trap for the form service; hidden from people and assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={id("gotcha")}>Leave this empty</label>
        <input id={id("gotcha")} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="hint small">
        Sending this form shares the details above with the LynxDock team through the site&rsquo;s form service.
        See the{" "}
        <a className="text-link" href="/privacy/">
          privacy page
        </a>
        .
      </p>
      <div>
        <button
          type="submit"
          className="btn btn-primary w-full sm:w-auto"
          disabled={status === "submitting" || blockedWithoutScript}
        >
          {status === "submitting" ? "Sending…" : copy.submit}
        </button>
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "not-connected" && (
          <div className="card-notice small" role="status">
            <p className="strong text-[#ecd6a8]">Not sent.</p>
            <p className="mt-1">
              This build isn&rsquo;t connected to the form service, so nothing was delivered. Email{" "}
              <a className="text-link" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>{" "}
              instead.
            </p>
          </div>
        )}
        {status === "failed" && (
          <div className="card-notice small" role="alert">
            <p className="strong text-[#ecd6a8]">Your message was not delivered.</p>
            <p className="mt-1">
              Nothing was sent. Please try again in a moment, or email{" "}
              <a className="text-link" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
