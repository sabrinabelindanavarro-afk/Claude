import { notFound } from 'next/navigation';
import { getRoomById, rooms } from '@/lib/rooms';
import BookingWizard from '@/components/BookingWizard';

export function generateStaticParams() {
  return rooms.map((room) => ({ id: room.id }));
}

export default function ReservarPage({ params }: { params: { id: string } }) {
  const room = getRoomById(params.id);
  if (!room) return notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-vivi-mint">Reserva y pago</p>
      <h1 className="mt-2 text-3xl font-extrabold text-vivi-ink sm:text-4xl">
        Se reserva con fianza + comisión automática.
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-vivi-muted">
        No existe una seña separada. La fianza equivale a una mensualidad y VIVI cobra su 5% en el
        mismo momento del pago.
      </p>

      <div className="mt-10">
        <BookingWizard room={room} />
      </div>
    </section>
  );
}
