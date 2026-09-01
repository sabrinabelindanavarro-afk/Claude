import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import AuthButton from '@/components/AuthButton';

export default async function Navbar() {
  const supabase = createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

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
          <Link href="/#faq" className="hover:text-vivi-navy">
            Preguntas frecuentes
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <AuthButton email={user?.email ?? null} />
          <Link
            href="/#catalogo"
            className="hidden rounded-full bg-vivi-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-vivi-navyLight sm:inline-block"
          >
            Ver habitaciones
          </Link>
        </div>
      </div>
    </header>
  );
}
