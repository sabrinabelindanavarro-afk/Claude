import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { isAdminEmail } from '@/lib/admin-auth';
import { fetchAllBookings } from '@/lib/admin.server';
import { fetchRooms } from '@/lib/properties.server';
import { VIVI_COMMISSION_EUR } from '@/lib/rooms';
import AdminVisitAction from '@/components/AdminVisitAction';

// Nunca cachear esta página: muestra datos privados por sesión (auth + reservas).
export const dynamic = 'force-dynamic';

const STAGE_LABEL: Record<string, string> = {
  nuevo: 'Nuevo',
  verificado: 'Verificado',
  pagado: 'Pagado',
};

const STAGE_ORDER = ['nuevo', 'verificado', 'pagado'] as const;

export default async function AdminPage() {
  const supabase = createClient();
  if (!supabase) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-vivi-muted">Supabase todavía no está configurado (ver SETUP.md).</p>
      </section>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login?next=/admin');

  if (!isAdminEmail(user.email)) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-lg font-bold text-vivi-ink">No autorizado</p>
        <p className="mt-2 text-sm text-vivi-muted">
          Tu cuenta ({user.email}) no está en la lista de administradores. Agregala a la variable de
          entorno ADMIN_EMAILS (ver SETUP.md).
        </p>
      </section>
    );
  }

  const [bookings, rooms] = await Promise.all([fetchAllBookings(), fetchRooms()]);

  const paid = bookings.filter((b) => b.status === 'pagado');
  const visitsScheduledOrDone = bookings.filter(
    (b) => b.visitStatus === 'agendada' || b.visitStatus === 'hecha'
  );
  const commissionRevenue = paid.length * VIVI_COMMISSION_EUR;
  const stageCounts = STAGE_ORDER.map((stage) => ({
    stage,
    count: bookings.filter((b) => b.status === stage).length,
  }));
  const maxStageCount = Math.max(1, ...stageCounts.map((s) => s.count));

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-vivi-mint">Panel interno</p>
      <h1 className="mt-2 text-2xl font-extrabold text-vivi-ink sm:text-3xl">
        Toda la operación en una sola vista.
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <StatCard label="Habitaciones activas" value={String(rooms.length)} />
        <StatCard label="Reservas pagadas" value={String(paid.length)} />
        <StatCard label="Comisión VIVI generada" value={`${commissionRevenue.toLocaleString('es-ES')} €`} />
        <StatCard label="Visitas agendadas" value={String(visitsScheduledOrDone.length)} />
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-bold text-vivi-ink">Pipeline de reservas</h2>
        <div className="mt-4 flex items-end gap-6" style={{ height: 120 }}>
          {stageCounts.map(({ stage, count }) => (
            <div key={stage} className="flex flex-col items-center gap-2">
              <div
                className="w-16 rounded-t-lg bg-vivi-mint"
                style={{ height: `${Math.max(6, (count / maxStageCount) * 96)}px` }}
              />
              <p className="text-xs font-semibold text-vivi-ink">{STAGE_LABEL[stage]}</p>
              <p className="text-xs text-vivi-muted">{count}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-vivi-muted">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Habitación</th>
              <th className="px-4 py-3">Etapa</th>
              <th className="px-4 py-3">Pago</th>
              <th className="px-4 py-3">Visita</th>
              <th className="px-4 py-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 text-vivi-ink">{b.userEmail ?? '—'}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-vivi-ink">{b.roomTitle}</p>
                  <p className="text-xs text-vivi-muted">{b.roomZone}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      b.status === 'pagado'
                        ? 'bg-vivi-mintLight text-emerald-700'
                        : b.status === 'verificado'
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'bg-slate-100 text-vivi-muted'
                    }`}
                  >
                    {STAGE_LABEL[b.status]}
                  </span>
                </td>
                <td className="px-4 py-3 text-vivi-ink">{b.amount ? `${b.amount.toFixed(2)} €` : '—'}</td>
                <td className="px-4 py-3">
                  <p className="text-vivi-ink">
                    {b.visitStatus === 'pendiente'
                      ? 'Pendiente'
                      : b.visitStatus === 'agendada'
                        ? 'Agendada'
                        : 'Hecha'}
                  </p>
                  {b.visitAt && (
                    <p className="text-xs text-vivi-muted">
                      {new Date(b.visitAt).toLocaleString('es-ES')}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <AdminVisitAction bookingId={b.id} visitStatus={b.visitStatus} />
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-vivi-muted">
                  Todavía no hay reservas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-2xl font-extrabold text-vivi-ink">{value}</p>
      <p className="mt-1 text-xs font-medium text-vivi-muted">{label}</p>
    </div>
  );
}
