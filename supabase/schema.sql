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
insert into public.properties (id, zone, title, price, match, available, individual_or_pareja, worker_or_student, photos, color_from, color_to, amenities, description)
values
  ('ruzafa-3a', 'Ruzafa', 'Habitación Premium · Ruzafa', 750, 94, '01/10/2026', 'ambos', 'ambos', 12, '#BFD9FF', '#DCE9FF', array['WiFi','A/C','Escritorio','Lavadora','Ascensor','Balcón'], 'Habitación exterior con balcón en un piso reformado a dos calles del Mercado de Ruzafa.'),
  ('benimaclet-1c', 'Benimaclet', 'Habitación exterior · Benimaclet', 680, 89, '15/10/2026', 'individual', 'estudiante', 9, '#E4D9FF', '#F0E9FF', array['WiFi','Escritorio','Lavadora','Terraza compartida'], 'A diez minutos a pie de la Universitat de València y la Politècnica.'),
  ('mestalla-2b', 'Mestalla', 'Habitación luminosa · Mestalla', 720, 86, '01/11/2026', 'pareja', 'trabajador', 10, '#BFEBE0', '#DFF7EF', array['WiFi','A/C','Lavadora','Ascensor'], 'Piso con mucha luz natural en una calle tranquila detrás del Mestalla.'),
  ('el-carmen-4d', 'El Carmen', 'Habitación con encanto · El Carmen', 820, 82, '01/10/2026', 'ambos', 'ambos', 14, '#FFD9CF', '#FFEAE4', array['WiFi','A/C','Escritorio','Balcón','Ascensor'], 'En pleno casco histórico, en un edificio del siglo XIX restaurado.')
on conflict (id) do nothing;

-- Si ya habías corrido una versión anterior de este schema (con columna `pet`),
-- ejecutá esto una vez para sacarla:
-- alter table public.properties drop column if exists pet;
