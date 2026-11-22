// Opciones sugeridas para el FODA (Fortalezas, Oportunidades, Debilidades, Amenazas).
// Las debilidades tienen una "etiqueta" (tag): la app la usa para escoger
// misiones que te ayuden justo en eso. El usuario también puede escribir las suyas.

export const CUADRANTES_FODA = {
  fortalezas: {
    titulo: 'Fortalezas',
    emoji: '💎',
    pregunta: '¿En qué eres bueno/a? ¿Qué habilidades tienes?',
    color: '#2ECC71',
    opciones: [
      { texto: 'Soy creativo/a' },
      { texto: 'Soy buen amigo/a' },
      { texto: 'Soy trabajador/a' },
      { texto: 'Aprendo rápido' },
      { texto: 'Sé escuchar' },
      { texto: 'Soy optimista' },
      { texto: 'Soy responsable' },
      { texto: 'Tengo buen sentido del humor' },
      { texto: 'Soy paciente' },
      { texto: 'Soy deportista' },
    ],
  },
  debilidades: {
    titulo: 'Debilidades',
    emoji: '🪨',
    pregunta: '¿Qué defectos o malos hábitos quieres mejorar?',
    color: '#FF5C8A',
    opciones: [
      { texto: 'Gasto sin control', tag: 'gastos' },
      { texto: 'No ahorro', tag: 'ahorro' },
      { texto: 'Duermo mal o poco', tag: 'sueno' },
      { texto: 'Como mal', tag: 'alimentacion' },
      { texto: 'No hago ejercicio', tag: 'ejercicio' },
      { texto: 'Me estreso mucho', tag: 'estres' },
      { texto: 'Me cuesta socializar', tag: 'socializar' },
      { texto: 'Descuido a mi familia', tag: 'familia' },
      { texto: 'Me critico mucho', tag: 'amorpropio' },
      { texto: 'Dejo todo para después', tag: 'procrastinar' },
      { texto: 'Paso mucho tiempo en el celular', tag: 'celular' },
      { texto: 'Casi no leo', tag: 'lectura' },
      { texto: 'Soy desorganizado/a', tag: 'organizacion' },
    ],
  },
  oportunidades: {
    titulo: 'Oportunidades',
    emoji: '🚪',
    pregunta: '¿Qué cosas a tu alrededor te pueden ayudar?',
    color: '#3D8BFF',
    opciones: [
      { texto: 'Tengo tiempo libre en las mañanas' },
      { texto: 'Hay un parque o gimnasio cerca' },
      { texto: 'Tengo amigos que me apoyan' },
      { texto: 'Tengo internet para aprender' },
      { texto: 'Tengo un ingreso fijo' },
      { texto: 'Mi escuela o trabajo ofrece cursos' },
      { texto: 'Mi familia me apoya' },
    ],
  },
  amenazas: {
    titulo: 'Amenazas',
    emoji: '⚠️',
    pregunta: '¿Qué cosas de afuera te pueden frenar?',
    color: '#F5B700',
    opciones: [
      { texto: 'Tengo poco tiempo' },
      { texto: 'Mi entorno no es saludable' },
      { texto: 'Tengo deudas' },
      { texto: 'Mucho estrés en la escuela o trabajo' },
      { texto: 'Muchas distracciones' },
      { texto: 'Problemas en casa' },
      { texto: 'Amigos con malos hábitos' },
    ],
  },
};

export const LISTA_CUADRANTES = ['fortalezas', 'debilidades', 'oportunidades', 'amenazas'];

// Cuestionario inicial: sirve para calcular con cuánto empieza cada barra.
export const CUESTIONARIO = [
  {
    area: 'salud',
    pregunta: '¿Cuántas horas duermes normalmente?',
    opciones: [
      { texto: 'Menos de 5', valor: 15 },
      { texto: '5 a 6', valor: 35 },
      { texto: '7 a 8', valor: 65 },
      { texto: 'Más de 8', valor: 55 },
    ],
  },
  {
    area: 'salud',
    pregunta: '¿Cuántos días a la semana haces ejercicio?',
    opciones: [
      { texto: 'Ninguno', valor: 10 },
      { texto: '1 o 2', valor: 35 },
      { texto: '3 o 4', valor: 55 },
      { texto: '5 o más', valor: 70 },
    ],
  },
  {
    area: 'salud',
    pregunta: '¿Cómo está tu ánimo la mayoría de los días?',
    opciones: [
      { texto: 'Muy mal', valor: 10 },
      { texto: 'Regular', valor: 35 },
      { texto: 'Bien', valor: 55 },
      { texto: 'Excelente', valor: 70 },
    ],
  },
  {
    area: 'amor',
    pregunta: '¿Qué tan seguido convives con amigos o familia?',
    opciones: [
      { texto: 'Casi nunca', valor: 15 },
      { texto: 'Una vez al mes', valor: 30 },
      { texto: 'Cada semana', valor: 55 },
      { texto: 'Casi diario', valor: 70 },
    ],
  },
  {
    area: 'amor',
    pregunta: '¿Qué tan bien te tratas a ti mismo/a?',
    opciones: [
      { texto: 'Me critico todo el tiempo', valor: 15 },
      { texto: 'A veces me cuesta', valor: 35 },
      { texto: 'Bastante bien', valor: 55 },
      { texto: 'Me quiero mucho', valor: 70 },
    ],
  },
  {
    area: 'dinero',
    pregunta: '¿Ahorras algo de lo que ganas o recibes?',
    opciones: [
      { texto: 'Nada, se me acaba todo', valor: 10 },
      { texto: 'A veces', valor: 30 },
      { texto: 'Casi siempre', valor: 55 },
      { texto: 'Siempre, tengo un plan', valor: 70 },
    ],
  },
  {
    area: 'dinero',
    pregunta: '¿Sabes en qué se va tu dinero cada mes?',
    opciones: [
      { texto: 'Ni idea', valor: 10 },
      { texto: 'Más o menos', valor: 35 },
      { texto: 'Sí, lo tengo claro', valor: 60 },
      { texto: 'Anoto cada gasto', valor: 70 },
    ],
  },
  {
    area: 'inteligencia',
    pregunta: '¿Cuánto lees o estudias por tu cuenta?',
    opciones: [
      { texto: 'Nunca', valor: 10 },
      { texto: 'Muy de vez en cuando', valor: 30 },
      { texto: 'Cada semana', valor: 55 },
      { texto: 'Todos los días', valor: 70 },
    ],
  },
  {
    area: 'inteligencia',
    pregunta: '¿Qué tan organizado/a eres con tus pendientes?',
    opciones: [
      { texto: 'Todo se me olvida', valor: 10 },
      { texto: 'Lo intento', valor: 35 },
      { texto: 'Uso listas o agenda', valor: 60 },
      { texto: 'Muy organizado/a', valor: 70 },
    ],
  },
];
