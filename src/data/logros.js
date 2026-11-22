// Logros: metas especiales que dan monedas y a veces ropa exclusiva.
// "cumple" recibe el estado del juego y regresa true cuando se desbloquea.
// "progreso" (opcional) regresa [actual, meta] para mostrar cuánto falta.
import { LISTA_AREAS } from '../tema';
import { calcularNivel } from '../utils/juego';
import { LISTA_CUADRANTES } from './foda';
import { ITEMS_POR_ID } from './tienda';

const min = (a, b) => Math.min(a, b);
const barraMinima = (e) => Math.min(...LISTA_AREAS.map((a) => e.barras[a]));

export const LOGROS = [
  { id: 'primer_paso', emoji: '👣', nombre: 'Primer paso', descripcion: 'Completa tu primera misión', monedas: 20,
    progreso: (e) => [min(e.stats.total, 1), 1] },
  { id: 'conocete', emoji: '🪞', nombre: 'Conócete a ti mismo', descripcion: 'Llena los 4 cuadros de tu FODA', monedas: 40,
    progreso: (e) => [LISTA_CUADRANTES.filter((c) => e.foda[c].length > 0).length, 4] },
  { id: 'constante', emoji: '📅', nombre: 'Constante', descripcion: 'Completa 10 misiones', monedas: 50,
    progreso: (e) => [min(e.stats.total, 10), 10] },
  { id: 'racha_3', emoji: '🔥', nombre: 'En llamas', descripcion: 'Cumple misiones 3 días seguidos', monedas: 30,
    progreso: (e) => [min(e.racha.mejor || 0, 3), 3] },
  { id: 'racha_7', emoji: '👑', nombre: 'Rey de la semana', descripcion: 'Cumple misiones 7 días seguidos', monedas: 80, item: 'acc_corona',
    progreso: (e) => [min(e.racha.mejor || 0, 7), 7] },
  { id: 'atleta', emoji: '🏃', nombre: 'Atleta', descripcion: 'Completa 15 misiones de Salud', monedas: 60, item: 'pant_deportivo_rojo',
    progreso: (e) => [min(e.stats.salud, 15), 15] },
  { id: 'corazon', emoji: '💞', nombre: 'Corazón de oro', descripcion: 'Completa 15 misiones de Amor', monedas: 60, item: 'acc_collar',
    progreso: (e) => [min(e.stats.amor, 15), 15] },
  { id: 'ahorrador', emoji: '🏦', nombre: 'Ahorrador', descripcion: 'Completa 15 misiones de Dinero', monedas: 60, item: 'camisa_traje',
    progreso: (e) => [min(e.stats.dinero, 15), 15] },
  { id: 'sabio', emoji: '📚', nombre: 'Sabio', descripcion: 'Completa 15 misiones de Inteligencia', monedas: 60, item: 'camisa_sudadera_morada',
    progreso: (e) => [min(e.stats.inteligencia, 15), 15] },
  { id: 'fashion', emoji: '🛍️', nombre: 'A la moda', descripcion: 'Compra tu primera prenda', monedas: 20,
    progreso: (e) => [min(e.stats.compras, 1), 1] },
  { id: 'nivel_5', emoji: '⭐', nombre: 'Nivel 5', descripcion: 'Llega al nivel 5', monedas: 100,
    progreso: (e) => [min(calcularNivel(e.xp), 5), 5] },
  { id: 'imparable', emoji: '🦸', nombre: 'Imparable', descripcion: 'Completa 50 misiones', monedas: 150, item: 'acc_capa',
    progreso: (e) => [min(e.stats.total, 50), 50] },
  { id: 'equilibrio', emoji: '⚖️', nombre: 'Vida equilibrada', descripcion: 'Ten las 4 barras arriba de 70', monedas: 150,
    progreso: (e) => [min(barraMinima(e), 70), 70] },
  { id: 'coleccionista', emoji: '🧥', nombre: 'Coleccionista', descripcion: 'Compra 8 prendas', monedas: 100,
    progreso: (e) => [min(e.stats.compras, 8), 8] },
  { id: 'racha_30', emoji: '🌋', nombre: 'Hábito de acero', descripcion: 'Cumple misiones 30 días seguidos', monedas: 300,
    progreso: (e) => [min(e.racha.mejor || 0, 30), 30] },
  { id: 'nivel_10', emoji: '🌟', nombre: 'Nivel 10', descripcion: 'Llega al nivel 10', monedas: 200,
    progreso: (e) => [min(calcularNivel(e.xp), 10), 10] },
  { id: 'leyenda', emoji: '🏆', nombre: 'Leyenda', descripcion: 'Completa 150 misiones', monedas: 400,
    progreso: (e) => [min(e.stats.total, 150), 150] },
  { id: 'maestro', emoji: '🧘', nombre: 'Maestro de la vida', descripcion: 'Ten las 4 barras arriba de 90', monedas: 300,
    progreso: (e) => [min(barraMinima(e), 90), 90] },
];

const cumple = (logro, e) => {
  const [actual, meta] = logro.progreso(e);
  return actual >= meta;
};

// Revisa si se desbloqueó algún logro nuevo y entrega sus premios.
export function aplicarLogros(estado) {
  const nuevos = LOGROS.filter((l) => !estado.logros.includes(l.id) && cumple(l, estado));
  if (nuevos.length === 0) return estado;

  let { monedas, inventario, logros, avisos } = estado;
  inventario = [...inventario];
  avisos = [...avisos];
  logros = [...logros];
  for (const l of nuevos) {
    logros.push(l.id);
    monedas += l.monedas;
    let texto = `🏆 ¡Logro: ${l.nombre}! +${l.monedas} 🪙`;
    if (l.item && !inventario.includes(l.item)) {
      inventario.push(l.item);
      texto += ` y ganaste: ${ITEMS_POR_ID[l.item].nombre}`;
    }
    avisos.push(texto);
  }
  return { ...estado, monedas, inventario, logros, avisos };
}
