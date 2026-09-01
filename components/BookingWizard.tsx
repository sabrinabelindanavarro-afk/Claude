'use client';

import { useState } from 'react';
import type { Room } from '@/lib/rooms';
import { calculateBookingTotal } from '@/lib/rooms';

const steps = [
  'Elegir habitación',
  'Iniciar sesión',
  'Filtro + KYC',
  'Aceptar condiciones',
  'Pagar fianza + 5%',
];

export default function BookingWizard({ room }: { room: Room }) {
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const { deposit, commission, total } = calculateBookingTotal(room.price);

  const isLastStep = step === steps.length - 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <ol className="space-y-4">
          {steps.map((label, i) => {
            const state = i < step ? 'done' : i === step ? 'current' : 'upcoming';
            return (
              <li key={label} className="flex items-center gap-4">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    state === 'done'
                      ? 'bg-vivi-mint text-vivi-navy'
                      : state === 'current'
                        ? 'bg-vivi-navy text-white'
                        : 'bg-slate-100 text-vivi-muted'
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`text-sm font-semibold ${
                    state === 'upcoming' ? 'text-vivi-muted' : 'text-vivi-ink'
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>

        {!confirmed ? (
          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-vivi-ink"
              >
                Atrás
              </button>
            )}
            <button
              onClick={() => {
                if (isLastStep) {
                  setConfirmed(true);
                } else {
                  setStep((s) => s + 1);
                }
              }}
              className="rounded-xl bg-vivi-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-vivi-navyLight"
            >
              {isLastStep ? 'Pagar y reservar' : 'Continuar'}
            </button>
          </div>
        ) : (
          <div className="mt-8 rounded-xl bg-vivi-mintLight p-6 text-emerald-800">
            <p className="font-bold">Reserva confirmada</p>
            <p className="mt-2 text-sm">
              Pago recibido. El asesor y la agenda de visitas ya están disponibles, junto con
              alternativas similares dentro del mismo rango de precio.
            </p>
          </div>
        )}
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
        <h3 className="text-lg font-bold text-vivi-ink">Resumen de reserva</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-vivi-muted">Habitación</dt>
            <dd className="font-medium text-vivi-ink">{room.title}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-vivi-muted">Alquiler mensual</dt>
            <dd className="font-medium text-vivi-ink">{room.price.toFixed(2)} €</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-vivi-muted">Fianza (1 mensualidad)</dt>
            <dd className="font-bold text-vivi-ink">{deposit.toFixed(2)} €</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-vivi-muted">Comisión VIVI (5%)</dt>
            <dd className="font-bold text-vivi-ink">{commission.toFixed(2)} €</dd>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
            <dt className="font-bold text-vivi-ink">TOTAL HOY</dt>
            <dd className="font-extrabold text-vivi-ink">{total.toFixed(2)} €</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
