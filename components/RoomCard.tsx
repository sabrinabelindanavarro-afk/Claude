import Link from 'next/link';
import type { Room } from '@/lib/rooms';

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Link
      href={`/rooms/${room.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className="h-36 rounded-xl"
        style={{
          background: `linear-gradient(135deg, ${room.colorFrom}, ${room.colorTo})`,
        }}
      />
      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-vivi-muted">{room.zone}</p>
          <p className="text-lg font-bold text-vivi-ink">{room.price} € / mes</p>
        </div>
        <span className="rounded-full bg-vivi-mintLight px-3 py-1 text-xs font-bold text-emerald-700">
          {room.match}% match
        </span>
      </div>
    </Link>
  );
}
