// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/company.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type AboutContent = {
  eyebrow: string;
  title: string;
  intro: string;
  mission: { heading: string; paragraphs: string[]; motto: string };
};

export const about: AboutContent = {
  eyebrow: "About",
  title: "Company",
  intro: "LynxDock LLC is an independent, founder-led software company building a privacy-first ecosystem for the people who actually use software.",
  mission: {
    heading: "Our mission",
    paragraphs: [
    "Software should serve the people who use it. Too much of today's technology is designed to capture attention, harvest data, and lock users in. We think that's backwards.",
    "LynxDock builds lightweight, privacy-first tools you can self-host and truly own - communication, development, and automation software that stays fast, quiet, and respectful of the people using it.",
    ],
    motto: "Built for People. Not Platforms.",
  },
};

export default about;
