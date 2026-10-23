export function PageHero({
  label,
  title,
  text,
  image,
}: {
  label: string;
  title: string;
  text?: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-carbon">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-obsidian/75" aria-hidden="true" />
        </>
      )}
      <div className="shell pb-[clamp(3rem,7vw,5.5rem)] pt-[clamp(8rem,18vh,11rem)]">
        <p className="eyebrow mb-4">{label}</p>
        <h1 className="section-title max-w-4xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-bone">{text}</p>}
      </div>
    </section>
  );
}
