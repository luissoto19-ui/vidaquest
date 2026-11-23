// El "cerebro" del juego: guarda todo el progreso del jugador en el celular
// y tiene las acciones (completar misión, comprar ropa, etc.).
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generarDiarias, generarSemanales, MISIONES_POR_ID, RECOMPENSAS } from '../data/misiones';
import { aplicarLogros } from '../data/logros';
import { ITEMS_GRATIS, ITEMS_POR_ID } from '../data/tienda';
import { LISTA_AREAS } from '../tema';
import { ayer, calcularNivel, claveSemana, diasEntre, hoy } from '../utils/juego';
import { cancelarFrases, programarFrases } from '../notificaciones';

const CLAVE_GUARDADO = 'vidaquest_estado_v1';
const PERDIDA_POR_DIA = 3; // puntos que baja cada barra por cada día sin entrar
export const MAX_PROPIAS = 5; // cuántas misiones propias puede tener el jugador

export const ESTADO_INICIAL = {
  creado: false,
  nombre: '',
  barras: { salud: 50, amor: 50, dinero: 50, inteligencia: 50 },
  monedas: 50,
  xp: 0,
  foda: { fortalezas: [], debilidades: [], oportunidades: [], amenazas: [] },
  apariencia: {
    piel: '#F1C27D',
    colorPelo: '#3B2314',
    peinado: 'pelo_corto',
    camisa: 'camisa_playera_azul',
    pantalon: 'pant_jeans_azul',
    zapatos: 'zap_tenis_blancos',
    accesorio: null,
  },
  inventario: ITEMS_GRATIS,
  diarias: { fecha: null, ids: [], hechas: [] },
  semanales: { semana: null, ids: [], hechas: [] },
  propias: [], // misiones que escribe el propio jugador: { id, titulo, area }
  stats: { total: 0, salud: 0, amor: 0, dinero: 0, inteligencia: 0, compras: 0 },
  racha: { dias: 0, mejor: 0, ultimoDia: null },
  logros: [],
  ultimaVisita: null,
  notificacion: { activa: true, hora: 8, minuto: 0 },
  avisos: [], // mensajitos que aparecen arriba (logros, nivel, etc.)
};

// Une lo guardado con el estado inicial (por si agregamos campos nuevos en el futuro).
function fusionar(g) {
  const I = ESTADO_INICIAL;
  return {
    ...I,
    ...g,
    barras: { ...I.barras, ...g.barras },
    foda: { ...I.foda, ...g.foda },
    apariencia: { ...I.apariencia, ...g.apariencia },
    inventario: Array.from(new Set([...I.inventario, ...(g.inventario || [])])),
    propias: g.propias || [],
    stats: { ...I.stats, ...g.stats },
    racha: { ...I.racha, ...g.racha },
    notificacion: { ...I.notificacion, ...g.notificacion },
    avisos: [],
  };
}

// Se llama al abrir la app: baja barras si no entraste, y cambia las misiones si es otro día.
function refrescar(e) {
  const fecha = hoy();
  const n = { ...e, avisos: [...e.avisos] };

  if (n.ultimaVisita && n.ultimaVisita !== fecha) {
    const dias = diasEntre(n.ultimaVisita, fecha);
    if (dias > 0) {
      const perdida = Math.min(dias, 10) * PERDIDA_POR_DIA;
      n.barras = Object.fromEntries(LISTA_AREAS.map((a) => [a, Math.max(0, n.barras[a] - perdida)]));
      if (dias >= 2) n.avisos.push(`😴 Pasaron ${dias} días sin verte. Tus barras bajaron ${perdida} puntos.`);
    }
  }
  n.ultimaVisita = fecha;

  if (n.diarias.fecha !== fecha) {
    n.diarias = { fecha, ids: generarDiarias(n), hechas: [] };
  }
  const semana = claveSemana();
  if (n.semanales.semana !== semana) {
    n.semanales = { semana, ids: generarSemanales(n), hechas: [] };
  }
  if (n.racha.ultimoDia && n.racha.ultimoDia !== fecha && n.racha.ultimoDia !== ayer()) {
    n.racha = { ...n.racha, dias: 0 };
  }
  return n;
}

const JuegoContext = createContext(null);

export function ProveedorJuego({ children }) {
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const [cargando, setCargando] = useState(true);
  const [confeti, setConfeti] = useState(0); // sube de 1 en 1 cada vez que lanzamos confeti
  const lanzarConfeti = useCallback(() => setConfeti((c) => c + 1), []);

  // 1) Cargar el progreso guardado al abrir la app.
  useEffect(() => {
    (async () => {
      try {
        const texto = await AsyncStorage.getItem(CLAVE_GUARDADO);
        if (texto) {
          const guardado = fusionar(JSON.parse(texto));
          setEstado(guardado.creado ? aplicarLogros(refrescar(guardado)) : guardado);
        }
      } catch (e) {
        console.warn('No se pudo cargar el progreso', e);
      }
      setCargando(false);
    })();
  }, []);

  // 2) Guardar automáticamente cada vez que algo cambia.
  useEffect(() => {
    if (cargando) return;
    const { avisos, ...paraGuardar } = estado;
    AsyncStorage.setItem(CLAVE_GUARDADO, JSON.stringify(paraGuardar)).catch(() => {});
  }, [estado, cargando]);

  // 3) Si la app estaba en segundo plano y vuelves otro día, refrescar.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (s) => {
      if (s === 'active') setEstado((e) => (e.creado ? refrescar(e) : e));
    });
    return () => sub.remove();
  }, []);

  // 4) Programar la frase motivacional de cada mañana.
  const { activa, hora, minuto } = estado.notificacion;
  useEffect(() => {
    if (cargando || !estado.creado) return;
    if (activa) programarFrases(hora, minuto, estado.nombre);
    else cancelarFrases();
  }, [cargando, estado.creado, activa, hora, minuto, estado.nombre]);

  // ---------- Acciones ----------

  const crearPersonaje = useCallback(({ nombre, apariencia, barras, foda }) => {
    setEstado(() =>
      aplicarLogros(
        refrescar({ ...ESTADO_INICIAL, creado: true, nombre, apariencia, barras, foda, ultimaVisita: hoy() })
      )
    );
  }, []);

  // tipo: 'diaria', 'semanal' o 'propia'. Las propias se marcan junto con las diarias
  // (así se reinician solas cada día) y dan el mismo premio que una diaria.
  const completarMision = useCallback((id, tipo) => {
    setEstado((prev) => {
      const clave = tipo === 'semanal' ? 'semanales' : 'diarias';
      const lista = prev[clave];
      const mision = tipo === 'propia' ? prev.propias.find((m) => m.id === id) : MISIONES_POR_ID[id];
      if (!mision || lista.hechas.includes(id)) return prev;
      if (tipo !== 'propia' && !lista.ids.includes(id)) return prev;

      const premio = RECOMPENSAS[tipo === 'semanal' ? 'semanal' : 'diaria'];
      const fecha = hoy();

      let dias = prev.racha.dias;
      if (prev.racha.ultimoDia !== fecha) dias = prev.racha.ultimoDia === ayer() ? dias + 1 : 1;

      const xp = prev.xp + premio.xp;
      const avisos = [...prev.avisos];
      if (calcularNivel(xp) > calcularNivel(prev.xp)) avisos.push(`⭐ ¡Subiste al nivel ${calcularNivel(xp)}!`);

      return aplicarLogros({
        ...prev,
        [clave]: { ...lista, hechas: [...lista.hechas, id] },
        barras: { ...prev.barras, [mision.area]: Math.min(100, prev.barras[mision.area] + premio.barra) },
        monedas: prev.monedas + premio.monedas,
        xp,
        stats: { ...prev.stats, total: prev.stats.total + 1, [mision.area]: prev.stats[mision.area] + 1 },
        racha: { dias, ultimoDia: fecha, mejor: Math.max(prev.racha.mejor || 0, dias) },
        avisos,
      });
    });
  }, []);

  const comprar = useCallback((id) => {
    setEstado((prev) => {
      const item = ITEMS_POR_ID[id];
      if (!item || item.logro || prev.inventario.includes(id) || prev.monedas < item.precio) return prev;
      return aplicarLogros({
        ...prev,
        monedas: prev.monedas - item.precio,
        inventario: [...prev.inventario, id],
        apariencia: { ...prev.apariencia, [item.categoria]: id },
        stats: { ...prev.stats, compras: prev.stats.compras + 1 },
        avisos: [...prev.avisos, `🛍️ Compraste: ${item.nombre}`],
      });
    });
  }, []);

  // Cambia una parte de la apariencia (ropa que ya tienes, color de piel o de pelo).
  const cambiarApariencia = useCallback((clave, valor) => {
    setEstado((prev) => {
      const item = ITEMS_POR_ID[valor];
      if (item && !prev.inventario.includes(valor)) return prev;
      return { ...prev, apariencia: { ...prev.apariencia, [clave]: valor } };
    });
  }, []);

  const agregarPropia = useCallback((titulo, area) => {
    setEstado((prev) => {
      const limpio = titulo.trim();
      if (!limpio || prev.propias.length >= MAX_PROPIAS) return prev;
      const nueva = { id: `p_${Date.now()}`, titulo: limpio, area };
      return aplicarLogros({
        ...prev,
        propias: [...prev.propias, nueva],
        avisos: [...prev.avisos, `✍️ Nueva misión: ${limpio}`],
      });
    });
  }, []);

  const borrarPropia = useCallback((id) => {
    setEstado((prev) => ({ ...prev, propias: prev.propias.filter((m) => m.id !== id) }));
  }, []);

  const actualizarFoda = useCallback((cuadrante, lista) => {
    setEstado((prev) => aplicarLogros({ ...prev, foda: { ...prev.foda, [cuadrante]: lista } }));
  }, []);

  const cambiarNotificacion = useCallback((cambios) => {
    setEstado((prev) => ({ ...prev, notificacion: { ...prev.notificacion, ...cambios } }));
  }, []);

  const quitarAviso = useCallback(() => {
    setEstado((prev) => ({ ...prev, avisos: prev.avisos.slice(1) }));
  }, []);

  const reiniciar = useCallback(() => {
    cancelarFrases();
    setEstado(ESTADO_INICIAL);
  }, []);

  const valor = {
    estado,
    cargando,
    confeti,
    lanzarConfeti,
    crearPersonaje,
    completarMision,
    comprar,
    agregarPropia,
    borrarPropia,
    cambiarApariencia,
    actualizarFoda,
    cambiarNotificacion,
    quitarAviso,
    reiniciar,
  };
  return <JuegoContext.Provider value={valor}>{children}</JuegoContext.Provider>;
}

export const useJuego = () => useContext(JuegoContext);
