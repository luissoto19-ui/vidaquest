// Pequeñas funciones de ayuda para fechas, niveles y el ánimo del personaje.
import { LISTA_AREAS } from '../tema';

// ----- Fechas -----
// Guardamos los días como texto "2026-11-22" para compararlos fácil.
export function hoy(fecha = new Date()) {
  const y = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function ayer() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return hoy(d);
}

function aFecha(clave) {
  const [y, m, d] = clave.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function diasEntre(a, b) {
  return Math.round((aFecha(b) - aFecha(a)) / 86400000);
}

// El lunes de esta semana: identifica la semana para las misiones semanales.
export function claveSemana(fecha = new Date()) {
  const x = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return hoy(x);
}

export function diaDelAno(fecha = new Date()) {
  return Math.floor((fecha - new Date(fecha.getFullYear(), 0, 0)) / 86400000);
}

// ----- Niveles -----
export const XP_POR_NIVEL = 150;
export const calcularNivel = (xp) => Math.floor(xp / XP_POR_NIVEL) + 1;
export const xpEnNivel = (xp) => xp % XP_POR_NIVEL;

// ----- Ánimo del personaje según sus barras -----
export function promedioBarras(barras) {
  return LISTA_AREAS.reduce((s, a) => s + barras[a], 0) / LISTA_AREAS.length;
}

export function calcularAnimo(barras) {
  const p = promedioBarras(barras);
  if (p >= 60) return 'feliz';
  if (p >= 35) return 'normal';
  return 'triste';
}

// ----- Ánimo de la mascota según tu constancia -----
// feliz: hoy ya cumpliste algo o llevas 3+ días seguidos
// normal: llevas racha pero hoy aún no cumples nada
// dormido: perdiste la racha hace poco
// triste: llevas 3 días o más sin cumplir misiones
export function calcularAnimoMascota({ racha, diarias }) {
  if (diarias.hechas.length > 0 || racha.dias >= 3) return 'feliz';
  if (racha.dias >= 1) return 'normal';
  if (racha.ultimoDia && diasEntre(racha.ultimoDia, hoy()) >= 3) return 'triste';
  return 'dormido';
}

export function areaMasBaja(barras) {
  return [...LISTA_AREAS].sort((a, b) => barras[a] - barras[b])[0];
}
