// Piezas pequeñas que se repiten en varias pantallas: botones, tarjetas, barras, chips.
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AREAS, COLORES, SOMBRA } from '../tema';

export function Tarjeta({ style, children }) {
  return <View style={[estilos.tarjeta, style]}>{children}</View>;
}

export function Boton({ titulo, onPress, tipo = 'primario', deshabilitado, style }) {
  const secundario = tipo === 'secundario';
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        estilos.boton,
        secundario && estilos.botonSecundario,
        deshabilitado && { opacity: 0.4 },
        pressed && { transform: [{ scale: 0.97 }] },
        style,
      ]}
    >
      <Text style={[estilos.botonTexto, secundario && { color: COLORES.primario }]}>{titulo}</Text>
    </Pressable>
  );
}

export function Chip({ texto, activo, onPress, color = COLORES.primario }) {
  return (
    <Pressable
      onPress={onPress}
      style={[estilos.chip, activo && { backgroundColor: color, borderColor: color }]}
    >
      <Text style={[estilos.chipTexto, activo && { color: '#fff' }]}>{texto}</Text>
    </Pressable>
  );
}

export function BarraVida({ area, valor }) {
  const info = AREAS[area];
  return (
    <View style={estilos.barraFila}>
      <Text style={estilos.barraEmoji}>{info.emoji}</Text>
      <View style={{ flex: 1 }}>
        <View style={estilos.barraEncabezado}>
          <Text style={estilos.barraNombre}>{info.nombre}</Text>
          <Text style={[estilos.barraValor, { color: info.color }]}>{Math.round(valor)}/100</Text>
        </View>
        <View style={estilos.barraFondo}>
          <View style={[estilos.barraRelleno, { width: `${valor}%`, backgroundColor: info.color }]} />
        </View>
      </View>
    </View>
  );
}

export function BarraProgreso({ valor, color = COLORES.primario, alto = 8 }) {
  return (
    <View style={[estilos.barraFondo, { height: alto }]}>
      <View style={[estilos.barraRelleno, { width: `${Math.min(100, valor)}%`, backgroundColor: color }]} />
    </View>
  );
}

export function Titulo({ children, style }) {
  return <Text style={[estilos.titulo, style]}>{children}</Text>;
}

export function Subtitulo({ children, style }) {
  return <Text style={[estilos.subtitulo, style]}>{children}</Text>;
}

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    ...SOMBRA,
  },
  boton: {
    backgroundColor: COLORES.primario,
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 16,
    alignItems: 'center',
  },
  botonSecundario: {
    backgroundColor: COLORES.primarioClaro,
  },
  botonTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    backgroundColor: '#fff',
    marginRight: 8,
    marginBottom: 8,
  },
  chipTexto: { color: COLORES.texto, fontSize: 14, fontWeight: '600' },
  barraFila: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  barraEmoji: { fontSize: 24, marginRight: 10 },
  barraEncabezado: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barraNombre: { fontWeight: '700', color: COLORES.texto, fontSize: 15 },
  barraValor: { fontWeight: '800', fontSize: 14 },
  barraFondo: { height: 12, backgroundColor: '#EEEAF8', borderRadius: 999, overflow: 'hidden' },
  barraRelleno: { height: '100%', borderRadius: 999 },
  titulo: { fontSize: 24, fontWeight: '800', color: COLORES.texto, marginBottom: 4 },
  subtitulo: { fontSize: 15, color: COLORES.textoSuave, marginBottom: 14, lineHeight: 21 },
});
