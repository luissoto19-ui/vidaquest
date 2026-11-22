// Todas las misiones del juego.
// - area: qué barra sube al completarla
// - tipo: 'diaria' o 'semanal'
// - tags: se cruzan con las debilidades del FODA para recomendarte misiones "Para ti"
import { LISTA_AREAS } from '../tema';

export const MISIONES = [
  // ---------- SALUD ----------
  { id: 's1', area: 'salud', tipo: 'diaria', titulo: 'Toma 8 vasos de agua', descripcion: 'Tu cuerpo es 60% agua. ¡Recárgalo!', tags: ['alimentacion'] },
  { id: 's2', area: 'salud', tipo: 'diaria', titulo: 'Camina 20 minutos', descripcion: 'Puede ser a la tienda, en el parque o en tu casa.', tags: ['ejercicio'] },
  { id: 's3', area: 'salud', tipo: 'diaria', titulo: 'Duerme 7 horas o más', descripcion: 'Acuéstate a una hora fija esta noche.', tags: ['sueno'] },
  { id: 's4', area: 'salud', tipo: 'diaria', titulo: 'Come una fruta o verdura', descripcion: 'Cámbiala por un snack de bolsita.', tags: ['alimentacion'] },
  { id: 's5', area: 'salud', tipo: 'diaria', titulo: '5 minutos de respiración', descripcion: 'Inhala 4 segundos, sostén 4, exhala 4. Repite.', tags: ['estres'] },
  { id: 's6', area: 'salud', tipo: 'diaria', titulo: 'Estírate 10 minutos', descripcion: 'Cuello, espalda y piernas. Tu cuerpo te lo agradecerá.', tags: ['ejercicio'] },
  { id: 's7', area: 'salud', tipo: 'diaria', titulo: 'Una hora sin celular antes de dormir', descripcion: 'La luz de la pantalla no te deja descansar.', tags: ['sueno', 'celular'] },
  { id: 's8', area: 'salud', tipo: 'diaria', titulo: 'Escribe 3 cosas que agradeces', descripcion: 'Agradecer baja el estrés y mejora tu ánimo.', tags: ['estres'] },
  { id: 's9', area: 'salud', tipo: 'diaria', titulo: 'Haz 20 sentadillas', descripcion: 'Puedes dividirlas en 2 rondas de 10.', tags: ['ejercicio'] },
  { id: 'sw1', area: 'salud', tipo: 'semanal', titulo: 'Haz ejercicio 3 veces esta semana', descripcion: '30 minutos cada vez: correr, bailar, bici, lo que te guste.', tags: ['ejercicio'] },
  { id: 'sw2', area: 'salud', tipo: 'semanal', titulo: 'Cocina una comida saludable', descripcion: 'Busca una receta sencilla y prepárala tú.', tags: ['alimentacion'] },
  { id: 'sw3', area: 'salud', tipo: 'semanal', titulo: 'Pasa una tarde al aire libre', descripcion: 'Sol, aire y nada de pantallas por un rato.', tags: ['estres', 'celular'] },

  // ---------- AMOR ----------
  { id: 'a1', area: 'amor', tipo: 'diaria', titulo: 'Manda un mensaje bonito', descripcion: 'A alguien que quieras, sin ninguna razón especial.', tags: ['socializar'] },
  { id: 'a2', area: 'amor', tipo: 'diaria', titulo: 'Llama a un familiar', descripcion: 'Aunque sean 5 minutos. Pregúntale cómo está.', tags: ['familia'] },
  { id: 'a3', area: 'amor', tipo: 'diaria', titulo: 'Haz un cumplido sincero', descripcion: 'A un amigo, compañero o a quien te atienda en una tienda.', tags: ['socializar'] },
  { id: 'a4', area: 'amor', tipo: 'diaria', titulo: '15 minutos solo para ti', descripcion: 'Haz algo que disfrutes: música, dibujar, un baño largo.', tags: ['amorpropio', 'estres'] },
  { id: 'a5', area: 'amor', tipo: 'diaria', titulo: 'Ayuda a alguien', descripcion: 'Sin que te lo pidan. Un favor pequeño cuenta.', tags: ['socializar', 'familia'] },
  { id: 'a6', area: 'amor', tipo: 'diaria', titulo: 'Come sin celular', descripcion: 'Platica con quien estés comiendo.', tags: ['familia', 'celular'] },
  { id: 'a7', area: 'amor', tipo: 'diaria', titulo: 'Escribe algo bueno de ti', descripcion: 'Una cualidad tuya o algo que hiciste bien hoy.', tags: ['amorpropio'] },
  { id: 'a8', area: 'amor', tipo: 'diaria', titulo: 'Abraza a alguien', descripcion: 'Un abrazo de verdad, de los largos.', tags: ['familia'] },
  { id: 'aw1', area: 'amor', tipo: 'semanal', titulo: 'Sal con un amigo o amiga', descripcion: 'Un café, una caminata o un juego juntos.', tags: ['socializar'] },
  { id: 'aw2', area: 'amor', tipo: 'semanal', titulo: 'Visita a un familiar', descripcion: 'A tus abuelos, tíos o primos que hace mucho no ves.', tags: ['familia'] },
  { id: 'aw3', area: 'amor', tipo: 'semanal', titulo: 'Platica con alguien nuevo', descripcion: 'Conocer gente nueva abre puertas.', tags: ['socializar'] },

  // ---------- DINERO ----------
  { id: 'd1', area: 'dinero', tipo: 'diaria', titulo: 'Anota todos tus gastos de hoy', descripcion: 'En una libreta o en las notas del celular.', tags: ['gastos', 'organizacion'] },
  { id: 'd2', area: 'dinero', tipo: 'diaria', titulo: 'Cero compras innecesarias', descripcion: 'Antes de comprar pregúntate: ¿lo necesito o solo lo quiero?', tags: ['gastos'] },
  { id: 'd3', area: 'dinero', tipo: 'diaria', titulo: 'Guarda algo en tu alcancía', descripcion: 'Aunque sean $10 o $20. Lo importante es el hábito.', tags: ['ahorro'] },
  { id: 'd4', area: 'dinero', tipo: 'diaria', titulo: 'Aprende algo de finanzas', descripcion: '10 minutos de un video o artículo sobre ahorro o inversión.', tags: ['ahorro', 'lectura'] },
  { id: 'd5', area: 'dinero', tipo: 'diaria', titulo: 'Lleva tu comida o snack', descripcion: 'En vez de comprar en la calle.', tags: ['gastos', 'alimentacion'] },
  { id: 'd6', area: 'dinero', tipo: 'diaria', titulo: 'Revisa tus suscripciones', descripcion: '¿Pagas algo que ya no usas? Cancélalo.', tags: ['gastos'] },
  { id: 'd7', area: 'dinero', tipo: 'diaria', titulo: 'Piensa una idea para ganar dinero extra', descripcion: '¿Qué sabes hacer que otros pagarían?', tags: ['ingresos'] },
  { id: 'dw1', area: 'dinero', tipo: 'semanal', titulo: 'Haz tu presupuesto de la semana', descripcion: 'Cuánto entra, cuánto sale y cuánto vas a ahorrar.', tags: ['gastos', 'organizacion'] },
  { id: 'dw2', area: 'dinero', tipo: 'semanal', titulo: 'Vende algo que ya no uses', descripcion: 'Ropa, juegos, cosas guardadas. ¡Dinero extra!', tags: ['ingresos'] },
  { id: 'dw3', area: 'dinero', tipo: 'semanal', titulo: 'Ahorra el 10% de lo que recibiste', descripcion: 'Págate primero a ti.', tags: ['ahorro'] },

  // ---------- INTELIGENCIA ----------
  { id: 'i1', area: 'inteligencia', tipo: 'diaria', titulo: 'Lee 10 páginas', descripcion: 'De un libro, no de redes sociales 😉', tags: ['lectura', 'celular'] },
  { id: 'i2', area: 'inteligencia', tipo: 'diaria', titulo: 'Aprende 5 palabras en otro idioma', descripcion: 'Inglés, francés, japonés… ¡el que quieras!', tags: [] },
  { id: 'i3', area: 'inteligencia', tipo: 'diaria', titulo: 'Ve un video educativo', descripcion: 'Ciencia, historia, programación, cocina…', tags: ['celular'] },
  { id: 'i4', area: 'inteligencia', tipo: 'diaria', titulo: 'Estudia 25 minutos sin distracciones', descripcion: 'Celular lejos. Al terminar, descansa 5 minutos.', tags: ['procrastinar', 'celular'] },
  { id: 'i5', area: 'inteligencia', tipo: 'diaria', titulo: 'Haz primero la tarea más difícil', descripcion: 'Quítate lo pesado temprano y el resto será fácil.', tags: ['procrastinar'] },
  { id: 'i6', area: 'inteligencia', tipo: 'diaria', titulo: 'Resuelve un acertijo o sudoku', descripcion: 'Ejercita tu cerebro como un músculo.', tags: [] },
  { id: 'i7', area: 'inteligencia', tipo: 'diaria', titulo: 'Escribe la lista de tu día', descripcion: '3 cosas importantes que vas a hacer hoy.', tags: ['organizacion', 'procrastinar'] },
  { id: 'i8', area: 'inteligencia', tipo: 'diaria', titulo: 'Escribe lo que aprendiste hoy', descripcion: 'Una frase. Escribir ayuda a recordar.', tags: ['lectura'] },
  { id: 'iw1', area: 'inteligencia', tipo: 'semanal', titulo: 'Termina un capítulo o curso corto', descripcion: 'Algo que empezaste y no habías terminado.', tags: ['lectura', 'procrastinar'] },
  { id: 'iw2', area: 'inteligencia', tipo: 'semanal', titulo: 'Aprende a hacer algo nuevo', descripcion: 'Una receta, un truco, una habilidad.', tags: [] },
  { id: 'iw3', area: 'inteligencia', tipo: 'semanal', titulo: 'Limpia y organiza tu espacio', descripcion: 'Escritorio o cuarto ordenado = mente ordenada.', tags: ['organizacion'] },
];

export const MISIONES_POR_ID = Object.fromEntries(MISIONES.map((m) => [m.id, m]));

// Lo que ganas al completar una misión.
export const RECOMPENSAS = {
  diaria: { barra: 6, monedas: 10, xp: 15 },
  semanal: { barra: 15, monedas: 35, xp: 50 },
};

// ----- Cómo se escogen las misiones de cada día -----

export function tagsDelUsuario(foda) {
  return (foda?.debilidades || []).map((d) => d.tag).filter(Boolean);
}

export function esParaTi(mision, foda) {
  const tags = tagsDelUsuario(foda);
  return mision.tags.some((t) => tags.includes(t));
}

// Elige al azar, pero las misiones "para ti" tienen 4 veces más probabilidad.
function elegir(candidatas, foda) {
  const pesos = candidatas.map((m) => (esParaTi(m, foda) ? 4 : 1));
  const total = pesos.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidatas.length; i++) {
    r -= pesos[i];
    if (r <= 0) return candidatas[i];
  }
  return candidatas[candidatas.length - 1];
}

function areasOrdenadasDeMenorAMayor(barras) {
  return [...LISTA_AREAS].sort((a, b) => barras[a] - barras[b]);
}

// 1 misión diaria por área + 1 extra del área más baja = 5 al día.
export function generarDiarias({ barras, foda }) {
  const pool = MISIONES.filter((m) => m.tipo === 'diaria');
  const elegidas = [];
  for (const area of LISTA_AREAS) {
    elegidas.push(elegir(pool.filter((m) => m.area === area), foda).id);
  }
  const masBaja = areasOrdenadasDeMenorAMayor(barras)[0];
  const extra = pool.filter((m) => m.area === masBaja && !elegidas.includes(m.id));
  if (extra.length) elegidas.push(elegir(extra, foda).id);
  return elegidas;
}

// 3 misiones semanales enfocadas en tus 3 áreas más bajas.
export function generarSemanales({ barras, foda }) {
  const pool = MISIONES.filter((m) => m.tipo === 'semanal');
  return areasOrdenadasDeMenorAMayor(barras)
    .slice(0, 3)
    .map((area) => elegir(pool.filter((m) => m.area === area), foda).id);
}
