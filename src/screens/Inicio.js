// Pantalla principal: nombre arriba, personaje de cuerpo completo y las 4 barras.
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Personaje from '../components/Personaje';
import { BarraProgreso, BarraVida, Boton, Tarjeta } from '../components/UI';
import { useJuego } from '../estado/JuegoContext';
import { fraseDelDia } from '../notificaciones';
import { AREAS, COLORES, LISTA_AREAS } from '../tema';
import { areaMasBaja, calcularAnimo, calcularNivel, XP_POR_NIVEL, xpEnNivel } from '../utils/juego';

const TEXTO_ANIMO = {
  feliz: '¡Tu personaje está feliz! Sigue así 😄',
  normal: 'Tu personaje está bien, pero puede estar mejor 🙂',
  triste: 'Tu personaje se siente decaído… ¡cumple misiones para animarlo! 😢',
};

export default function Inicio({ irA }) {
  const { estado } = useJuego();
  const { nombre, barras, monedas, xp, racha, apariencia, diarias } = estado;
  const animo = calcularAnimo(barras);
  const baja = AREAS[areaMasBaja(barras)];
  const pendientes = diarias.ids.length - diarias.hechas.length;

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      {/* Cabecera: nombre, nivel, monedas y racha */}
      <View style={estilos.cabecera}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.nombre}>{nombre}</Text>
          <Text style={estilos.nivel}>Nivel {calcularNivel(xp)}</Text>
          <View style={{ width: 140, marginTop: 4 }}>
            <BarraProgreso valor={(xpEnNivel(xp) / XP_POR_NIVEL) * 100} alto={6} />
          </View>
        </View>
        <View style={estilos.pildora}>
          <Text style={estilos.pildoraTexto}>🔥 {racha.dias}</Text>
        </View>
        <View style={estilos.pildora}>
          <Text style={estilos.pildoraTexto}>🪙 {monedas}</Text>
        </View>
      </View>

      {/* Personaje + botón de personalizar */}
      <View style={estilos.escenario}>
        <Personaje apariencia={apariencia} animo={animo} alto={300} />
        <Pressable style={estilos.botonEstilo} onPress={() => irA('estilo')}>
          <Text style={{ fontSize: 22 }}>👕</Text>
          <Text style={estilos.botonEstiloTexto}>Personalizar</Text>
        </Pressable>
      </View>
      <Text style={estilos.animo}>{TEXTO_ANIMO[animo]}</Text>

      {/* Las 4 barras */}
      <Tarjeta>
        {LISTA_AREAS.map((a) => (
          <BarraVida key={a} area={a} valor={barras[a]} />
        ))}
      </Tarjeta>

      {/* Frase del día */}
      <Tarjeta style={{ backgroundColor: COLORES.primario }}>
        <Text style={estilos.fraseTitulo}>✨ Frase del día</Text>
        <Text style={estilos.frase}>“{fraseDelDia()}”</Text>
      </Tarjeta>

      {/* Sugerencia según la barra más baja */}
      <Tarjeta style={{ borderLeftWidth: 6, borderLeftColor: baja.color }}>
        <Text style={estilos.consejoTitulo}>
          {baja.emoji} Enfócate en: {baja.nombre}
        </Text>
        <Text style={estilos.consejo}>{baja.consejo}</Text>
      </Tarjeta>

      <Boton
        titulo={pendientes > 0 ? `Ver mis misiones (${pendientes} pendientes)` : '¡Misiones de hoy completas! 🎉'}
        onPress={() => irA('misiones')}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 18, paddingBottom: 30 },
  cabecera: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  nombre: { fontSize: 24, fontWeight: '800', color: COLORES.texto },
  nivel: { fontSize: 14, fontWeight: '700', color: COLORES.primario },
  pildora: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, marginLeft: 8 },
  pildoraTexto: { fontWeight: '800', fontSize: 15, color: COLORES.texto },
  escenario: {
    alignItems: 'center',
    backgroundColor: COLORES.primarioClaro,
    borderRadius: 28,
    paddingVertical: 14,
    marginVertical: 8,
  },
  botonEstilo: {
    position: 'absolute',
    right: 12,
    top: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  botonEstiloTexto: { fontSize: 11, fontWeight: '700', color: COLORES.primario },
  animo: { textAlign: 'center', color: COLORES.textoSuave, marginBottom: 12, fontWeight: '600' },
  fraseTitulo: { color: '#fff', opacity: 0.85, fontWeight: '700', marginBottom: 6 },
  frase: { color: '#fff', fontSize: 18, fontWeight: '700', lineHeight: 25 },
  consejoTitulo: { fontWeight: '800', fontSize: 16, color: COLORES.texto, marginBottom: 4 },
  consejo: { color: COLORES.textoSuave, fontSize: 14, lineHeight: 20 },
});
