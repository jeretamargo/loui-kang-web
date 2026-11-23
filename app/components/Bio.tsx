import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";

export default function Bio() {
  return (
    <section id="bio" className="redesign-section" aria-labelledby="bio-heading" data-reveal>
      <div className="redesign-container">
        <SectionHeading number="01" title="BIO" id="bio-heading" />
        <div className="flex flex-wrap items-start gap-[clamp(32px,6vw,88px)]">
          <div className="min-w-0 flex-[1_1_380px]">
            <Carousel />
          </div>
          <div className="min-w-0 flex-[1_1_440px]">
            <p className="mb-8 text-[clamp(26px,2.7vw,40px)] leading-[1.18] font-semibold tracking-[-0.015em]">
              Desde Ushuaia, donde el aislamiento y el frío moldean su{" "}
              <span className="text-accent-light">identidad sonora</span>.
            </p>
            <p className="mb-[18px] max-w-[60ch] text-lg leading-[1.7] text-muted-2">
              José Luis Kang Vanni —“Loui Kang”— nació en Asunción del Paraguay el 1 de agosto de 2001.
              Su música cruza emoción cruda, noches intensas y una narrativa de caída y superación constante.
            </p>
            <p className="max-w-[60ch] text-lg leading-[1.7] text-muted-2">
              Entre lo íntimo y lo explosivo, construye un universo donde el caos y las experiencias
              personales siempre empujan hacia adelante.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
