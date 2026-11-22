import type { ReactNode } from "react";

type PlatformButtonProps = {
  href: string;
  icon: ReactNode;
  label: string;
};

export default function PlatformButton({ href, icon, label }: PlatformButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="platform-button flex min-h-18 items-center justify-center gap-3.5 rounded-full bg-accent px-7 text-lg font-bold text-cream shadow-platform transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none"
    >
      <span className="size-7.5 shrink-0" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
