// Dibuja a la mascota por capas (cola → cuerpo → orejas → cabeza → cara → accesorio).
// Lienzo de 120 x 120. Cuando está feliz, da saltitos.
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import Svg, { Circle, Ellipse, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import { MASCOTAS_POR_ID } from '../data/mascotas';

const TINTA = '#2D2638';

// ---------- Partes de atrás (cola, alas) ----------
function Atras({ especie, c, c2 }) {
  switch (especie) {
    case 'perro':
      return <Path d="M84 84 Q102 70 98 58" stroke={c2} strokeWidth="7" fill="none" strokeLinecap="round" />;
    case 'gato':
      return <Path d="M84 92 Q108 88 100 62" stroke={c} strokeWidth="7" fill="none" strokeLinecap="round" />;
    case 'zorro':
      return (
        <G>
          <Path d="M80 92 Q114 96 108 62 Q96 74 80 82 Z" fill={c} />
          <Path d="M108 62 Q104 72 98 76 Q110 74 108 62 Z" fill="#FFFFFF" />
        </G>
      );
    case 'dragon':
      return (
        <G>
          <Path d="M84 92 Q110 98 112 80 L104 84 Z" fill={c} />
          <Path d="M38 74 Q14 58 18 44 Q28 56 40 62 Z" fill={c2} />
          <Path d="M82 74 Q106 58 102 44 Q92 56 80 62 Z" fill={c2} />
        </G>
      );
    default:
      return null;
  }
}

// ---------- Orejas (se dibujan antes de la cabeza) ----------
function Orejas({ especie, c, c2 }) {
  switch (especie) {
    case 'gato':
      return (
        <G>
          <Path d="M38 40 L40 14 L58 30 Z" fill={c} />
          <Path d="M82 40 L80 14 L62 30 Z" fill={c} />
          <Path d="M42 34 L43 21 L52 29 Z" fill="#F7A8C0" />
          <Path d="M78 34 L77 21 L68 29 Z" fill="#F7A8C0" />
        </G>
      );
    case 'conejo':
      return (
        <G>
          <Ellipse cx="50" cy="16" rx="7" ry="20" fill={c} />
          <Ellipse cx="70" cy="16" rx="7" ry="20" fill={c} />
          <Ellipse cx="50" cy="17" rx="3" ry="14" fill={c2} />
          <Ellipse cx="70" cy="17" rx="3" ry="14" fill={c2} />
        </G>
      );
    case 'panda':
      return (
        <G>
          <Circle cx="40" cy="30" r="9" fill={c2} />
          <Circle cx="80" cy="30" r="9" fill={c2} />
        </G>
      );
    case 'zorro':
      return (
        <G>
          <Path d="M36 42 L38 12 L58 30 Z" fill={c} />
          <Path d="M84 42 L82 12 L62 30 Z" fill={c} />
          <Path d="M37 22 L38 12 L45 18 Z" fill={TINTA} />
          <Path d="M83 22 L82 12 L75 18 Z" fill={TINTA} />
        </G>
      );
    case 'buho':
      return (
        <G>
          <Path d="M38 36 L36 16 L52 28 Z" fill={c} />
          <Path d="M82 36 L84 16 L68 28 Z" fill={c} />
        </G>
      );
    case 'dragon':
      return (
        <G>
          <Path d="M44 32 L42 14 L52 28 Z" fill="#F5E6A8" />
          <Path d="M76 32 L78 14 L68 28 Z" fill="#F5E6A8" />
        </G>
      );
    default:
      return null;
  }
}

// ---------- Detalles de la cara según la especie ----------
function Hocico({ especie, c, c2 }) {
  switch (especie) {
    case 'perro':
      return (
        <G>
          <Ellipse cx="37" cy="50" rx="7" ry="15" fill={c2} />
          <Ellipse cx="83" cy="50" rx="7" ry="15" fill={c2} />
          <Ellipse cx="60" cy="60" rx="11" ry="8" fill="#F1D3B3" />
          <Ellipse cx="60" cy="56" rx="4" ry="3" fill={TINTA} />
        </G>
      );
    case 'gato':
      return (
        <G>
          <Path d="M57 56 L63 56 L60 59 Z" fill="#F07A9B" />
          <Line x1="44" y1="58" x2="30" y2="55" stroke={TINTA} strokeWidth="1.5" />
          <Line x1="44" y1="61" x2="30" y2="63" stroke={TINTA} strokeWidth="1.5" />
          <Line x1="76" y1="58" x2="90" y2="55" stroke={TINTA} strokeWidth="1.5" />
          <Line x1="76" y1="61" x2="90" y2="63" stroke={TINTA} strokeWidth="1.5" />
        </G>
      );
    case 'conejo':
      return <Ellipse cx="60" cy="57" rx="3.5" ry="2.5" fill="#F07A9B" />;
    case 'pato':
      return (
        <G>
          <Path d="M56 30 Q60 18 64 30" stroke={c} strokeWidth="5" fill="none" strokeLinecap="round" />
          <Ellipse cx="60" cy="60" rx="11" ry="5" fill={c2} />
        </G>
      );
    case 'panda':
      return (
        <G>
          <Ellipse cx="49" cy="51" rx="8" ry="9" fill={c2} />
          <Ellipse cx="71" cy="51" rx="8" ry="9" fill={c2} />
          <Ellipse cx="60" cy="59" rx="4" ry="3" fill={c2} />
        </G>
      );
    case 'zorro':
      return (
        <G>
          <Path d="M40 56 Q60 80 80 56 Q70 66 60 66 Q50 66 40 56 Z" fill={c2} />
          <Ellipse cx="60" cy="60" rx="3.5" ry="2.5" fill={TINTA} />
        </G>
      );
    case 'buho':
      return (
        <G>
          <Circle cx="50" cy="50" r="10" fill={c2} />
          <Circle cx="70" cy="50" r="10" fill={c2} />
          <Path d="M57 58 L63 58 L60 64 Z" fill="#F28C28" />
        </G>
      );
    case 'dragon':
      return (
        <G>
          <Circle cx="56" cy="58" r="1.5" fill={TINTA} />
          <Circle cx="64" cy="58" r="1.5" fill={TINTA} />
        </G>
      );
    default:
      return null;
  }
}

function Ojos({ animo, especie }) {
  const blanco = especie === 'panda';
  const ojo = blanco ? '#FFFFFF' : TINTA;
  if (animo === 'dormido') {
    return (
      <G>
        <Path d="M45 51 Q50 55 55 51" stroke={blanco ? '#fff' : TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <Path d="M65 51 Q70 55 75 51" stroke={blanco ? '#fff' : TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <SvgText x="88" y="26" fontSize="14" fontWeight="bold" fill="#7A7391">z</SvgText>
        <SvgText x="98" y="14" fontSize="10" fontWeight="bold" fill="#7A7391">z</SvgText>
      </G>
    );
  }
  return (
    <G>
      <Circle cx="50" cy="51" r="4" fill={ojo} />
      <Circle cx="70" cy="51" r="4" fill={ojo} />
      {!blanco && <Circle cx="51.3" cy="49.7" r="1.3" fill="#fff" />}
      {!blanco && <Circle cx="71.3" cy="49.7" r="1.3" fill="#fff" />}
      {blanco && <Circle cx="50" cy="51" r="2" fill={TINTA} />}
      {blanco && <Circle cx="70" cy="51" r="2" fill={TINTA} />}
      {animo === 'triste' && (
        <G>
          <Line x1="43" y1="42" x2="54" y2="45" stroke={TINTA} strokeWidth="2" strokeLinecap="round" />
          <Line x1="77" y1="42" x2="66" y2="45" stroke={TINTA} strokeWidth="2" strokeLinecap="round" />
        </G>
      )}
    </G>
  );
}

function Boca({ animo, especie }) {
  if (especie === 'pato' || animo === 'dormido') return null;
  const y = especie === 'perro' || especie === 'zorro' ? 64 : 62;
  if (animo === 'triste') return <Path d={`M54 ${y + 4} Q60 ${y - 1} 66 ${y + 4}`} stroke={TINTA} strokeWidth="2" fill="none" strokeLinecap="round" />;
  if (animo === 'normal') return <Line x1="56" y1={y + 1} x2="64" y2={y + 1} stroke={TINTA} strokeWidth="2" strokeLinecap="round" />;
  return (
    <G>
      <Path d={`M54 ${y} Q60 ${y + 7} 66 ${y}`} stroke={TINTA} strokeWidth="2" fill="none" strokeLinecap="round" />
      <Circle cx="42" cy="60" r="4" fill="#FF7A8A" opacity="0.35" />
      <Circle cx="78" cy="60" r="4" fill="#FF7A8A" opacity="0.35" />
    </G>
  );
}

function Accesorio({ id }) {
  switch (id) {
    case 'am_mono':
      return (
        <G>
          <Path d="M76 30 L66 22 L66 38 Z" fill="#FF5C8A" />
          <Path d="M76 30 L86 22 L86 38 Z" fill="#FF5C8A" />
          <Circle cx="76" cy="30" r="4" fill="#D63E6A" />
        </G>
      );
    case 'am_collar':
      return (
        <G>
          <Rect x="42" y="72" width="36" height="6" rx="3" fill="#E74C3C" />
          <Circle cx="60" cy="82" r="4" fill="#F5B700" />
        </G>
      );
    case 'am_sombrero':
      return (
        <G>
          <Path d="M48 30 L60 2 L72 30 Z" fill="#6C4CF1" />
          <Circle cx="60" cy="3" r="4" fill="#F5B700" />
          <Circle cx="56" cy="20" r="2" fill="#FFFFFF" />
          <Circle cx="64" cy="14" r="2" fill="#FFFFFF" />
        </G>
      );
    case 'am_lentes':
      return (
        <G>
          <Circle cx="50" cy="51" r="8" stroke={TINTA} strokeWidth="2.5" fill="rgba(255,255,255,0.25)" />
          <Circle cx="70" cy="51" r="8" stroke={TINTA} strokeWidth="2.5" fill="rgba(255,255,255,0.25)" />
          <Line x1="58" y1="51" x2="62" y2="51" stroke={TINTA} strokeWidth="2.5" />
        </G>
      );
    case 'am_corona':
      return (
        <G>
          <Path d="M46 30 L49 12 L56 22 L60 8 L64 22 L71 12 L74 30 Z" fill="#F5B700" />
          <Circle cx="60" cy="24" r="2.5" fill="#E74C3C" />
        </G>
      );
    default:
      return null;
  }
}

function Dibujo({ especie, animo, accesorio, alto }) {
  const info = MASCOTAS_POR_ID[especie];
  const c = info.color;
  const c2 = info.color2;
  const borde = c.toUpperCase() === '#FFFFFF' || c.toUpperCase() === '#F4F1EE' ? '#D9D3E6' : 'none';

  return (
    <Svg width={alto} height={alto} viewBox="0 0 120 120">
      <Ellipse cx="60" cy="112" rx="30" ry="5" fill="rgba(0,0,0,0.12)" />
      <Atras especie={especie} c={c} c2={c2} />
      {/* cuerpo y patitas */}
      <Ellipse cx="60" cy="88" rx="27" ry="21" fill={c} stroke={borde} strokeWidth="1.5" />
      {(especie === 'buho' || especie === 'dragon' || especie === 'zorro') && (
        <Ellipse cx="60" cy="92" rx="15" ry="13" fill={c2} />
      )}
      {especie === 'pato' ? (
        <G>
          <Ellipse cx="49" cy="108" rx="8" ry="4" fill={c2} />
          <Ellipse cx="71" cy="108" rx="8" ry="4" fill={c2} />
        </G>
      ) : (
        <G>
          <Ellipse cx="47" cy="106" rx="8" ry="5" fill={especie === 'panda' ? c2 : c} stroke={borde} strokeWidth="1.5" />
          <Ellipse cx="73" cy="106" rx="8" ry="5" fill={especie === 'panda' ? c2 : c} stroke={borde} strokeWidth="1.5" />
        </G>
      )}
      <Orejas especie={especie} c={c} c2={c2} />
      <Circle cx="60" cy="52" r="26" fill={c} stroke={borde} strokeWidth="1.5" />
      <Hocico especie={especie} c={c} c2={c2} />
      <Ojos animo={animo} especie={especie} />
      <Boca animo={animo} especie={especie} />
      <Accesorio id={accesorio} />
    </Svg>
  );
}

export default function Mascota({ especie, animo = 'feliz', accesorio = null, alto = 110, saltar = true }) {
  const salto = useRef(new Animated.Value(0)).current;
  const feliz = animo === 'feliz' && saltar;

  useEffect(() => {
    if (!feliz) {
      salto.setValue(0);
      return;
    }
    // Saltito que se repite: sube, baja y descansa un momento.
    const bucle = Animated.loop(
      Animated.sequence([
        Animated.timing(salto, { toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(salto, { toValue: 0, duration: 260, easing: Easing.in(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
        Animated.delay(1400),
      ])
    );
    bucle.start();
    return () => bucle.stop();
  }, [feliz]);

  if (!MASCOTAS_POR_ID[especie]) return null;
  const translateY = salto.interpolate({ inputRange: [0, 1], outputRange: [0, -alto * 0.12] });
  return (
    <Animated.View style={{ transform: [{ translateY }] }}>
      <Dibujo especie={especie} animo={animo} accesorio={accesorio} alto={alto} />
    </Animated.View>
  );
}
