/**
 * Concept portrait tile. No staff identity is implied; the caption marks the
 * craft it illustrates until approved portraits exist.
 */
export function BarberCard({ image, caption }: { image: string; caption: string }) {
  return (
    <article className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-[6px] bg-carbon">
        <img src={image} alt="" className="aspect-[3/4] w-full object-cover" loading="lazy" decoding="async" />
      </div>
      <p className="text-[0.9375rem] font-semibold text-ivory">{caption}</p>
    </article>
  );
}
