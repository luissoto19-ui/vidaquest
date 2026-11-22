// Misiones del día y de la semana. Al completarlas suben tus barras y ganas monedas y XP.
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarraProgreso, Tarjeta, Titulo, Subtitulo } from '../components/UI';
import { esParaTi, MISIONES_POR_ID, RECOMPENSAS } from '../data/misiones';
import { useJuego } from '../estado/JuegoContext';
import { AREAS, COLORES } from '../tema';

function TarjetaMision({ mision, tipo, hecha, paraTi, onCompletar }) {
  const area = AREAS[mision.area];
  const premio = RECOMPENSAS[tipo];
  return (
    <Tarjeta style={[estilos.mision, hecha && { opacity: 0.55 }]}>
      <View style={[estilos.icono, { backgroundColor: area.color + '22' }]}>
        <Text style={{ fontSize: 24 }}>{area.emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {paraTi && !hecha && <Text style={estilos.paraTi}>⭐ Para ti</Text>}
        <Text style={[estilos.misionTitulo, hecha && { textDecorationLine: 'line-through' }]}>{mision.titulo}</Text>
        <Text style={estilos.misionDesc}>{mision.descripcion}</Text>
        <Text style={estilos.premio}>
          +{premio.barra} {area.nombre} · +{premio.monedas} 🪙 · +{premio.xp} XP
        </Text>
      </View>
      <Pressable
        disabled={hecha}
        onPress={onCompletar}
        style={({ pressed }) => [estilos.check, hecha && estilos.checkHecho, pressed && { transform: [{ scale: 0.92 }] }]}
      >
        <Text style={[estilos.checkTexto, hecha && { color: '#fff' }]}>{hecha ? '✓' : '¡Hecho!'}</Text>
      </Pressable>
    </Tarjeta>
  );
}

function Seccion({ titulo, lista, tipo }) {
  const { estado, completarMision } = useJuego();
  const total = lista.ids.length;
  const hechas = lista.hechas.length;
  return (
    <View style={{ marginBottom: 10 }}>
      <View style={estilos.seccionCabecera}>
        <Text style={estilos.seccionTitulo}>{titulo}</Text>
        <Text style={estilos.contador}>
          {hechas}/{total}
        </Text>
      </View>
      <View style={{ marginBottom: 12 }}>
        <BarraProgreso valor={total ? (hechas / total) * 100 : 0} color={COLORES.exito} />
      </View>
      {lista.ids.map((id) => {
        const m = MISIONES_POR_ID[id];
        if (!m) return null;
        return (
          <TarjetaMision
            key={id}
            mision={m}
            tipo={tipo}
            hecha={lista.hechas.includes(id)}
            paraTi={esParaTi(m, estado.foda)}
            onCompletar={() => completarMision(id, tipo)}
          />
        );
      })}
    </View>
  );
}

export default function Misiones() {
  const { estado } = useJuego();
  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <Titulo>Misiones</Titulo>
      <Subtitulo>
        Cambian cada día y cada semana. Las marcadas con ⭐ fueron elegidas según tu FODA. ¡Sé honesto/a: el juego
        solo funciona si de verdad las haces!
      </Subtitulo>
      <Seccion titulo="☀️ Hoy" lista={estado.diarias} tipo="diaria" />
      <Seccion titulo="📆 Esta semana" lista={estado.semanales} tipo="semanal" />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 18, paddingBottom: 30 },
  seccionCabecera: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  seccionTitulo: { fontSize: 19, fontWeight: '800', color: COLORES.texto },
  contador: { fontWeight: '800', color: COLORES.exito },
  mision: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  icono: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  paraTi: { color: COLORES.oro, fontWeight: '800', fontSize: 12, marginBottom: 2 },
  misionTitulo: { fontSize: 16, fontWeight: '800', color: COLORES.texto },
  misionDesc: { fontSize: 13, color: COLORES.textoSuave, marginTop: 2, lineHeight: 18 },
  premio: { fontSize: 12, color: COLORES.primario, fontWeight: '700', marginTop: 6 },
  check: {
    marginLeft: 10,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORES.primarioClaro,
    minWidth: 64,
    alignItems: 'center',
  },
  checkHecho: { backgroundColor: COLORES.exito },
  checkTexto: { fontWeight: '800', color: COLORES.primario, fontSize: 13 },
});
