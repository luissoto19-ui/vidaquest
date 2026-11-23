// Pestaña "Mascotas" de la pantalla Estilo: adoptar, elegir, ponerle nombre y accesorios.
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Mascota from './Mascota';
import { BarraProgreso, Boton, Chip, Tarjeta } from './UI';
import { LOGROS } from '../data/logros';
import {
  ACCESORIOS_MASCOTA,
  MASCOTAS,
  MASCOTAS_POR_ID,
  nivelMascota,
  TEXTO_ANIMO_MASCOTA,
  XP_MASCOTA_POR_NIVEL,
} from '../data/mascotas';
import { useJuego } from '../estado/JuegoContext';
import { COLORES } from '../tema';
import { calcularAnimoMascota } from '../utils/juego';

const nombreLogro = (id) => LOGROS.find((l) => l.id === id)?.nombre;

function MascotaActiva() {
  const { estado, renombrarMascota, usarAccesorioMascota, activarMascota } = useJuego();
  const id = estado.mascotaActiva;
  const mascota = estado.mascotas[id];
  const info = MASCOTAS_POR_ID[id];
  const animo = calcularAnimoMascota(estado);
  const nivel = nivelMascota(mascota.xp);
  const xpEnNivel = mascota.xp % XP_MASCOTA_POR_NIVEL;

  return (
    <Tarjeta>
      <View style={estilos.activaFila}>
        <Mascota especie={id} animo={animo} accesorio={mascota.accesorio} alto={110} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={estilos.etiqueta}>Nombre de tu {info.especie.toLowerCase()}</Text>
          <TextInput
            style={estilos.input}
            value={mascota.nombre}
            onChangeText={(t) => renombrarMascota(id, t)}
            maxLength={15}
            placeholder="Ponle un nombre"
            placeholderTextColor={COLORES.textoSuave}
          />
          <Text style={estilos.nivel}>Nivel {nivel}</Text>
          <BarraProgreso valor={(xpEnNivel / XP_MASCOTA_POR_NIVEL) * 100} alto={6} color={COLORES.oro} />
          <Text style={estilos.ayuda}>{TEXTO_ANIMO_MASCOTA[animo]}</Text>
        </View>
      </View>

      <Text style={[estilos.etiqueta, { marginTop: 12 }]}>Accesorios para {mascota.nombre || 'tu mascota'}</Text>
      <View style={estilos.chips}>
        {ACCESORIOS_MASCOTA.map((a) => {
          const tiene = estado.inventario.includes(a.id);
          const puesto = mascota.accesorio === a.id;
          const alcanza = estado.monedas >= a.precio;
          return (
            <Chip
              key={a.id}
              texto={`${a.emoji} ${a.nombre}${tiene ? '' : ` · ${a.precio} 🪙`}`}
              activo={puesto}
              onPress={() => (tiene || alcanza ? usarAccesorioMascota(a.id) : null)}
            />
          );
        })}
      </View>
      <Text style={estilos.ayuda}>Toca uno para comprarlo o ponérselo. Tócalo otra vez para quitárselo.</Text>
      <Boton titulo="Guardar mascota (que no me acompañe)" tipo="secundario" onPress={() => activarMascota(null)} />
    </Tarjeta>
  );
}

export default function PanelMascotas() {
  const { estado, comprarMascota, activarMascota } = useJuego();
  const [vista, setVista] = useState(null); // mascota que estás viendo para comprar
  const infoVista = vista ? MASCOTAS_POR_ID[vista] : null;

  return (
    <View style={{ width: '100%' }}>
      {estado.mascotaActiva && estado.mascotas[estado.mascotaActiva] && <MascotaActiva />}

      {infoVista && (
        <Tarjeta style={estilos.compra}>
          <Mascota especie={vista} alto={70} saltar={false} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={estilos.compraNombre}>
              {infoVista.emoji} {infoVista.especie}
            </Text>
            <Text style={estilos.ayuda}>
              {infoVista.logro
                ? `🔒 Se gana con el logro "${nombreLogro(infoVista.logro)}"`
                : estado.monedas >= infoVista.precio
                ? `Cuesta ${infoVista.precio} 🪙`
                : `Te faltan ${infoVista.precio - estado.monedas} 🪙. ¡Cumple misiones!`}
            </Text>
          </View>
          {!infoVista.logro && (
            <Boton
              titulo="Adoptar"
              deshabilitado={estado.monedas < infoVista.precio}
              onPress={() => {
                comprarMascota(vista);
                setVista(null);
              }}
              style={{ paddingVertical: 10, paddingHorizontal: 14 }}
            />
          )}
          <Pressable onPress={() => setVista(null)} style={{ padding: 8 }}>
            <Text style={{ fontSize: 18, color: COLORES.textoSuave }}>✕</Text>
          </Pressable>
        </Tarjeta>
      )}

      <Text style={estilos.titulo}>🐾 Mascotas</Text>
      <Text style={estilos.ayuda}>
        Te acompañan en la pantalla de inicio, suben de nivel contigo y se ponen felices cuando eres constante.
      </Text>
      <View style={estilos.rejilla}>
        {MASCOTAS.map((m) => {
          const tiene = !!estado.mascotas[m.id];
          const activa = estado.mascotaActiva === m.id;
          return (
            <Pressable
              key={m.id}
              style={[estilos.item, activa && estilos.itemActiva, vista === m.id && estilos.itemViendo]}
              onPress={() => {
                if (tiene) {
                  setVista(null);
                  activarMascota(m.id);
                } else {
                  setVista(m.id);
                }
              }}
            >
              <View style={!tiene && m.logro ? { opacity: 0.45 } : null}>
                <Mascota especie={m.id} alto={74} saltar={false} accesorio={estado.mascotas[m.id]?.accesorio} />
              </View>
              <Text style={estilos.itemNombre} numberOfLines={1}>
                {tiene ? estado.mascotas[m.id].nombre : m.especie}
              </Text>
              <Text style={[estilos.itemPrecio, tiene && { color: COLORES.exito }]}>
                {activa ? 'Contigo' : tiene ? 'Tuya' : m.logro ? '🔒 Logro' : `${m.precio} 🪙`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  activaFila: { flexDirection: 'row', alignItems: 'center' },
  etiqueta: { fontWeight: '700', color: COLORES.texto, marginBottom: 6, fontSize: 14 },
  input: {
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: COLORES.texto,
    fontWeight: '700',
  },
  nivel: { fontWeight: '800', color: COLORES.oro, marginTop: 8, marginBottom: 4 },
  ayuda: { color: COLORES.textoSuave, fontSize: 13, marginTop: 4, marginBottom: 8, lineHeight: 18 },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  compra: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  compraNombre: { fontWeight: '800', fontSize: 16, color: COLORES.texto },
  titulo: { fontSize: 18, fontWeight: '800', color: COLORES.texto, marginTop: 4 },
  rejilla: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  item: {
    width: '31%',
    margin: '1.1%',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  itemActiva: { borderColor: COLORES.exito },
  itemViendo: { borderColor: COLORES.primario },
  itemNombre: { fontSize: 12, fontWeight: '700', color: COLORES.texto, marginTop: 2, paddingHorizontal: 4 },
  itemPrecio: { fontSize: 12, fontWeight: '800', color: COLORES.primario, marginTop: 2 },
});
