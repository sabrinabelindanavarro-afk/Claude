import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchRoomById } from '@/lib/properties.server';

export default async function RoomDetailPage({ params }: { params: { id: string } }) {
  const room = await fetchRoomById(params.id);
  if (!room) return notFound();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-wide text-vivi-mint">Ficha de habitación</p>
      <h1 className="mt-2 text-3xl font-extrabold text-vivi-ink sm:text-4xl">
        Toda la información antes de tomar una decisión.
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="relative">
            <div
              className="h-72 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${room.colorFrom}, ${room.colorTo})`,
              }}
            />
            <span className="absolute bottom-4 right-4 rounded-lg bg-vivi-navy px-3 py-1.5 text-xs font-bold text-white">
              {room.photos} FOTOS
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-vivi-ink">{room.title}</h2>
              <p className="mt-1 text-2xl font-extrabold text-vivi-ink">{room.price} € / mes</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-vivi-mintLight px-3 py-1 text-xs font-bold text-emerald-700">
                Disponible {room.available}
              </span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                {room.match}% compatible
              </span>
            </div>
          </div>

          {room.description && (
            <p className="mt-4 text-sm leading-relaxed text-vivi-muted">{room.description}</p>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {room.amenities.map((a) => (
              <div
                key={a}
                className="rounded-lg bg-slate-50 px-3 py-2 text-center text-sm font-medium text-vivi-ink"
              >
                ✓ {a}
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-vivi-navy p-6 text-white">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-vivi-mint">
            Vivienda habitual · mínimo 6 meses
          </span>
          <h3 className="mt-4 text-lg font-bold">¿Te interesa?</h3>
          <p className="mt-3 text-sm text-slate-300">
            Puedes mirar tantas habitaciones como quieras. Solo pedimos login, filtrado y verificación
            cuando decides reservar.
          </p>
          <Link
            href={`/reservar/${room.id}`}
            className="mt-6 block rounded-xl bg-vivi-mint py-3 text-center text-sm font-bold text-vivi-navy transition hover:brightness-95"
          >
            Reservar habitación
          </Link>
        </aside>
      </div>
    </section>
  );
}
