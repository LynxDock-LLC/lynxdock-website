"use client";

import { useEffect, useId, useRef, useState } from "react";
import { supportEmail } from "@/data/siteShell";
import { eligibility, participationDocument } from "@/data/siteStatus";

// The site's existing form service (a Formspree form that accepts a JSON POST). next.config.mjs passes the endpoint
// to this bundle for PRODUCTION builds only (src/lib/buildEnv.mjs); a preview build gets none, whatever its
// environment variables say, so a preview cannot send anything. Without an endpoint, or in any preview, the form
// says it is not connected, has no action, never calls fetch and keeps its send button switched off.
const ENDPOINT = process.env.LYNXDOCK_FORM_ENDPOINT ?? "";
const PREVIEW_BUILD = process.env.LYNXDOCK_BUILD_ENV !== "production";
const CONNECTED = !PREVIEW_BUILD && ENDPOINT !== "";

export type EnquiryKind = "demo" | "beta" | "business" | "acknowledgement";

type FieldName = "name" | "email" | "organisation" | "interest" | "message" | "ageConfirmed" | "requirementsAcknowledged";

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
    /** An unticked 18+ self-declaration that must be ticked to send. It is not age verification. */
    ageDeclaration?: boolean;
    /** An unticked acknowledgement of the beta participation requirements (tester hub, older-app members). */
    requirementsAcknowledgement?: boolean;
    organisationRequired?: boolean;
    /** Defaults to true. */
    showMessage?: boolean;
    deliveredText?: string;
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
    ageDeclaration: true,
    interest: {
      label: "How would you use LynxDock?",
      options: ["As a member", "Running our community's server", "Not sure yet"],
    },
  },
  // Beta participation acknowledgement (tester hub): for members who will join with the older 0.2.6 app, which has no
  // first-start licence screen (licence draft r5 section 17). A record of the person's own declaration and
  // acknowledgement: not proof of age or identity, and not acceptance of the licence.
  acknowledgement: {
    subject: "LynxDock beta participation acknowledgement",
    submit: "Send my acknowledgement",
    organisationLabel: "Community you are joining",
    organisationRequired: true,
    messageLabel: "",
    messageHint: "",
    messageRequired: false,
    showMessage: false,
    ageDeclaration: true,
    requirementsAcknowledgement: true,
    deliveredText: "Let your community’s administrator know you have sent it.",
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
    if (copy.organisationRequired && !String(data.get("organisation") ?? "").trim())
      next.organisation = "Enter the community you are joining.";
    if (copy.ageDeclaration && data.get("ageConfirmed") !== "yes")
      next.ageConfirmed = "Everyone in the beta must be 18 or older. Tick the box to declare it, or don’t send this.";
    if (copy.requirementsAcknowledgement && data.get("requirementsAcknowledged") !== "yes")
      next.requirementsAcknowledged = "Tick the box to acknowledge the beta participation requirements, or don’t send this.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // The send button is switched off when not connected; this also stops any other way of submitting.
    if (!CONNECTED) {
      setStatus("not-connected");
      return;
    }
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
          ...(copy.ageDeclaration
            ? { ageConfirmed: "affirmative self-declaration: 18 or older (not independently verified)" }
            : {}),
          ...(copy.requirementsAcknowledgement
            ? {
                requirementsAcknowledged: participationDocument.title
                  ? `acknowledged the beta participation requirements (${participationDocument.title})`
                  : "acknowledged the beta participation requirements",
              }
            : {}),
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
        {/* A 2xx from the form service shows only that it accepted the submission, not that anyone has received it,
            so this says no more than that (owner instruction 2026-10-27). */}
        <p className="strong">Thank you. The form service accepted your message.</p>
        {copy.deliveredText && <p className="small mt-2">{copy.deliveredText}</p>}
        {onDone && (
          <button type="button" className="btn btn-secondary btn-sm mt-4" onClick={onDone}>
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      method="post"
      // Without JavaScript a connected form posts to the endpoint itself. A form that is not connected has no action
      // and a switched-off button, so a no-JS submit cannot send anything or put anyone's details into a URL.
      action={CONNECTED ? ENDPOINT : undefined}
      // Without JavaScript the browser's own required checks apply (including the 18+ box); once the script runs,
      // the form validates itself with accessible messages instead.
      noValidate={hydrated}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      aria-describedby={!CONNECTED ? id("not-connected") : undefined}
      data-form-connected={CONNECTED ? "yes" : "no"}
    >
      {!CONNECTED && (
        <p id={id("not-connected")} className="card-notice small">
          <span className="strong text-[#ecd6a8]">
            {PREVIEW_BUILD
              ? "This is a preview build, so its forms are switched off."
              : "This build is not connected to the form service."}
          </span>{" "}
          Nothing can be sent from this form. To reach us now, email{" "}
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
          required={copy.organisationRequired}
          className="input"
          aria-invalid={errors.organisation ? true : undefined}
          aria-describedby={describedBy("organisation")}
        />
        {err("organisation")}
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
                  required
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
      {copy.showMessage !== false && (
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
      )}
      {copy.ageDeclaration && (
        <div className="field">
          <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[0.9375rem] font-semibold text-ink">
            <input
              type="checkbox"
              name="ageConfirmed"
              value="yes"
              required
              className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#5ce1df]"
              aria-invalid={errors.ageConfirmed ? true : undefined}
              aria-describedby={[id("ageConfirmed-hint"), errors.ageConfirmed ? id("ageConfirmed-error") : ""].filter(Boolean).join(" ")}
            />
            {eligibility.checkboxLabel}
          </label>
          <p id={id("ageConfirmed-hint")} className="hint">
            {eligibility.statement} {eligibility.checkboxHint}
          </p>
          {err("ageConfirmed")}
        </div>
      )}
      {copy.requirementsAcknowledgement && (
        <div className="field">
          <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[0.9375rem] font-semibold text-ink">
            <input
              type="checkbox"
              name="requirementsAcknowledged"
              value="yes"
              required
              className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#5ce1df]"
              aria-invalid={errors.requirementsAcknowledged ? true : undefined}
              aria-describedby={errors.requirementsAcknowledged ? id("requirementsAcknowledged-error") : undefined}
            />
            {eligibility.requirementsCheckboxLabel}
          </label>
          {err("requirementsAcknowledged")}
        </div>
      )}
      {/* Spam trap for the form service; hidden from people and assistive technology. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={id("gotcha")}>Leave this empty</label>
        <input id={id("gotcha")} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="hint small">
        Sending this form sends the details above to the site&rsquo;s form service, Formspree.
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
          disabled={!CONNECTED || status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : copy.submit}
        </button>
      </div>
      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === "not-connected" && (
          <div className="card-notice small" role="status">
            <p className="strong text-[#ecd6a8]">Not sent.</p>
            <p className="mt-1">
              This build isn&rsquo;t connected to the form service, so nothing was sent. Email{" "}
              <a className="text-link" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>{" "}
              instead.
            </p>
          </div>
        )}
        {status === "failed" && (
          <div className="card-notice small" role="alert">
            <p className="strong text-[#ecd6a8]">The form service did not accept your message.</p>
            <p className="mt-1">
              It may not have been received. Please try again in a moment, or email{" "}
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
