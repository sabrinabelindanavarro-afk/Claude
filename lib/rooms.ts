export type Room = {
  id: string;
  zone: string;
  title: string;
  price: number;
  match: number;
  available: string;
  individualOrPareja: 'individual' | 'pareja' | 'ambos';
  workerOrStudent: 'trabajador' | 'estudiante' | 'ambos';
  photos: number;
  colorFrom: string;
  colorTo: string;
  amenities: string[];
  description: string;
};

export const MINIMUM_STAY_MONTHS = 6;
export const VIVI_COMMISSION_EUR = 50;

// Se usan mientras no haya una tabla `properties` en Supabase configurada
// (o como semilla para cargarlas ahí). Ver SETUP.md para subir las tuyas
// sin código desde el editor de tablas de Supabase.
export const mockRooms: Room[] = [
  {
    id: 'ruzafa-3a',
    zone: 'Ruzafa',
    title: 'Habitación Premium · Ruzafa',
    price: 750,
    match: 94,
    available: '01/10/2026',
    individualOrPareja: 'ambos',
    workerOrStudent: 'ambos',
    photos: 12,
    colorFrom: '#BFD9FF',
    colorTo: '#DCE9FF',
    amenities: ['WiFi', 'A/C', 'Escritorio', 'Lavadora', 'Ascensor', 'Balcón'],
    description:
      'Habitación exterior con balcón en un piso reformado a dos calles del Mercado de Ruzafa.',
  },
  {
    id: 'benimaclet-1c',
    zone: 'Benimaclet',
    title: 'Habitación exterior · Benimaclet',
    price: 680,
    match: 89,
    available: '15/10/2026',
    individualOrPareja: 'individual',
    workerOrStudent: 'estudiante',
    photos: 9,
    colorFrom: '#E4D9FF',
    colorTo: '#F0E9FF',
    amenities: ['WiFi', 'Escritorio', 'Lavadora', 'Terraza compartida'],
    description: 'A diez minutos a pie de la Universitat de València y la Politècnica.',
  },
  {
    id: 'mestalla-2b',
    zone: 'Mestalla',
    title: 'Habitación luminosa · Mestalla',
    price: 720,
    match: 86,
    available: '01/11/2026',
    individualOrPareja: 'pareja',
    workerOrStudent: 'trabajador',
    photos: 10,
    colorFrom: '#BFEBE0',
    colorTo: '#DFF7EF',
    amenities: ['WiFi', 'A/C', 'Lavadora', 'Ascensor'],
    description: 'Piso con mucha luz natural en una calle tranquila detrás del Mestalla.',
  },
  {
    id: 'el-carmen-4d',
    zone: 'El Carmen',
    title: 'Habitación con encanto · El Carmen',
    price: 820,
    match: 82,
    available: '01/10/2026',
    individualOrPareja: 'ambos',
    workerOrStudent: 'ambos',
    photos: 14,
    colorFrom: '#FFD9CF',
    colorTo: '#FFEAE4',
    amenities: ['WiFi', 'A/C', 'Escritorio', 'Balcón', 'Ascensor'],
    description: 'En pleno casco histórico, en un edificio del siglo XIX restaurado.',
  },
];

export function calculateBookingTotal(monthlyPrice: number) {
  const deposit = monthlyPrice;
  const commission = VIVI_COMMISSION_EUR;
  const total = Math.round((deposit + commission) * 100) / 100;
  return { deposit, commission, total };
}
