import { NextResponse } from 'next/server';

// Integración con Didit (verificación de identidad). Confirmá el endpoint exacto,
// el nombre del header de API key y la forma de la respuesta contra la documentación
// vigente de Didit antes de pasar a producción: https://docs.didit.me
export async function POST(request: Request) {
  const apiKey = process.env.DIDIT_API_KEY;
  const workflowId = process.env.DIDIT_WORKFLOW_ID;
  if (!apiKey || !workflowId) {
    return NextResponse.json(
      { error: 'Didit no está configurado todavía (falta DIDIT_API_KEY / DIDIT_WORKFLOW_ID). Ver SETUP.md.' },
      { status: 501 }
    );
  }

  const { roomId } = await request.json();
  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || '';

  const diditResponse = await fetch('https://verification.didit.me/v1/session/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify({
      workflow_id: workflowId,
      callback: `${origin}/reservar/${roomId}`,
      vendor_data: roomId,
    }),
  });

  if (!diditResponse.ok) {
    const detail = await diditResponse.text();
    return NextResponse.json({ error: `Didit rechazó la solicitud: ${detail}` }, { status: 502 });
  }

  const data = await diditResponse.json();
  return NextResponse.json({ url: data.url ?? data.session_url ?? data.verification_url });
}
