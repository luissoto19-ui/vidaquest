// Misiones del día y de la semana. Al completarlas suben tus barras y ganas monedas y XP.
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { BarraProgreso, Boton, Chip, Tarjeta, Titulo, Subtitulo } from '../components/UI';
import { esParaTi, MISIONES_POR_ID, RECOMPENSAS } from '../data/misiones';
import { MAX_PROPIAS, useJuego } from '../estado/JuegoContext';
import { AREAS, COLORES, LISTA_AREAS } from '../tema';

function TarjetaMision({ mision, tipo, hecha, paraTi, onCompletar, onBorrar }) {
  const area = AREAS[mision.area];
  const premio = RECOMPENSAS[tipo === 'semanal' ? 'semanal' : 'diaria'];
  return (
    <Tarjeta style={[estilos.mision, hecha && { opacity: 0.55 }]}>
      <View style={[estilos.icono, { backgroundColor: area.color + '22' }]}>
        <Text style={{ fontSize: 24 }}>{area.emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {paraTi && !hecha && <Text style={estilos.paraTi}>⭐ Para ti</Text>}
        <Text style={[estilos.misionTitulo, hecha && { textDecorationLine: 'line-through' }]}>{mision.titulo}</Text>
        {!!mision.descripcion && <Text style={estilos.misionDesc}>{mision.descripcion}</Text>}
        <Text style={estilos.premio}>
          +{premio.barra} {area.nombre} · +{premio.monedas} 🪙 · +{premio.xp} XP
        </Text>
        {onBorrar && (
          <Pressable onPress={onBorrar} hitSlop={8}>
            <Text style={estilos.borrar}>🗑️ Borrar</Text>
          </Pressable>
        )}
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
  const hechas = lista.ids.filter((id) => lista.hechas.includes(id)).length;
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

// Misiones que escribe el propio jugador. Se repiten todos los días.
function SeccionPropias() {
  const { estado, completarMision, agregarPropia, borrarPropia } = useJuego();
  const [texto, setTexto] = useState('');
  const [area, setArea] = useState('salud');
  const [confirmarBorrar, setConfirmarBorrar] = useState(null);
  const { propias, diarias } = estado;
  const hechas = propias.filter((m) => diarias.hechas.includes(m.id)).length;
  const lleno = propias.length >= MAX_PROPIAS;

  const agregar = () => {
    if (!texto.trim()) return;
    agregarPropia(texto, area);
    setTexto('');
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={estilos.seccionCabecera}>
        <Text style={estilos.seccionTitulo}>✍️ Mis misiones</Text>
        <Text style={estilos.contador}>
          {hechas}/{propias.length}
        </Text>
      </View>
      <Text style={estilos.ayuda}>
        Escribe hábitos tuyos que quieras hacer cada día. Se repiten diario. (Máximo {MAX_PROPIAS})
      </Text>

      {propias.map((m) => (
        <TarjetaMision
          key={m.id}
          mision={{ ...m, descripcion: confirmarBorrar === m.id ? 'Toca "Borrar" otra vez para confirmar' : '' }}
          tipo="propia"
          hecha={diarias.hechas.includes(m.id)}
          onCompletar={() => completarMision(m.id, 'propia')}
          onBorrar={() => {
            if (confirmarBorrar === m.id) {
              borrarPropia(m.id);
              setConfirmarBorrar(null);
            } else {
              setConfirmarBorrar(m.id);
            }
          }}
        />
      ))}

      {lleno ? (
        <Text style={estilos.ayuda}>Ya tienes {MAX_PROPIAS} misiones propias. Borra una para agregar otra.</Text>
      ) : (
        <Tarjeta>
          <Text style={estilos.formTitulo}>Nueva misión</Text>
          <TextInput
            style={estilos.input}
            placeholder="Ej. Tomar mis vitaminas, practicar guitarra…"
            placeholderTextColor={COLORES.textoSuave}
            value={texto}
            onChangeText={setTexto}
            onSubmitEditing={agregar}
            maxLength={60}
            returnKeyType="done"
          />
          <Text style={estilos.formEtiqueta}>¿Qué barra sube?</Text>
          <View style={estilos.chips}>
            {LISTA_AREAS.map((a) => (
              <Chip
                key={a}
                texto={`${AREAS[a].emoji} ${AREAS[a].nombre}`}
                activo={area === a}
                color={AREAS[a].color}
                onPress={() => setArea(a)}
              />
            ))}
          </View>
          <Boton titulo="Agregar misión" onPress={agregar} deshabilitado={!texto.trim()} />
        </Tarjeta>
      )}
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
      <SeccionPropias />
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
  borrar: { fontSize: 12, color: COLORES.textoSuave, fontWeight: '700', marginTop: 6 },
  ayuda: { color: COLORES.textoSuave, fontSize: 13, marginBottom: 12, lineHeight: 18 },
  formTitulo: { fontSize: 16, fontWeight: '800', color: COLORES.texto, marginBottom: 10 },
  formEtiqueta: { fontWeight: '700', color: COLORES.texto, marginTop: 12, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: COLORES.texto,
  },
});
