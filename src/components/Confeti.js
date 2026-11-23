// Lluvia de confeti que cae desde arriba cuando completas una misión.
// Cada vez que cambia "disparo", se lanza una lluvia nueva.
import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

const COLORES = ['#6C4CF1', '#FF5C8A', '#F5B700', '#2ECC71', '#3D8BFF', '#FF8A3D'];
const CANTIDAD = 45;
const NATIVO = Platform.OS !== 'web'; // en el celular la animación corre más fluida

const azar = (min, max) => min + Math.random() * (max - min);

function Lluvia() {
  const { width, height } = useWindowDimensions();

  // Cada papelito tiene su propia posición, color, tamaño, velocidad y giro.
  const piezas = useMemo(
    () =>
      Array.from({ length: CANTIDAD }, () => {
        const redondo = Math.random() < 0.3;
        const ancho = azar(6, 11);
        return {
          x: azar(0, width),
          deriva: azar(-80, 80), // cuánto se mueve hacia los lados al caer
          giro: azar(-540, 540),
          retraso: azar(0, 300),
          duracion: azar(1600, 2800),
          color: COLORES[Math.floor(Math.random() * COLORES.length)],
          ancho,
          alto: redondo ? ancho : azar(10, 16),
          redondo,
        };
      }),
    [width]
  );

  const anims = useRef(piezas.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel(
      anims.map((a, i) =>
        Animated.timing(a, {
          toValue: 1,
          duration: piezas[i].duracion,
          delay: piezas[i].retraso,
          easing: Easing.in(Easing.quad), // empieza lento y acelera, como si cayera
          useNativeDriver: NATIVO,
        })
      )
    ).start();
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, estilos.capa]}>
      {piezas.map((p, i) => {
        const a = anims[i];
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: -20,
              width: p.ancho,
              height: p.alto,
              borderRadius: p.redondo ? p.ancho / 2 : 2,
              backgroundColor: p.color,
              opacity: a.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 1, 0] }),
              transform: [
                { translateY: a.interpolate({ inputRange: [0, 1], outputRange: [0, height + 40] }) },
                { translateX: a.interpolate({ inputRange: [0, 1], outputRange: [0, p.deriva] }) },
                { rotate: a.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.giro}deg`] }) },
              ],
            }}
          />
        );
      })}
    </View>
  );
}

export default function Confeti({ disparo }) {
  if (!disparo) return null;
  // La "key" distinta hace que React cree una lluvia nueva en cada disparo.
  return <Lluvia key={disparo} />;
}

const estilos = StyleSheet.create({
  // pointerEvents 'none': no bloquea los toques. overflow 'hidden': los papelitos
  // que se salen por las orillas no mueven ni agrandan la pantalla.
  capa: { zIndex: 20, pointerEvents: 'none', overflow: 'hidden' },
});
