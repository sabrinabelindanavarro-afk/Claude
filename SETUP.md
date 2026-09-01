# Conectar VIVI a servicios reales

Esta app funciona en "modo demo" sin configurar nada (con 9 habitaciones de ejemplo y
pagos/verificación simulados). Para que sea real seguí estos pasos. Ninguno requiere
escribir código: son cuentas + copiar y pegar claves.

## 1. Supabase — login, catálogo sin código y panel interno

1. Creá una cuenta gratis en [supabase.com](https://supabase.com) y un proyecto nuevo.
2. En el proyecto, andá a **SQL Editor → New query**, pegá el contenido de
   `supabase/schema.sql` de este repo y tocá **Run**. Esto crea las tablas `properties`
   (el catálogo, con 9 habitaciones de ejemplo) y `bookings` (cada reserva, con su
   etapa, pago y visita — es lo que alimenta el panel interno).
3. Andá a **Project Settings → API** y copiá:
   - `Project URL` → pegalo en `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → pegalo en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (más abajo en la misma página, dice "secret") → pegala en
     `SUPABASE_SERVICE_ROLE_KEY`. Esta clave es sensible: solo la usa el panel
     interno en el servidor, nunca la pongas en código que corra en el navegador.
4. **Para subir o editar habitaciones sin código:** Dashboard → **Table Editor** →
   tabla `properties` → botón **Insert row** (o hacé clic en una celda para editarla,
   como en una planilla). Los campos son: zona, título, precio, % match, fecha
   disponible (`dd/mm/aaaa`), si acepta pareja, comodidades (`amenities`,
   lista separada por comas), descripción, y el asesor asignado (`manager`,
   `manager_phone`, `manager_email` — es el contacto que ve el cliente después de
   pagar).
5. **Para el login:** no hay nada más que hacer — en cuanto completes el paso 3, los
   botones "Iniciar sesión" / "Crear cuenta" del sitio ya funcionan con email y
   contraseña. Supabase envía el email de confirmación automáticamente.
6. **Para el panel interno (`/admin`):** agregá tu email (y el de tu equipo) a
   `ADMIN_EMAILS`, separados por coma, ej: `ADMIN_EMAILS=vos@tuempresa.com,socia@tuempresa.com`.
   Solo esas cuentas van a poder entrar a `/admin` — a cualquier otra persona logueada
   le va a decir "No autorizado". Una vez logueado con un email de la lista, va a
   aparecer un link "Panel interno" en el menú de arriba.

## 2. Stripe — cobro real de fianza + comisión

1. Creá una cuenta en [stripe.com](https://stripe.com).
2. Dashboard → **Developers → API keys** → copiá la **Secret key** (empezá con la de
   modo test, que arranca con `sk_test_`) → pegala en `STRIPE_SECRET_KEY`.
3. Con eso ya alcanza: al tocar "Pagar y reservar", la web crea una sesión de pago de
   Stripe (fianza + 50 € de comisión fija) y redirige a la página de pago de Stripe.
4. Cuando quieras cobrar de verdad (no en modo test), activá tu cuenta de Stripe y
   reemplazá la clave por la de modo real (`sk_live_...`).

## 3. Didit — verificación de identidad (KYC)

1. Creá una cuenta en [Didit](https://didit.me) y armá un "workflow" de verificación
   (documento + selfie) desde su panel.
2. Copiá tu **API key** → `DIDIT_API_KEY`, y el **ID del workflow** → `DIDIT_WORKFLOW_ID`.
3. **Importante:** la integración que dejamos en `app/api/kyc/route.ts` está armada
   según el patrón habitual de la API de Didit (crear una sesión, redirigir al
   usuario a la URL que devuelve). Antes de pasar a producción, confirmá contra la
   [documentación actual de Didit](https://docs.didit.me) que el endpoint, el nombre
   del header de la API key y los campos de la respuesta siguen siendo los mismos —
   las APIs de terceros cambian con el tiempo.

## 4. Qué pasa después de que un cliente paga

En cuanto Stripe confirma el pago, la página de "reserva confirmada" le muestra al
cliente el teléfono y email de la asesora asignada a esa habitación (los datos
`manager` / `manager_phone` / `manager_email` de la propiedad), y un formulario para
elegir fecha y hora de la visita. Esa reserva y esa visita quedan guardadas en la
tabla `bookings` y aparecen al instante en `/admin`.

Nota de robustez: esto se confirma cuando el cliente vuelve a la página de éxito
después de pagar. Si cerrara la pestaña de Stripe antes de volver, esa reserva
puntual no quedaría registrada en el panel (aunque el cobro en Stripe sí se hizo).
Si eso te importa, el paso siguiente es agregar un webhook de Stripe
(`checkout.session.completed`) que guarde la reserva del lado de Stripe en vez de
esperar a que el cliente vuelva — pedímelo cuando quieras y lo armamos.

## 5. Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores de los pasos anteriores:

```bash
cp .env.example .env.local
```

En Vercel (o donde despliegues), cargá las mismas variables en
**Project Settings → Environment Variables**.

## 6. Publicar el sitio

La forma más simple es [Vercel](https://vercel.com): conectá el repo de GitHub,
pegá las variables de entorno del paso 4, y listo — cada push a la rama principal
actualiza el sitio en vivo.
