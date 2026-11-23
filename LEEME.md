# VidaQuest 🎮

Tu vida es el juego: cumple misiones reales y sube tus barras de Salud, Amor, Dinero e Inteligencia.

## Cómo abrir la app en tu celular

1. Instala **Expo Go** en tu celular (Play Store o App Store).
2. Conecta tu celular y tu computadora **a la misma red Wi-Fi**.
3. En la computadora, abre PowerShell en esta carpeta y escribe:

   ```powershell
   npx expo start
   ```

4. Aparecerá un **código QR**:
   - **Android:** abre Expo Go y toca "Scan QR code".
   - **iPhone:** abre la cámara y apunta al código.
5. ¡Listo! Cada vez que guardes un cambio en el código, la app se actualiza sola en tu celular.

Para detener el servidor presiona `Ctrl + C` en PowerShell.

## Para verla en el navegador de la computadora

```powershell
npx expo start --web
```

(En el navegador no hay notificaciones; esas solo funcionan en el celular.)

## Guardar una copia (respaldo en GitHub)

Cada vez que termines un cambio que te guste, en PowerShell dentro de esta carpeta escribe:

```powershell
.\guardar "lo que cambiaste"
```

Por ejemplo: `.\guardar "agregué 5 frases nuevas"`. Eso guarda la copia en tu computadora y la sube a
https://github.com/luissoto19-ui/vidaquest (privado). Si algo se rompe, siempre podemos regresar a una copia anterior.

## Publicar en Play Store

Archivos listos:
- `assets/`: ícono, ícono de notificación, pantalla de carga e imagen destacada (se regeneran con `node scripts/generar-imagenes.js`).
- `tienda/ficha-play-store.md`: todos los textos y respuestas para Google Play Console.
- `tienda/privacidad.md`: aviso de privacidad (necesita estar publicado en una URL pública).
- `eas.json`: configuración para compilar con EAS (el servicio de Expo).

Compilar:

```powershell
npx eas-cli build -p android --profile preview      # APK para instalar en tu celular y probar
npx eas-cli build -p android --profile production   # AAB para subir a Google Play
```

Al publicar una versión nueva, la versión interna (`versionCode`) sube sola. Si cambias algo grande,
también sube `version` en `app.json` (por ejemplo de 1.0.0 a 1.1.0).

## Dónde cambiar cada cosa

| Quiero cambiar…                     | Archivo                          |
|-------------------------------------|----------------------------------|
| Misiones                            | `src/data/misiones.js`           |
| Frases motivacionales               | `src/data/frases.js`             |
| Ropa, peinados y precios            | `src/data/tienda.js`             |
| Logros                              | `src/data/logros.js`             |
| Opciones del FODA y el cuestionario | `src/data/foda.js`               |
| Colores de la app                   | `src/tema.js`                    |
| Dibujo del personaje                | `src/components/Personaje.js`    |
| Pantallas                           | `src/screens/`                   |
| Lógica del juego (guardar, premios) | `src/estado/JuegoContext.js`     |
