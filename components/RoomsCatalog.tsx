'use client';

import { useMemo, useState } from 'react';
import type { Room } from '@/lib/rooms';
import RoomCard from '@/components/RoomCard';

export default function RoomsCatalog({ rooms }: { rooms: Room[] }) {
  const zones = ['Todas', ...Array.from(new Set(rooms.map((r) => r.zone)))];

  const [zone, setZone] = useState('Todas');
  const [maxBudget, setMaxBudget] = useState(900);
  const [pareja, setPareja] = useState(false);
  const [pet, setPet] = useState(false);

  const filtered = useMemo(() => {
    return rooms.filter((room) => {
      if (zone !== 'Todas' && room.zone !== zone) return false;
      if (room.price > maxBudget) return false;
      if (pareja && room.individualOrPareja === 'individual') return false;
      if (pet && !room.pet) return false;
      return true;
    });
  }, [rooms, zone, maxBudget, pareja, pet]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-sm font-bold text-vivi-ink">Filtros</h3>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-vivi-muted">
          Zona
        </label>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          {zones.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-vivi-muted">
          Presupuesto máximo: {maxBudget} €
        </label>
        <input
          type="range"
          min={600}
          max={900}
          step={10}
          value={maxBudget}
          onChange={(e) => setMaxBudget(Number(e.target.value))}
          className="mt-2 w-full accent-vivi-mint"
        />

        <label className="mt-5 flex items-center gap-2 text-sm text-vivi-ink">
          <input
            type="checkbox"
            checked={pareja}
            onChange={(e) => setPareja(e.target.checked)}
            className="accent-vivi-mint"
          />
          Acepta pareja
        </label>
        <label className="mt-3 flex items-center gap-2 text-sm text-vivi-ink">
          <input
            type="checkbox"
            checked={pet}
            onChange={(e) => setPet(e.target.checked)}
            className="accent-vivi-mint"
          />
          Acepta mascota
        </label>
      </aside>

      <div>
        <p className="mb-4 text-sm text-vivi-muted">
          {filtered.length} {filtered.length === 1 ? 'habitación disponible' : 'habitaciones disponibles'}
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-2 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-vivi-muted">
              No hay habitaciones que coincidan con estos filtros.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
