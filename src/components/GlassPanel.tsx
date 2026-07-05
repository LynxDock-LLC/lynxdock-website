import type { ElementType, ReactNode } from "react";

export default function GlassPanel({
  children,
  className = "",
  hover = false,
  as: Tag = "div",
  glow = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: ElementType;
  glow?: boolean;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={[
        "glass rounded-2xl",
        hover ? "glass-hover" : "",
        glow ? "shadow-glow-lg" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Tag>
  );
}
