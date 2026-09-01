-- Ejecutá esto una vez en Supabase: Dashboard → SQL Editor → New query → pegar y "Run".
-- Después de correrlo, ya podés agregar/editar habitaciones sin código desde
-- Dashboard → Table Editor → properties → Insert row.

create table if not exists public.properties (
  id text primary key,
  zone text not null,
  title text not null,
  price numeric not null,
  match int not null default 90,
  available text not null,             -- formato dd/mm/aaaa, ej: 01/10/2026
  individual_or_pareja text not null default 'ambos', -- 'individual' | 'pareja' | 'ambos'
  worker_or_student text not null default 'ambos',    -- 'trabajador' | 'estudiante' | 'ambos'
  photos int not null default 1,
  color_from text not null default '#BFD9FF',
  color_to text not null default '#DCE9FF',
  amenities text[] not null default '{}',
  description text not null default '',
  manager text not null default 'Equipo VIVI',
  response_time text not null default 'Responde en menos de 24 horas',
  created_at timestamptz not null default now()
);

alter table public.properties enable row level security;

-- Cualquiera puede ver el catálogo (es público, como en la web).
create policy "properties are publicly readable"
  on public.properties for select
  using (true);

-- Solo usuarios logueados pueden crear/editar/borrar propiedades.
-- Si preferís que solo tu equipo (no cualquier usuario registrado) administre el
-- catálogo, cambiá esta policy para chequear un rol/lista de emails de admin.
create policy "authenticated users manage properties"
  on public.properties for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Datos de ejemplo (podés borrarlos desde el Table Editor cuando cargues los tuyos).
insert into public.properties (id, zone, title, price, match, available, individual_or_pareja, worker_or_student, photos, color_from, color_to, amenities, description, manager, response_time)
values
  ('ruzafa-3a', 'Ruzafa', 'Habitación Premium con balcón', 750, 94, '01/10/2026', 'ambos', 'ambos', 12, '#BFD9FF', '#DCE9FF', array['WiFi de 300Mb','Aire acondicionado','Escritorio','Lavadora','Ascensor','Balcón propio'], 'Habitación exterior con balcón en un piso reformado a dos calles del Mercado de Ruzafa.', 'Alba', 'Responde en menos de 2 horas'),
  ('benimaclet-1c', 'Benimaclet', 'Habitación exterior junto al campus', 680, 89, '15/10/2026', 'individual', 'estudiante', 9, '#E4D9FF', '#F0E9FF', array['WiFi de 300Mb','Escritorio','Lavadora','Terraza compartida'], 'A diez minutos a pie de la Universitat de València y la Politècnica.', 'Marc', 'Responde en menos de 4 horas'),
  ('mestalla-2b', 'Mestalla', 'Habitación luminosa cerca del estadio', 720, 86, '01/11/2026', 'pareja', 'trabajador', 10, '#BFEBE0', '#DFF7EF', array['WiFi de 300Mb','Aire acondicionado','Lavadora','Ascensor'], 'Piso con mucha luz natural en una calle tranquila detrás del Mestalla.', 'Alba', 'Responde en menos de 2 horas'),
  ('el-carmen-4d', 'El Carmen', 'Habitación con encanto en el Carmen', 820, 82, '01/10/2026', 'ambos', 'ambos', 14, '#FFD9CF', '#FFEAE4', array['WiFi de 300Mb','Aire acondicionado','Escritorio','Balcón propio','Ascensor'], 'En pleno casco histórico, en un edificio del siglo XIX restaurado.', 'Nuria', 'Responde en menos de 1 hora'),
  ('extramurs-2a', 'Extramurs', 'Habitación individual, piso tranquilo', 650, 91, '01/10/2026', 'individual', 'ambos', 8, '#D9E8FF', '#EAF2FF', array['WiFi de 300Mb','Escritorio','Lavadora','Calefacción'], 'Barrio residencial y bien conectado, a cinco paradas de metro del centro.', 'Marc', 'Responde en menos de 4 horas'),
  ('camins-3c', 'Camins al Grau', 'Habitación doble cerca de la playa', 770, 88, '20/10/2026', 'pareja', 'trabajador', 11, '#FFE3B0', '#FFF1D6', array['WiFi de 300Mb','Aire acondicionado','Lavadora','Terraza compartida','Ascensor'], 'A quince minutos caminando de la playa de la Malvarrosa.', 'Nuria', 'Responde en menos de 1 hora'),
  ('patraix-1b', 'Patraix', 'Habitación económica, piso reformado', 660, 79, '05/11/2026', 'individual', 'ambos', 7, '#D6F0E0', '#EAF8EF', array['WiFi de 300Mb','Lavadora','Calefacción'], 'Zona residencial con buen precio y todos los servicios cerca.', 'Alba', 'Responde en menos de 2 horas'),
  ('algiros-2d', 'Algirós', 'Habitación junto a la Politècnica', 700, 90, '01/10/2026', 'individual', 'estudiante', 9, '#E8DBFF', '#F3ECFF', array['WiFi de 300Mb','Escritorio','Aire acondicionado','Ascensor'], 'A cinco minutos de la Universitat Politècnica de València.', 'Marc', 'Responde en menos de 4 horas'),
  ('malvarrosa-5a', 'Malvarrosa', 'Habitación frente al mar', 830, 85, '10/10/2026', 'pareja', 'trabajador', 13, '#C9EAFB', '#E3F5FD', array['WiFi de 300Mb','Aire acondicionado','Balcón propio','Lavadora'], 'A metros del paseo marítimo, con vistas parciales al mar.', 'Nuria', 'Responde en menos de 1 hora')
on conflict (id) do nothing;

-- Si ya habías corrido una versión anterior de este schema, ejecutá esto una vez
-- para agregar las columnas nuevas y sacar la vieja columna `pet`:
-- alter table public.properties drop column if exists pet;
-- alter table public.properties add column if not exists manager text not null default 'Equipo VIVI';
-- alter table public.properties add column if not exists response_time text not null default 'Responde en menos de 24 horas';
