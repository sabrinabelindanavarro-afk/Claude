import Catalog from '@/components/Catalog';
import { fetchRooms } from '@/lib/properties.server';

export default async function HomePage() {
  const rooms = await fetchRooms();

  return (
    <>
      <Catalog rooms={rooms} />

      <section id="faq" className="mx-auto max-w-6xl px-6 py-20">
        <p className="text-xs font-bold uppercase tracking-wide text-vivi-mint">Preguntas frecuentes</p>
        <h2 className="mt-2 text-3xl font-extrabold text-vivi-ink sm:text-4xl">
          Solo vivienda habitual: estancia mínima de 6 meses.
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-bold text-vivi-ink">¿Puedo mirar sin registrarme?</p>
            <p className="mt-2 text-sm text-vivi-muted">
              Sí. El catálogo es libre. Solo pedimos login, filtrado e identidad cuando decides reservar.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-bold text-vivi-ink">¿Qué pago al reservar?</p>
            <p className="mt-2 text-sm text-vivi-muted">
              Una fianza equivalente a una mensualidad más una comisión fija de servicio de 50 €, en
              un único pago.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-bold text-vivi-ink">¿Qué pasa después de reservar?</p>
            <p className="mt-2 text-sm text-vivi-muted">
              Se desbloquean el asesor, la agenda de visitas y alternativas similares dentro del mismo
              rango de precio.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="font-bold text-vivi-ink">¿Aceptan estancias cortas?</p>
            <p className="mt-2 text-sm text-vivi-muted">
              No. Todas las propiedades del catálogo son solo para vivienda habitual, con una estancia
              mínima de 6 meses.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
