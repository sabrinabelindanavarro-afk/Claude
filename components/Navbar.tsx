import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-2xl font-black tracking-tight text-vivi-navy">VIVI</span>
          <span className="text-sm font-medium text-vivi-muted">Valencia</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-vivi-muted sm:flex">
          <Link href="/#catalogo" className="hover:text-vivi-navy">
            Catálogo
          </Link>
          <Link href="/#como-funciona" className="hover:text-vivi-navy">
            Cómo funciona
          </Link>
          <Link href="/#faq" className="hover:text-vivi-navy">
            Preguntas frecuentes
          </Link>
        </nav>
        <Link
          href="/#catalogo"
          className="rounded-full bg-vivi-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-vivi-navyLight"
        >
          Ver habitaciones
        </Link>
      </div>
    </header>
  );
}
