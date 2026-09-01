export type Room = {
  id: string;
  zone: string;
  title: string;
  price: number;
  match: number;
  available: string;
  individualOrPareja: 'individual' | 'pareja' | 'ambos';
  pet: boolean;
  workerOrStudent: 'trabajador' | 'estudiante' | 'ambos';
  photos: number;
  colorFrom: string;
  colorTo: string;
  amenities: string[];
};

export const rooms: Room[] = [
  {
    id: 'ruzafa-3a',
    zone: 'Ruzafa',
    title: 'Habitación Premium · Ruzafa',
    price: 750,
    match: 94,
    available: '01/10/2026',
    individualOrPareja: 'ambos',
    pet: true,
    workerOrStudent: 'ambos',
    photos: 12,
    colorFrom: '#BFD9FF',
    colorTo: '#DCE9FF',
    amenities: ['WiFi', 'A/C', 'Escritorio', 'Lavadora', 'Ascensor', 'Balcón'],
  },
  {
    id: 'benimaclet-1c',
    zone: 'Benimaclet',
    title: 'Habitación exterior · Benimaclet',
    price: 680,
    match: 89,
    available: '15/10/2026',
    individualOrPareja: 'individual',
    pet: false,
    workerOrStudent: 'estudiante',
    photos: 9,
    colorFrom: '#E4D9FF',
    colorTo: '#F0E9FF',
    amenities: ['WiFi', 'Escritorio', 'Lavadora', 'Terraza compartida'],
  },
  {
    id: 'mestalla-2b',
    zone: 'Mestalla',
    title: 'Habitación luminosa · Mestalla',
    price: 720,
    match: 86,
    available: '01/11/2026',
    individualOrPareja: 'pareja',
    pet: false,
    workerOrStudent: 'trabajador',
    photos: 10,
    colorFrom: '#BFEBE0',
    colorTo: '#DFF7EF',
    amenities: ['WiFi', 'A/C', 'Lavadora', 'Ascensor'],
  },
  {
    id: 'el-carmen-4d',
    zone: 'El Carmen',
    title: 'Habitación con encanto · El Carmen',
    price: 820,
    match: 82,
    available: '01/10/2026',
    individualOrPareja: 'ambos',
    pet: true,
    workerOrStudent: 'ambos',
    photos: 14,
    colorFrom: '#FFD9CF',
    colorTo: '#FFEAE4',
    amenities: ['WiFi', 'A/C', 'Escritorio', 'Balcón', 'Ascensor'],
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

export function calculateBookingTotal(monthlyPrice: number) {
  const deposit = monthlyPrice;
  const commission = Math.round(monthlyPrice * 0.05 * 100) / 100;
  const total = Math.round((deposit + commission) * 100) / 100;
  return { deposit, commission, total };
}
