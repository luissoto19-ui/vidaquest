// Notificación diaria con una frase motivacional.
// Programamos los próximos 14 días, cada uno con una frase distinta.
// Cada vez que abres la app se vuelven a programar, así nunca se acaban.
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { FRASES } from './data/frases';
import { diaDelAno } from './utils/juego';

const DIAS_A_PROGRAMAR = 14;
const disponible = Platform.OS !== 'web'; // en el navegador no hay notificaciones

if (disponible) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

export function fraseDelDia(fecha = new Date()) {
  return FRASES[diaDelAno(fecha) % FRASES.length];
}

// En Android las notificaciones van en "canales". Intentamos crear el nuestro;
// si falla (pasa en algunas versiones de Expo Go), usamos el canal por defecto.
let canal; // undefined = aún no lo intentamos, null = usar el de por defecto
async function prepararCanal() {
  if (Platform.OS !== 'android') return null;
  if (canal !== undefined) return canal;
  try {
    await Notifications.setNotificationChannelAsync('frases', {
      name: 'Frase del día',
      description: 'Una frase motivacional cada mañana',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250],
      lightColor: '#6C4CF1',
      enableVibrate: true,
      showBadge: false,
    });
    canal = 'frases';
  } catch (e) {
    console.log('Usando el canal de notificaciones por defecto');
    canal = null;
  }
  return canal;
}

// Agrega el canal al "trigger" solo si lo pudimos crear.
const conCanal = (trigger) => (canal ? { ...trigger, channelId: canal } : trigger);

async function pedirPermiso() {
  try {
    await prepararCanal();
    const actual = await Notifications.getPermissionsAsync();
    if (actual.granted) return true;
    const pedido = await Notifications.requestPermissionsAsync();
    return pedido.granted;
  } catch (e) {
    console.log('No se pudo pedir permiso de notificaciones', e);
    return false;
  }
}

export async function programarFrases(hora, minuto, nombre) {
  if (!disponible) return false;
  try {
    if (!(await pedirPermiso())) return false;
    await Notifications.cancelAllScheduledNotificationsAsync();
    const ahora = new Date();
    for (let i = 0; i < DIAS_A_PROGRAMAR; i++) {
      const fecha = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + i, hora, minuto);
      if (fecha <= ahora) continue;
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `☀️ Buenos días${nombre ? ', ' + nombre : ''}`,
          body: fraseDelDia(fecha),
        },
        trigger: conCanal({
          type: Notifications.SchedulableTriggerInputTypes?.DATE ?? 'date',
          date: fecha,
        }),
      });
    }
    return true;
  } catch (e) {
    console.warn('No se pudieron programar las notificaciones', e);
    return false;
  }
}

export async function cancelarFrases() {
  if (!disponible) return;
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (e) {}
}

// Para el botón "Probar notificación": llega en 5 segundos.
export async function notificacionDePrueba() {
  if (!disponible) return false;
  if (!(await pedirPermiso())) return false;
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title: '✨ Frase del día', body: fraseDelDia() },
      trigger: conCanal({
        type: Notifications.SchedulableTriggerInputTypes?.TIME_INTERVAL ?? 'timeInterval',
        seconds: 5,
      }),
    });
    return true;
  } catch (e) {
    console.log('No se pudo enviar la notificación de prueba', e);
    return false;
  }
}

export const notificacionesDisponibles = disponible;
