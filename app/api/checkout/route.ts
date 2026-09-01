import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { calculateBookingTotal } from '@/lib/rooms';
import { fetchRoomById } from '@/lib/properties.server';

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: 'Stripe no está configurado todavía (falta STRIPE_SECRET_KEY). Ver SETUP.md.' },
      { status: 501 }
    );
  }

  const { roomId } = await request.json();
  const room = await fetchRoomById(roomId);
  if (!room) {
    return NextResponse.json({ error: 'Habitación no encontrada' }, { status: 404 });
  }

  const { deposit, commission } = calculateBookingTotal(room.price);
  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || '';

  const stripe = new Stripe(secretKey);
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(deposit * 100),
          product_data: { name: `Fianza · ${room.title}` },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(commission * 100),
          product_data: { name: 'Comisión de servicio VIVI' },
        },
        quantity: 1,
      },
    ],
    metadata: { roomId },
    success_url: `${origin}/reservar/${roomId}/exito?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/reservar/${roomId}`,
  });

  return NextResponse.json({ url: session.url });
}
