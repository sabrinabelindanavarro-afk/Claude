import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchRoomById } from '@/lib/properties.server';

export default async function ReservaExitoPage({ params }: { params: { id: string } }) {
  const room = await fetchRoomById(params.id);
  if (!room) return notFound();

  return (
    <section className="mx-auto max-w-md px-6 py-24 text-center">
      <span className="inline-block rounded-full bg-vivi-mintLight px-4 py-1.5 text-xs font-bold text-emerald-700">
        Reserva confirmada
      </span>
      <h1 className="mt-4 text-2xl font-extrabold text-vivi-ink">Pago recibido</h1>
      <p className="mt-3 text-sm text-vivi-muted">
        Reservaste <strong>{room.title}</strong>. El asesor y la agenda de visitas ya están
        disponibles, junto con alternativas similares dentro del mismo rango de precio.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-xl bg-vivi-navy px-6 py-3 text-sm font-semibold text-white hover:bg-vivi-navyLight"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}
