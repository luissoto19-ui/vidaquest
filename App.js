// Componente principal: decide si mostrar la bienvenida (jugador nuevo)
// o el juego con su barra de pestañas abajo.
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ProveedorJuego, useJuego } from './src/estado/JuegoContext';
import Aviso from './src/components/Aviso';
import Confeti from './src/components/Confeti';
import Bienvenida from './src/screens/Bienvenida';
import Inicio from './src/screens/Inicio';
import Misiones from './src/screens/Misiones';
import Logros from './src/screens/Logros';
import Personalizar from './src/screens/Personalizar';
import Perfil from './src/screens/Perfil';
import { COLORES } from './src/tema';

const PESTANAS = [
  { id: 'inicio', nombre: 'Inicio', emoji: '🏠', Pantalla: Inicio },
  { id: 'misiones', nombre: 'Misiones', emoji: '🎯', Pantalla: Misiones },
  { id: 'estilo', nombre: 'Estilo', emoji: '👕', Pantalla: Personalizar },
  { id: 'logros', nombre: 'Logros', emoji: '🏆', Pantalla: Logros },
  { id: 'perfil', nombre: 'Perfil', emoji: '👤', Pantalla: Perfil },
];

function Juego() {
  const { estado, cargando, confeti } = useJuego();
  const [pestana, setPestana] = useState('inicio');

  if (cargando) {
    return (
      <View style={estilos.centro}>
        <ActivityIndicator size="large" color={COLORES.primario} />
      </View>
    );
  }
  if (!estado.creado) return <Bienvenida />;

  const { Pantalla } = PESTANAS.find((p) => p.id === pestana);
  return (
    <View style={{ flex: 1 }}>
      <Aviso />
      <View style={{ flex: 1 }}>
        <Pantalla irA={setPestana} />
      </View>
      <View style={estilos.pestanas}>
        {PESTANAS.map((p) => {
          const activa = p.id === pestana;
          return (
            <Pressable key={p.id} style={estilos.pestana} onPress={() => setPestana(p.id)}>
              <Text style={[estilos.pestanaEmoji, !activa && { opacity: 0.45 }]}>{p.emoji}</Text>
              <Text style={[estilos.pestanaTexto, activa && { color: COLORES.primario }]}>{p.nombre}</Text>
            </Pressable>
          );
        })}
      </View>
      <Confeti disparo={confeti} />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ProveedorJuego>
        <SafeAreaView style={estilos.raiz} edges={['top', 'bottom']}>
          <StatusBar style="dark" />
          <Juego />
        </SafeAreaView>
      </ProveedorJuego>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: COLORES.fondo },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pestanas: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: COLORES.borde,
    paddingTop: 8,
    paddingBottom: 6,
  },
  pestana: { flex: 1, alignItems: 'center' },
  pestanaEmoji: { fontSize: 22 },
  pestanaTexto: { fontSize: 11, fontWeight: '700', color: COLORES.textoSuave, marginTop: 2 },
});
