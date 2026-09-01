# Conectar VIVI a servicios reales

Esta app funciona en "modo demo" sin configurar nada (con 4 habitaciones de ejemplo y
pagos/verificación simulados). Para que sea real seguí estos pasos. Ninguno requiere
escribir código: son cuentas + copiar y pegar claves.

## 1. Supabase — login y carga de propiedades sin código

1. Creá una cuenta gratis en [supabase.com](https://supabase.com) y un proyecto nuevo.
2. En el proyecto, andá a **SQL Editor → New query**, pegá el contenido de
   `supabase/schema.sql` de este repo y tocá **Run**. Esto crea la tabla `properties`
   con 4 habitaciones de ejemplo.
3. Andá a **Project Settings → API** y copiá:
   - `Project URL` → pegalo en `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → pegalo en `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Para subir o editar habitaciones sin código:** Dashboard → **Table Editor** →
   tabla `properties` → botón **Insert row** (o hacé clic en una celda para editarla,
   como en una planilla). Los campos son: zona, título, precio, % match, fecha
   disponible (`dd/mm/aaaa`), si acepta pareja/mascota, comodidades (`amenities`,
   lista separada por comas) y descripción.
5. **Para el login:** no hay nada más que hacer — en cuanto completes el paso 3, los
   botones "Iniciar sesión" / "Crear cuenta" del sitio ya funcionan con email y
   contraseña. Supabase envía el email de confirmación automáticamente.

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

## 4. Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores de los pasos anteriores:

```bash
cp .env.example .env.local
```

En Vercel (o donde despliegues), cargá las mismas variables en
**Project Settings → Environment Variables**.

## 5. Publicar el sitio

La forma más simple es [Vercel](https://vercel.com): conectá el repo de GitHub,
pegá las variables de entorno del paso 4, y listo — cada push a la rama principal
actualiza el sitio en vivo.
