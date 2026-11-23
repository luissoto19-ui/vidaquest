// Dibuja al personaje de cuerpo completo por capas (como muñeco de papel):
// sombra → capa → pelo de atrás → piernas → pantalón → zapatos → brazos → camisa
// → cabeza → cara → pelo → accesorio.
// Todo está en un "lienzo" de 200 x 400 y se escala al tamaño que pidas.
import React from 'react';
import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';
import { ITEMS_POR_ID } from '../data/tienda';

function oscurecer(hex, f = 0.75) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 255) * f));
  const g = Math.min(255, Math.round(((n >> 8) & 255) * f));
  const b = Math.min(255, Math.round((n & 255) * f));
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

const item = (id, defecto) => ITEMS_POR_ID[id] || ITEMS_POR_ID[defecto];

// ---------- Pelo ----------
function PeloAtras({ estilo, color }) {
  if (estilo === 'largo') return <Path d="M58 66 Q58 22 100 22 Q142 22 142 66 L148 152 Q100 164 52 152 Z" fill={color} />;
  if (estilo === 'chongo') return <Circle cx="100" cy="22" r="16" fill={color} />;
  if (estilo === 'coletas')
    return (
      <G>
        <Circle cx="54" cy="76" r="15" fill={color} />
        <Circle cx="146" cy="76" r="15" fill={color} />
      </G>
    );
  return null;
}

const CORTO = 'M62 68 Q58 26 100 26 Q142 26 138 68 Q130 46 100 44 Q72 44 62 68 Z';
const RIZOS = [[64, 58], [70, 40], [84, 29], [100, 25], [116, 29], [130, 40], [136, 58]];

function PeloFrente({ estilo, color }) {
  switch (estilo) {
    case 'calvo':
      return null;
    case 'largo':
      return <Path d="M62 74 Q56 24 100 24 Q144 24 138 74 Q134 42 106 40 Q92 54 64 58 Z" fill={color} />;
    case 'rizado':
      return (
        <G>
          <Path d={CORTO} fill={color} />
          {RIZOS.map(([x, y], i) => (
            <Circle key={i} cx={x} cy={y} r="13" fill={color} />
          ))}
        </G>
      );
    case 'mohicano':
      return <Path d="M88 50 Q90 4 100 2 Q110 4 112 50 Z" fill={color} />;
    default: // corto, chongo, coletas
      return <Path d={CORTO} fill={color} />;
  }
}

// ---------- Cara ----------
function Cara({ animo }) {
  const tinta = '#2D2638';
  return (
    <G>
      <Circle cx="86" cy="70" r="4.5" fill={tinta} />
      <Circle cx="114" cy="70" r="4.5" fill={tinta} />
      <Circle cx="87.5" cy="68.5" r="1.4" fill="#fff" />
      <Circle cx="115.5" cy="68.5" r="1.4" fill="#fff" />
      {animo === 'feliz' && (
        <G>
          <Path d="M86 86 Q100 100 114 86" stroke={tinta} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <Circle cx="76" cy="84" r="6" fill="#FF7A8A" opacity="0.35" />
          <Circle cx="124" cy="84" r="6" fill="#FF7A8A" opacity="0.35" />
        </G>
      )}
      {animo === 'normal' && (
        <Path d="M88 90 Q100 95 112 90" stroke={tinta} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}
      {animo === 'triste' && (
        <G>
          <Path d="M78 58 L93 62" stroke={tinta} strokeWidth="3" strokeLinecap="round" />
          <Path d="M122 58 L107 62" stroke={tinta} strokeWidth="3" strokeLinecap="round" />
          <Path d="M86 96 Q100 84 114 96" stroke={tinta} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </G>
      )}
    </G>
  );
}

// ---------- Ropa ----------
function Pantalon({ estilo, color }) {
  const oscuro = oscurecer(color);
  if (estilo === 'falda') return <Path d="M64 218 L136 218 L150 292 Q100 302 50 292 Z" fill={color} />;
  const largo = estilo === 'short' ? 52 : 117;
  return (
    <G>
      <Rect x="63" y="225" width="36" height={largo} rx="9" fill={color} />
      <Rect x="101" y="225" width="36" height={largo} rx="9" fill={color} />
      <Rect x="62" y="216" width="76" height="26" rx="6" fill={color} />
      {estilo === 'jeans' && (
        <G>
          <Line x1="100" y1="222" x2="100" y2="246" stroke={oscuro} strokeWidth="2" />
          <Path d="M70 226 Q78 236 88 226" stroke={oscuro} strokeWidth="2" fill="none" />
          <Path d="M112 226 Q122 236 130 226" stroke={oscuro} strokeWidth="2" fill="none" />
        </G>
      )}
      {estilo === 'deportivo' && (
        <G>
          <Rect x="65" y="232" width="4" height="106" fill="#fff" opacity="0.8" />
          <Rect x="131" y="232" width="4" height="106" fill="#fff" opacity="0.8" />
        </G>
      )}
    </G>
  );
}

function Zapato({ x, estilo, color }) {
  if (estilo === 'botas')
    return (
      <G>
        <Rect x={x - 18} y="306" width="36" height="40" rx="6" fill={color} />
        <Ellipse cx={x} cy="344" rx="22" ry="10" fill={color} />
        <Rect x={x - 22} y="349" width="44" height="5" rx="2" fill={oscurecer(color, 0.6)} />
      </G>
    );
  const suela = color.toUpperCase() === '#F2F2F2' ? '#CFCFD6' : '#FFFFFF';
  return (
    <G>
      <Ellipse cx={x} cy="343" rx="21" ry="11" fill={color} />
      <Rect x={x - 21} y="346" width="42" height="7" rx="3" fill={suela} />
    </G>
  );
}

function Camisa({ estilo, color, piel }) {
  const oscuro = oscurecer(color);
  const mangaLarga = estilo === 'sudadera' || estilo === 'traje';
  const altoManga = mangaLarga ? 106 : 42;
  return (
    <G>
      <Path d="M60 124 Q60 114 76 112 L124 112 Q140 114 140 124 L140 230 Q100 236 60 230 Z" fill={color} />
      <Rect x="37" y="116" width="26" height={altoManga} rx="12" fill={color} />
      <Rect x="137" y="116" width="26" height={altoManga} rx="12" fill={color} />

      {(estilo === 'playera' || estilo === 'sudadera') && <Path d="M88 112 Q100 124 112 112 Z" fill={piel} />}

      {estilo === 'playera' && (
        <Path d="M86 112 Q100 128 114 112" stroke={oscuro} strokeWidth="2.5" fill="none" />
      )}
      {estilo === 'camisa' && (
        <G>
          <Path d="M84 110 L100 128 L90 140 Z" fill={color === '#FFFFFF' ? '#E6E6EE' : '#FFFFFF'} />
          <Path d="M116 110 L100 128 L110 140 Z" fill={color === '#FFFFFF' ? '#E6E6EE' : '#FFFFFF'} />
          {[148, 168, 188, 208].map((y) => (
            <Circle key={y} cx="100" cy={y} r="2.5" fill={oscuro} />
          ))}
        </G>
      )}
      {estilo === 'sudadera' && (
        <G>
          <Path d="M74 112 Q100 98 126 112 Q100 120 74 112 Z" fill={oscuro} />
          <Path d="M76 186 L124 186 L132 226 L68 226 Z" fill={oscuro} />
          <Line x1="93" y1="118" x2="91" y2="150" stroke="#fff" strokeWidth="2" />
          <Line x1="107" y1="118" x2="109" y2="150" stroke="#fff" strokeWidth="2" />
        </G>
      )}
      {estilo === 'traje' && (
        <G>
          <Path d="M86 112 L114 112 L100 176 Z" fill="#FFFFFF" />
          <Path d="M97 120 L103 120 L107 162 L100 172 L93 162 Z" fill="#C0392B" />
          <Path d="M84 112 L100 176 L78 142 Z" fill={oscurecer(color, 1.4)} />
          <Path d="M116 112 L100 176 L122 142 Z" fill={oscurecer(color, 1.4)} />
          <Circle cx="100" cy="196" r="3" fill="#888" />
        </G>
      )}
    </G>
  );
}

// ---------- Accesorios ----------
function Accesorio({ estilo, color }) {
  switch (estilo) {
    case 'lentes':
      return (
        <G>
          <Circle cx="86" cy="70" r="11" stroke={color} strokeWidth="3" fill="rgba(255,255,255,0.25)" />
          <Circle cx="114" cy="70" r="11" stroke={color} strokeWidth="3" fill="rgba(255,255,255,0.25)" />
          <Line x1="97" y1="70" x2="103" y2="70" stroke={color} strokeWidth="3" />
          <Line x1="75" y1="68" x2="63" y2="66" stroke={color} strokeWidth="3" />
          <Line x1="125" y1="68" x2="137" y2="66" stroke={color} strokeWidth="3" />
        </G>
      );
    case 'lentesSol':
      return (
        <G>
          <Path d="M74 62 L98 62 Q98 80 86 80 Q74 80 74 62 Z" fill={color} />
          <Path d="M102 62 L126 62 Q126 80 114 80 Q102 80 102 62 Z" fill={color} />
          <Line x1="98" y1="64" x2="102" y2="64" stroke={color} strokeWidth="3" />
          <Line x1="74" y1="63" x2="63" y2="66" stroke={color} strokeWidth="3" />
          <Line x1="126" y1="63" x2="137" y2="66" stroke={color} strokeWidth="3" />
          <Path d="M79 66 L86 66" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
          <Path d="M107 66 L114 66" stroke="#fff" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
        </G>
      );
    case 'mono':
      return (
        <G>
          <Path d="M118 30 L104 20 L104 40 Z" fill={color} />
          <Path d="M118 30 L132 20 L132 40 Z" fill={color} />
          <Circle cx="118" cy="30" r="5" fill={oscurecer(color)} />
        </G>
      );
    case 'bufanda':
      return (
        <G>
          <Path d="M78 108 Q100 122 122 108 L124 120 Q100 134 76 120 Z" fill={color} />
          <Rect x="106" y="118" width="13" height="40" rx="4" fill={color} />
          <Line x1="108" y1="152" x2="117" y2="152" stroke={oscurecer(color)} strokeWidth="2" />
        </G>
      );
    case 'gorra':
      return (
        <G>
          <Path d="M60 60 Q60 18 100 18 Q140 18 140 60 Z" fill={color} />
          <Path d="M96 54 L164 58 Q166 67 150 67 L96 62 Z" fill={oscurecer(color)} />
          <Circle cx="100" cy="20" r="4" fill={oscurecer(color)} />
        </G>
      );
    case 'audifonos':
      return (
        <G>
          <Path d="M60 70 Q60 16 100 16 Q140 16 140 70" stroke={color} strokeWidth="7" fill="none" />
          <Rect x="51" y="58" width="15" height="26" rx="6" fill={color} />
          <Rect x="134" y="58" width="15" height="26" rx="6" fill={color} />
        </G>
      );
    case 'collar':
      return (
        <G>
          <Path d="M86 114 Q100 138 114 114" stroke={color} strokeWidth="3" fill="none" />
          <Path d="M100 142 L94 135 Q92 130 96 129 Q99 129 100 132 Q101 129 104 129 Q108 130 106 135 Z" fill="#FF5C8A" />
        </G>
      );
    case 'reloj':
      return (
        <G>
          <Rect x="138" y="208" width="24" height="10" rx="3" fill={color} />
          <Circle cx="150" cy="213" r="4" fill="#fff" />
        </G>
      );
    case 'corona':
      return (
        <G>
          <Path d="M68 36 L74 8 L87 24 L100 4 L113 24 L126 8 L132 36 Z" fill={color} />
          <Circle cx="100" cy="26" r="4" fill="#E74C3C" />
          <Circle cx="82" cy="30" r="3" fill="#3D8BFF" />
          <Circle cx="118" cy="30" r="3" fill="#2ECC71" />
        </G>
      );
    default:
      return null;
  }
}

// ---------- Personaje completo ----------
export default function Personaje({ apariencia, animo = 'feliz', alto = 320 }) {
  const { piel, colorPelo } = apariencia;
  const peinado = item(apariencia.peinado, 'pelo_corto').estilo;
  const camisa = item(apariencia.camisa, 'camisa_playera_azul');
  const pantalon = item(apariencia.pantalon, 'pant_jeans_azul');
  const zapatos = item(apariencia.zapatos, 'zap_tenis_blancos');
  const acc = apariencia.accesorio ? ITEMS_POR_ID[apariencia.accesorio] : null;

  return (
    <Svg width={alto * 0.5} height={alto} viewBox="0 0 200 400">
      <Ellipse cx="100" cy="364" rx="62" ry="9" fill="rgba(0,0,0,0.12)" />
      {acc?.estilo === 'capa' && <Path d="M64 116 L136 116 L162 336 Q100 350 38 336 Z" fill={acc.color} />}
      <PeloAtras estilo={peinado} color={colorPelo} />

      {/* Piernas y ropa de abajo */}
      <Rect x="67" y="225" width="28" height="115" rx="10" fill={piel} />
      <Rect x="105" y="225" width="28" height="115" rx="10" fill={piel} />
      <Pantalon estilo={pantalon.estilo} color={pantalon.color} />
      <Zapato x={81} estilo={zapatos.estilo} color={zapatos.color} />
      <Zapato x={119} estilo={zapatos.estilo} color={zapatos.color} />

      {/* Brazos, cuello y camisa */}
      <Rect x="40" y="122" width="20" height="106" rx="10" fill={piel} />
      <Rect x="140" y="122" width="20" height="106" rx="10" fill={piel} />
      <Circle cx="50" cy="232" r="11" fill={piel} />
      <Circle cx="150" cy="232" r="11" fill={piel} />
      <Rect x="89" y="96" width="22" height="22" rx="6" fill={piel} />
      <Camisa estilo={camisa.estilo} color={camisa.color} piel={piel} />

      {/* Cabeza */}
      <Circle cx="62" cy="72" r="8" fill={piel} />
      <Circle cx="138" cy="72" r="8" fill={piel} />
      <Circle cx="100" cy="68" r="38" fill={piel} />
      <Cara animo={animo} />
      <PeloFrente estilo={peinado} color={colorPelo} />

      {acc && acc.estilo !== 'capa' && <Accesorio estilo={acc.estilo} color={acc.color} />}
    </Svg>
  );
}
