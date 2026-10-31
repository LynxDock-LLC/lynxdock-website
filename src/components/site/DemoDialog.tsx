"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import EnquiryForm from "./EnquiryForm";

/**
 * The "Request a demo" dialog. Every demo control is a link to /support/#request-demo, so without JavaScript it
 * goes to the same form on the Support page. With JavaScript, a click on any element marked `data-demo-open`
 * opens this modal instead. The native <dialog> keeps focus inside while open, closes on Escape, and focus
 * goes back to the control that opened it.
 */
export default function DemoDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [round, setRound] = useState(0);

  const close = useCallback(() => {
    ref.current?.close();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-demo-open]");
      const dialog = ref.current;
      if (!trigger || !dialog || typeof dialog.showModal !== "function") return;
      e.preventDefault();
      opener.current = trigger;
      setRound((r) => r + 1);
      setOpen(true);
      dialog.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      opener.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="demo-dialog-title"
      aria-describedby="demo-dialog-intro"
      onClick={(e) => {
        // A click on the backdrop (outside the panel) closes the dialog.
        if (e.target === ref.current) close();
      }}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h2 id="demo-dialog-title" className="h-card text-[1.35rem]">
            Request a demo
          </h2>
          <button type="button" className="btn btn-quiet -mr-2 -mt-2" onClick={close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            <span className="sr-only">Close the demo request</span>
          </button>
        </div>
        <p id="demo-dialog-intro" className="small mt-2">
          We&rsquo;ll walk you through LynxDock with demonstration data and answer questions about running it for
          your community. Invited testers looking for installers can go to the{" "}
          <a className="text-link" href="/beta/">
            tester hub
          </a>{" "}
          instead.
        </p>
        <div className="mt-5">{open && <EnquiryForm key={round} kind="demo" autoFocus onDone={close} />}</div>
      </div>
    </dialog>
  );
}
