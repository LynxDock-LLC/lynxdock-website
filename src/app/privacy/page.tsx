import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import OwnerField from "@/components/site/OwnerField";
import { betaLicence, eligibility } from "@/data/siteStatus";

// Privacy notice for the website (owner direction, 2026-10-25: an accurate update before any public beta intake or
// announcement). It describes what this site actually processes, as verified on 2026-10-26 and 2026-10-27: Cloudflare
// hosting and downloads (with Cloudflare's network error reports), Cloudflare Web Analytics (loaded twice on the live
// site: the site's own beacon and the one Cloudflare Pages adds), the Formspree enquiry form and email. It says nothing about accounts or
// licensing, which do not exist. Every fact only the owner can supply is an <OwnerField>; a production build that
// still contains one fails scripts/check-site.mjs.
export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How the LynxDock website handles information: hosting, page-view analytics, enquiry forms and email, and the 18+ self-declaration for beta participants.",
};

const CLOUDFLARE_POLICY = "https://www.cloudflare.com/privacypolicy/";
const FORMSPREE_POLICY = "https://formspree.io/legal/privacy-policy/";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line pt-8">
      <h2 id={`${id}-title`} className="h-card text-[1.3rem]">
        {title}
      </h2>
      <div className="body mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function External({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        intro={
          <p>
            How this website, lynxdock.app, handles information. Last updated <OwnerField>date approved</OwnerField>.
          </p>
        }
      />

      <div className="wrap-narrow flex flex-col gap-8 py-12 sm:py-16">
        <section aria-labelledby="summary-title" className="card-2">
          <h2 id="summary-title" className="h-card">
            In short
          </h2>
          <ul className="tick-list body mt-3">
            <li>There are no accounts on this website, no advertising and no advertising trackers.</li>
            <li>
              Page views are counted with Cloudflare Web Analytics. Cloudflare states that it does not collect or use
              visitors&rsquo; personal data.
            </li>
            <li>If you send one of our forms, what you type goes to the LynxDock team through Formspree.</li>
            <li>We do not sell personal information.</li>
            <li>
              LynxDock community servers are run by the communities that use them. LynxDock LLC has no access to what
              they hold.
            </li>
          </ul>
        </section>

        <Section id="who" title="Who we are">
          <p>
            This website is run by LynxDock LLC <OwnerField>registered address, if it should be shown</OwnerField>.
            For questions about privacy, contact <OwnerField>privacy contact address; the site&rsquo;s other pages
            use admin@lynxdock.app</OwnerField>.
          </p>
        </Section>

        <Section id="hosting" title="Hosting and downloads">
          <p>
            The website and the installer downloads (beta-dl.lynxdock.app) are served by Cloudflare. To deliver pages
            and files and to protect the service, Cloudflare processes technical details of each request, such as your
            IP address, your browser details and the page or file requested.
          </p>
          <p>
            Cloudflare also asks browsers that support network error reporting to tell it when a request to this site
            fails, for example when a page does not load. It asks for no reports about requests that succeed. A report
            goes from your browser to Cloudflare (a.nel.cloudflare.com), not to LynxDock, and describes the failed
            request: the address, the type of error and technical details such as the server address and protocol.
            Like any request, it reaches Cloudflare with your IP address.
          </p>
          <p>
            Retention of these request records: <OwnerField>as set in the Cloudflare account</OwnerField>.
            Cloudflare&rsquo;s own handling is described in its <External href={CLOUDFLARE_POLICY}>privacy policy</External>.
          </p>
        </Section>

        <Section id="analytics" title="Page-view analytics">
          <p>
            The public site loads Cloudflare Web Analytics (a script from static.cloudflareinsights.com) to count page
            views and measure how quickly pages load. Cloudflare states that Web Analytics does not collect or use
            visitors&rsquo; personal data. We use the totals to understand which pages are read.
          </p>
          <p>
            At present each page loads the script twice: once from the website&rsquo;s own code and once added by
            Cloudflare Pages, the service that hosts the website. Each copy counts the page view in a separate Cloudflare
            Web Analytics report.{" "}
            <OwnerField>
              keep one analytics script or both; if one is removed, replace this paragraph with one sentence naming the
              one that remains
            </OwnerField>
          </p>
          <p>
            Retention:{" "}
            <OwnerField>retention shown in the Cloudflare Web Analytics account, for each report that is kept</OwnerField>.
            The site works
            normally if a content blocker stops the script.
          </p>
        </Section>

        <Section id="forms" title="Forms: demo, beta access, business enquiries and the beta requirements confirmation">
          <p>
            When you send one of these forms, what you enter goes to Formspree, a form-handling service, which stores
            the submission in LynxDock&rsquo;s account and emails it to the team. Each submission also says which form
            it came from and the page you sent it from. Depending on the form, what you enter can include your name,
            email address, organisation or community, the option you chose and your message. A beta access request
            also includes your confirmation that you are 18 or older.
          </p>
          <p>
            The beta requirements confirmation on the tester hub sends your name, your email address, the community
            you are joining, your confirmation that you are 18 or older, and your agreement to the beta requirements
            with the identifier of the version you agreed to ({betaLicence.id}). It has no message field.
          </p>
          <p>
            Formspree also records technical details such as your IP address and browser type, and processes data in
            the United States. Its handling is described in its{" "}
            <External href={FORMSPREE_POLICY}>privacy policy</External>.
          </p>
          <p>
            We use what you send to reply to you, to handle your request and to keep a record that you confirmed the
            beta requirements.{" "}
            <OwnerField>
              confirm no other use, for example no mailing list, and whether a confirmation is ever shared with the
              community&rsquo;s administrator
            </OwnerField>{" "}
            Retention:{" "}
            <OwnerField>how long submissions, including beta requirements confirmations, are kept in Formspree and in email</OwnerField>.
          </p>
          <p>
            Nothing is sent until you press the form&rsquo;s send button. A form that is not connected to the
            service says so and sends nothing.
          </p>
        </Section>

        <Section id="email" title="Email">
          <p>
            Links that start an email only open your own email app; nothing is sent until you send it. Email sent to
            a lynxdock.app address is received by Cloudflare Email Routing, which forwards it to{" "}
            <OwnerField>the mailbox and provider it is forwarded to</OwnerField>, where it is kept for{" "}
            <OwnerField>retention</OwnerField>.
          </p>
        </Section>

        <Section id="not-used" title="What this website does not do">
          <ul className="tick-list">
            <li>
              It does not set cookies of its own, and none were seen on ordinary requests to the site.{" "}
              <OwnerField>
                confirm whether Cloudflare bot or security protection is on for the domain: a security challenge can set
                a cookie such as __cf_bm or cf_clearance; if it can, name it here as a strictly necessary security cookie
              </OwnerField>
            </li>
            <li>It does not show advertising or load advertising or social-media trackers.</li>
            <li>It loads its fonts from this site, not from a third-party font service.</li>
            <li>It does not sell personal information.</li>
          </ul>
        </Section>

        <Section id="age" title="Beta participants and age">
          <p>
            {eligibility.statement} {eligibility.scope} That is an eligibility rule, and the only way it is confirmed
            is each person&rsquo;s own declaration. On this website, the beta access form and the beta requirements
            confirmation ask you to tick a box confirming that you are 18 or older. LynxDock does not verify age, and
            nothing in the apps, the installers or community servers checks it. This website is not directed at
            children.
          </p>
          <p>
            From the next tester release, the LynxDock app and LynxDock Host also ask for this declaration when they
            first start, as part of accepting the beta requirements. That happens in the app, not on this website. The
            app keeps a record of the acceptance on your device only, for your Windows account: the identifier and
            version you accepted, a fingerprint of the text, your 18+ declaration, the time and the app version. The
            record contains nothing that identifies you and is never sent to LynxDock or to any server.
          </p>
          <p>
            <OwnerField>
              what you do if you learn that a request or confirmation came from someone under 18, for example delete
              it and ask the community not to invite them
            </OwnerField>
          </p>
        </Section>

        <Section id="apps" title="The LynxDock apps and community servers">
          <p>
            Apart from the in-app acceptance record described above, this notice covers the website only. Community
            servers are run by the communities that use them: their accounts, messages, voice and records stay on
            infrastructure each community controls, and LynxDock LLC has no access to them unless someone sends us
            information, for example in a problem report.
          </p>
        </Section>

        <Section id="requests" title="Your requests">
          <p>
            You can ask us to see, correct or delete an enquiry you sent by contacting{" "}
            <OwnerField>privacy contact address</OwnerField>.{" "}
            <OwnerField>response time, and any rights for particular jurisdictions you choose to state</OwnerField>
          </p>
        </Section>

        <Section id="changes" title="Changes to this notice">
          <p>
            When what the website processes changes, we update this notice and the date at the top. See also the{" "}
            <Link href="/terms/" className="text-link">
              terms
            </Link>
            .
          </p>
        </Section>
      </div>
    </>
  );
}
