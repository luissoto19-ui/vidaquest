// Mascotas que acompañan al personaje.
// - precio: se compran con monedas en la tienda (pestaña Estilo → Mascotas)
// - logro: no se compran, se ganan al desbloquear ese logro
// - color / color2: colores principales del dibujo (ver src/components/Mascota.js)

export const MASCOTAS = [
  { id: 'perro', especie: 'Perrito', emoji: '🐶', precio: 300, color: '#C68B59', color2: '#7A4E2D' },
  { id: 'gato', especie: 'Gatito', emoji: '🐱', precio: 300, color: '#F2A65A', color2: '#C9773A' },
  { id: 'pato', especie: 'Patito', emoji: '🐥', precio: 350, color: '#F7D046', color2: '#F28C28' },
  { id: 'conejo', especie: 'Conejo', emoji: '🐰', precio: 400, color: '#F4F1EE', color2: '#F7A8C0' },
  { id: 'panda', especie: 'Panda', emoji: '🐼', precio: 600, color: '#FFFFFF', color2: '#2B2B33' },
  { id: 'zorro', especie: 'Zorro', emoji: '🦊', precio: 800, color: '#E8743B', color2: '#FFFFFF' },
  { id: 'buho', especie: 'Búho', emoji: '🦉', logro: 'sabio', color: '#9C7A54', color2: '#F2E3C6' },
  { id: 'dragon', especie: 'Dragón', emoji: '🐲', logro: 'racha_30', color: '#3FB37F', color2: '#BFF0C8' },
];

export const MASCOTAS_POR_ID = Object.fromEntries(MASCOTAS.map((m) => [m.id, m]));

// Accesorios para la mascota (se compran una vez y se pueden poner en cualquier mascota).
export const ACCESORIOS_MASCOTA = [
  { id: 'am_mono', nombre: 'Moño', emoji: '🎀', precio: 50 },
  { id: 'am_collar', nombre: 'Collar', emoji: '📿', precio: 60 },
  { id: 'am_sombrero', nombre: 'Gorro de fiesta', emoji: '🥳', precio: 80 },
  { id: 'am_lentes', nombre: 'Lentes', emoji: '👓', precio: 90 },
  { id: 'am_corona', nombre: 'Mini corona', emoji: '👑', precio: 150 },
];

export const ACCESORIOS_MASCOTA_POR_ID = Object.fromEntries(ACCESORIOS_MASCOTA.map((a) => [a.id, a]));

// La mascota gana experiencia cuando completas misiones con ella activa.
export const XP_MASCOTA_POR_NIVEL = 100;
export const nivelMascota = (xp) => Math.floor(xp / XP_MASCOTA_POR_NIVEL) + 1;

export const nuevaMascota = (id) => ({ nombre: MASCOTAS_POR_ID[id].especie, xp: 0, accesorio: null });

export const TEXTO_ANIMO_MASCOTA = {
  feliz: '¡Está feliz contigo!',
  normal: 'Está tranquila',
  dormido: 'Se quedó dormida… cumple una misión para despertarla',
  triste: 'Te extraña… ¡vuelve a cumplir misiones!',
};
