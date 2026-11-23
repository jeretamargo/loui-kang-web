type SectionHeadingProps = {
  number: string;
  title: string;
  id: string;
};

export default function SectionHeading({ number, title, id }: SectionHeadingProps) {
  return (
    <div className="section-heading flex items-center gap-4">
      <span className="number-glow font-display text-sm font-bold text-accent-light" aria-hidden="true">{number}</span>
      <span className="h-px w-12 shrink-0 bg-cream/30" aria-hidden="true" />
      <h2 id={id} className="font-display text-[clamp(34px,5vw,64px)] leading-none font-bold">
        <span className="sr-only">{number} — </span>{title}
      </h2>
    </div>
  );
}
