// Colores y estilos generales de la app. Si quieres cambiar el "look", empieza aquí.
export const COLORES = {
  fondo: '#F4F1FF',
  tarjeta: '#FFFFFF',
  primario: '#6C4CF1',
  primarioClaro: '#E7E0FF',
  texto: '#2B2541',
  textoSuave: '#7A7391',
  borde: '#E4DEF7',
  oro: '#F5B700',
  exito: '#2ECC71',
};

// Las 4 barras de la vida del jugador.
export const AREAS = {
  salud: {
    nombre: 'Salud',
    emoji: '💪',
    color: '#2ECC71',
    descripcion: 'Cuerpo y mente',
    consejo: 'Toma agua, muévete un poco y duerme bien. Tu mente también es salud: respira y descansa.',
  },
  amor: {
    nombre: 'Amor',
    emoji: '❤️',
    color: '#FF5C8A',
    descripcion: 'Familia, amigos y amor propio',
    consejo: 'Escríbele a alguien que quieras o dedícate un rato solo a ti. Las relaciones se riegan como plantas.',
  },
  dinero: {
    nombre: 'Dinero',
    emoji: '💰',
    color: '#F5B700',
    descripcion: 'Ahorro, gastos e ingresos',
    consejo: 'Anota en qué gastas hoy. Lo que no se mide no se puede mejorar.',
  },
  inteligencia: {
    nombre: 'Inteligencia',
    emoji: '🧠',
    color: '#3D8BFF',
    descripcion: 'Aprender, leer y organizarte',
    consejo: 'Lee 10 páginas o aprende algo nuevo. 10 minutos diarios suman 60 horas al año.',
  },
};

export const LISTA_AREAS = ['salud', 'amor', 'dinero', 'inteligencia'];

export const SOMBRA = {
  shadowColor: '#6C4CF1',
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
};
