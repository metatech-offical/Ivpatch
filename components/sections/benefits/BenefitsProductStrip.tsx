export default function BenefitsProductStrip() {
  const products = Array.from({ length: 7 }).map((_, idx) => ({
    img: idx === 2
      ? "/active.svg"
      : "/inactive.svg"
  }));

  return (
    <section
      className="w-full max-w-[1252px] py-6"
      data-name="Product display"
    >
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:grid md:grid-cols-7 md:gap-4 md:overflow-visible">
        {products.map((p, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-[140px] md:w-auto aspect-[1.1] md:h-[147px] bg-white border border-black/10 rounded-[20px] shadow-sm overflow-hidden flex items-center justify-center hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <img
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={p.img}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
