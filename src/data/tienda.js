// Ropa, peinados y accesorios para personalizar al personaje.
// - precio 0  => gratis desde el inicio
// - logro: 'id' => no se compra, se gana al desbloquear ese logro
// - estilo: cómo se dibuja (ver src/components/Personaje.js)

export const CATEGORIAS = {
  peinado: { nombre: 'Peinado', emoji: '💇' },
  camisa: { nombre: 'Camisa', emoji: '👕' },
  pantalon: { nombre: 'Pantalón', emoji: '👖' },
  zapatos: { nombre: 'Zapatos', emoji: '👟' },
  accesorio: { nombre: 'Accesorio', emoji: '🕶️' },
};

export const ITEMS = [
  // Peinados (el color se elige aparte)
  { id: 'pelo_corto', categoria: 'peinado', nombre: 'Corto', estilo: 'corto', precio: 0 },
  { id: 'pelo_largo', categoria: 'peinado', nombre: 'Largo', estilo: 'largo', precio: 0 },
  { id: 'pelo_calvo', categoria: 'peinado', nombre: 'Rapado', estilo: 'calvo', precio: 0 },
  { id: 'pelo_chongo', categoria: 'peinado', nombre: 'Chongo', estilo: 'chongo', precio: 40 },
  { id: 'pelo_rizado', categoria: 'peinado', nombre: 'Rizado', estilo: 'rizado', precio: 60 },
  { id: 'pelo_coletas', categoria: 'peinado', nombre: 'Coletas', estilo: 'coletas', precio: 60 },
  { id: 'pelo_mohicano', categoria: 'peinado', nombre: 'Mohicano', estilo: 'mohicano', precio: 100 },

  // Camisas
  { id: 'camisa_playera_azul', categoria: 'camisa', nombre: 'Playera azul', estilo: 'playera', color: '#4A90E2', precio: 0 },
  { id: 'camisa_playera_blanca', categoria: 'camisa', nombre: 'Playera blanca', estilo: 'playera', color: '#F7F7F7', precio: 0 },
  { id: 'camisa_playera_roja', categoria: 'camisa', nombre: 'Playera roja', estilo: 'playera', color: '#E74C3C', precio: 30 },
  { id: 'camisa_playera_verde', categoria: 'camisa', nombre: 'Playera verde', estilo: 'playera', color: '#27AE60', precio: 30 },
  { id: 'camisa_playera_amarilla', categoria: 'camisa', nombre: 'Playera amarilla', estilo: 'playera', color: '#F7C948', precio: 40 },
  { id: 'camisa_celeste', categoria: 'camisa', nombre: 'Camisa celeste', estilo: 'camisa', color: '#9BD3F5', precio: 60 },
  { id: 'camisa_blanca', categoria: 'camisa', nombre: 'Camisa blanca', estilo: 'camisa', color: '#FFFFFF', precio: 60 },
  { id: 'camisa_sudadera_gris', categoria: 'camisa', nombre: 'Sudadera gris', estilo: 'sudadera', color: '#8E8E9A', precio: 80 },
  { id: 'camisa_sudadera_morada', categoria: 'camisa', nombre: 'Sudadera del sabio', estilo: 'sudadera', color: '#7B4FE0', precio: 0, logro: 'sabio' },
  { id: 'camisa_traje', categoria: 'camisa', nombre: 'Traje elegante', estilo: 'traje', color: '#2C2C3A', precio: 0, logro: 'ahorrador' },

  // Pantalones
  { id: 'pant_jeans_azul', categoria: 'pantalon', nombre: 'Jeans', estilo: 'jeans', color: '#3E5C99', precio: 0 },
  { id: 'pant_deportivo_gris', categoria: 'pantalon', nombre: 'Pants gris', estilo: 'deportivo', color: '#6B6B78', precio: 0 },
  { id: 'pant_short', categoria: 'pantalon', nombre: 'Short beige', estilo: 'short', color: '#D2B48C', precio: 30 },
  { id: 'pant_falda_roja', categoria: 'pantalon', nombre: 'Falda roja', estilo: 'falda', color: '#D64555', precio: 50 },
  { id: 'pant_falda_negra', categoria: 'pantalon', nombre: 'Falda negra', estilo: 'falda', color: '#2E2E38', precio: 50 },
  { id: 'pant_jeans_negro', categoria: 'pantalon', nombre: 'Jeans negros', estilo: 'jeans', color: '#2A2A33', precio: 60 },
  { id: 'pant_deportivo_rojo', categoria: 'pantalon', nombre: 'Pants de atleta', estilo: 'deportivo', color: '#C0392B', precio: 0, logro: 'atleta' },

  // Zapatos
  { id: 'zap_tenis_blancos', categoria: 'zapatos', nombre: 'Tenis blancos', estilo: 'tenis', color: '#F2F2F2', precio: 0 },
  { id: 'zap_tenis_negros', categoria: 'zapatos', nombre: 'Tenis negros', estilo: 'tenis', color: '#2B2B2B', precio: 30 },
  { id: 'zap_tenis_rojos', categoria: 'zapatos', nombre: 'Tenis rojos', estilo: 'tenis', color: '#E74C3C', precio: 50 },
  { id: 'zap_botas', categoria: 'zapatos', nombre: 'Botas cafés', estilo: 'botas', color: '#7A4B2A', precio: 70 },
  { id: 'zap_tenis_dorados', categoria: 'zapatos', nombre: 'Tenis dorados', estilo: 'tenis', color: '#E8B923', precio: 200 },

  // Accesorios
  { id: 'acc_lentes', categoria: 'accesorio', nombre: 'Lentes', estilo: 'lentes', color: '#2B2541', precio: 50 },
  { id: 'acc_gorra_roja', categoria: 'accesorio', nombre: 'Gorra roja', estilo: 'gorra', color: '#E74C3C', precio: 60 },
  { id: 'acc_gorra_azul', categoria: 'accesorio', nombre: 'Gorra azul', estilo: 'gorra', color: '#3D6FD9', precio: 60 },
  { id: 'acc_audifonos', categoria: 'accesorio', nombre: 'Audífonos', estilo: 'audifonos', color: '#6C4CF1', precio: 90 },
  { id: 'acc_reloj', categoria: 'accesorio', nombre: 'Reloj', estilo: 'reloj', color: '#34495E', precio: 80 },
  { id: 'acc_collar', categoria: 'accesorio', nombre: 'Collar de corazón', estilo: 'collar', color: '#F5B700', precio: 0, logro: 'corazon' },
  { id: 'acc_corona', categoria: 'accesorio', nombre: 'Corona', estilo: 'corona', color: '#F5B700', precio: 0, logro: 'racha_7' },
  { id: 'acc_capa', categoria: 'accesorio', nombre: 'Capa de héroe', estilo: 'capa', color: '#C0392B', precio: 0, logro: 'imparable' },
];

export const ITEMS_POR_ID = Object.fromEntries(ITEMS.map((i) => [i.id, i]));

export const ITEMS_GRATIS = ITEMS.filter((i) => i.precio === 0 && !i.logro).map((i) => i.id);

// Estos se eligen libremente (no se compran).
export const PIELES = ['#FFE0C4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#5C3A1E'];
export const COLORES_PELO = ['#1C1C1C', '#3B2314', '#7B4A26', '#C98B3C', '#F2D16B', '#B5462F', '#9AA0A6', '#7B4FE0', '#2F9BD6', '#E85D9E'];
