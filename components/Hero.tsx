import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-vivi-navy">
      <div className="absolute right-24 top-16 h-24 w-24 rounded-full bg-vivi-mint/90 sm:h-32 sm:w-32" />
      <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-vivi-coral/90 sm:h-40 sm:w-40" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:grid-cols-2 sm:py-28">
        <div className="relative z-10">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-vivi-mint">
            Vivienda habitual · +6 meses
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Alquiler residencial, verificado y reservable desde el móvil.
          </h1>
          <p className="mt-6 text-sm text-slate-300 sm:text-base">
            Catálogo libre · filtrado de inquilino · identidad · fianza · reserva · visitas
          </p>
          <Link
            href="#catalogo"
            className="mt-8 inline-flex rounded-xl bg-vivi-mint px-6 py-3 text-sm font-bold text-vivi-navy transition hover:brightness-95"
          >
            Explorar catálogo
          </Link>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-xs">
          <div className="rounded-[2.5rem] border border-white/10 bg-vivi-navyLight p-3 shadow-2xl">
            <div className="rounded-[2rem] bg-white p-5">
              <div className="h-20 rounded-xl bg-vivi-mintLight" />
              <p className="mt-4 text-sm font-semibold text-vivi-ink">Ruzafa</p>
              <p className="mt-2 text-2xl font-extrabold text-vivi-ink">750 € / mes</p>
              <div className="mt-10 rounded-lg bg-vivi-mint py-3 text-center text-sm font-bold text-vivi-navy">
                RESERVAR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
