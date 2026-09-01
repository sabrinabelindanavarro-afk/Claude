const steps = [
  { n: '01', title: 'WhatsApp', desc: 'Entrada' },
  { n: '02', title: 'Catálogo', desc: 'Explora libre' },
  { n: '03', title: 'Reservar', desc: 'Intención' },
  { n: '04', title: 'Login + filtro', desc: 'Perfil' },
  { n: '05', title: 'Fianza + 5%', desc: 'Pago' },
  { n: '06', title: 'Visitas', desc: 'Elección' },
];

export default function HowItWorks() {
  return (
    <section className="bg-vivi-bg py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-bold uppercase tracking-wide text-vivi-mint">Cómo funciona</p>
        <h2 className="mt-2 text-3xl font-extrabold text-vivi-ink sm:text-4xl">
          Un embudo digital para vivienda habitual.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-vivi-muted">
          El catálogo se explora libremente. El filtro, la identidad y el pago aparecen cuando existe
          intención real de reservar.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className={`rounded-xl border p-4 ${
                i === 4
                  ? 'border-vivi-mint bg-vivi-mintLight'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i === 4 ? 'bg-vivi-mint text-vivi-navy' : 'bg-slate-100 text-vivi-muted'
                }`}
              >
                {step.n}
              </span>
              <p className="mt-3 text-sm font-bold text-vivi-ink">{step.title}</p>
              <p className="text-xs text-vivi-muted">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-vivi-navy px-6 py-4 text-sm font-medium text-white">
          El asesor interviene cuando ya existe un candidato compatible, identificado y con una reserva
          pagada.
        </div>
      </div>
    </section>
  );
}
