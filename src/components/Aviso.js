// Mensajito que aparece arriba por unos segundos (logros, subir de nivel, compras).
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useJuego } from '../estado/JuegoContext';
import { COLORES, SOMBRA } from '../tema';

export default function Aviso() {
  const { estado, quitarAviso } = useJuego();
  const mensaje = estado.avisos[0];

  useEffect(() => {
    if (!mensaje) return;
    const t = setTimeout(quitarAviso, 3500);
    return () => clearTimeout(t);
  }, [mensaje, estado.avisos.length]);

  if (!mensaje) return null;
  return (
    <Pressable style={estilos.caja} onPress={quitarAviso}>
      <Text style={estilos.texto}>{mensaje}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  caja: {
    position: 'absolute',
    top: 10,
    left: 16,
    right: 16,
    zIndex: 10,
    backgroundColor: COLORES.texto,
    borderRadius: 16,
    padding: 14,
    ...SOMBRA,
  },
  texto: { color: '#fff', fontSize: 15, fontWeight: '700', textAlign: 'center' },
});
