// Genera el ícono, la pantalla de carga y la imagen destacada de la Play Store.
// Uso:  node scripts/generar-imagenes.js
// Las imágenes quedan en la carpeta assets/.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SALIDA = path.join(__dirname, '..', 'assets');
fs.mkdirSync(SALIDA, { recursive: true });

// Las 4 barras de la vida (Salud, Amor, Dinero, Inteligencia) subiendo como escalera,
// con una estrellita de "subir de nivel". Lienzo de 1024 x 1024.
const BARRAS = `
  <rect x="232" y="600" width="120" height="200" rx="40" fill="#2ECC71"/>
  <rect x="392" y="500" width="120" height="300" rx="40" fill="#FF5C8A"/>
  <rect x="552" y="400" width="120" height="400" rx="40" fill="#F5B700"/>
  <rect x="712" y="300" width="120" height="500" rx="40" fill="#3D8BFF"/>
  <path d="M772 130 L796 196 L866 198 L811 241 L831 308 L772 268 L713 308 L733 241 L678 198 L748 196 Z" fill="#FFFFFF"/>
`;

const FONDO = `
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8A6CFF"/>
      <stop offset="1" stop-color="#5233D6"/>
    </linearGradient>
  </defs>`;

const svg = (ancho, alto, contenido) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">${contenido}</svg>`);

async function main() {
  // Ícono normal (cuadrado con fondo morado)
  await sharp(svg(1024, 1024, `${FONDO}<rect width="1024" height="1024" fill="url(#g)"/>${BARRAS}`))
    .png()
    .toFile(path.join(SALIDA, 'icon.png'));

  // Ícono adaptable de Android: solo el dibujo, más pequeño y centrado (Android le pone el fondo
  // y lo recorta en círculo, gota, etc. según el celular).
  await sharp(svg(1024, 1024, `<g transform="translate(512 512) scale(0.62) translate(-532 -512)">${BARRAS}</g>`))
    .png()
    .toFile(path.join(SALIDA, 'adaptive-icon.png'));

  // Dibujo para la pantalla de carga (fondo transparente; el color lo pone app.json)
  await sharp(svg(1024, 1024, `<g transform="translate(512 512) scale(0.8) translate(-532 -512)">${BARRAS}</g>`))
    .png()
    .toFile(path.join(SALIDA, 'splash-icon.png'));

  // Ícono pequeño de las notificaciones: Android lo pide blanco sobre transparente.
  const blanco = BARRAS.replace(/fill="#[0-9A-F]{6}"/gi, 'fill="#FFFFFF"');
  await sharp(svg(1024, 1024, `<g transform="translate(512 512) scale(0.9) translate(-532 -512)">${blanco}</g>`))
    .resize(96, 96)
    .png()
    .toFile(path.join(SALIDA, 'notification-icon.png'));

  // Ícono de la tienda: 512 x 512
  await sharp(path.join(SALIDA, 'icon.png')).resize(512, 512).png().toFile(path.join(SALIDA, 'play-store-icon-512.png'));

  // Imagen destacada de la Play Store: 1024 x 500
  const destacada = `${FONDO}
    <rect width="1024" height="500" fill="url(#g)"/>
    <g transform="translate(40 30) scale(0.42)">${BARRAS}</g>
    <text x="470" y="225" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#FFFFFF">VidaQuest</text>
    <text x="474" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="38" font-weight="600" fill="#E7E0FF">Sube de nivel en la vida real</text>`;
  await sharp(svg(1024, 500, destacada)).png().toFile(path.join(SALIDA, 'play-store-destacada.png'));

  console.log('Imágenes generadas en', SALIDA);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
