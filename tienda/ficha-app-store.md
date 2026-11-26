# Ficha de VidaQuest para la App Store (iPhone)

Copia y pega estos textos en App Store Connect. La descripción completa y el aviso de privacidad
son los mismos de Google Play (ver `ficha-play-store.md` y `privacidad.md`).

## Datos básicos

| Campo | Valor |
|---|---|
| Nombre (máx. 30) | VidaQuest |
| Subtítulo (máx. 30) | Sube de nivel en la vida real |
| Bundle ID | com.luissoto19.vidaquest |
| SKU (código interno, lo que quieras) | vidaquest-001 |
| Idioma principal | Español (México) |
| Categoría principal | Estilo de vida |
| Categoría secundaria | Salud y forma física |
| Precio | Gratis |
| Dispositivos | Solo iPhone (no iPad) |

## Texto promocional (máx. 170, se puede cambiar sin nueva revisión)

```
Convierte tu vida en un juego: cumple misiones reales, sube tus barras de salud, amor, dinero e inteligencia, ¡y adopta tu mascota!
```

## Palabras clave (máx. 100 caracteres, separadas por comas, sin espacios)

```
hábitos,rutina,disciplina,metas,motivación,productividad,ahorro,bienestar,rpg,organización
```

## Descripción

Usa la misma "Descripción completa" de `ficha-play-store.md`.

## URLs (Apple pide las dos)

| Campo | Valor |
|---|---|
| URL de soporte | Una página con tu correo de contacto (puede ser la misma del aviso de privacidad) |
| URL de política de privacidad | La URL pública de `privacidad.md` |

## Capturas de pantalla

- **iPhone de 6.9"** (obligatorias): 1320 × 2868 píxeles, mínimo 1 y máximo 10. Recomendadas: Inicio,
  Misiones, Estilo, Mascotas, Logros y FODA.
- No se necesitan capturas de iPad, porque la app es solo para iPhone.

## Privacidad de la app ("etiqueta nutricional")

- ¿Recopilas datos de esta app? → **No, no recopilamos datos de esta app.**
  (Todo se guarda solo en el iPhone del usuario y nunca se envía a ningún servidor.)

## Clasificación por edad

Responde **Ninguno / No** en todas las preguntas: violencia, contenido sexual, lenguaje, drogas, apuestas,
terror, acceso sin restricciones a internet y contenido generado por usuarios. Resultado esperado: **4+**.

## Información para la revisión de Apple

- Inicio de sesión: **No se requiere** (la app no tiene cuentas).
- Notas para el revisor:

```
VidaQuest es una app de hábitos con mecánicas de juego. No requiere cuenta ni conexión a internet: toda la información se guarda localmente en el dispositivo. Al abrirla, crea un personaje (nombre, apariencia, cuestionario y FODA) y verás la pantalla principal con las misiones diarias. Las notificaciones son locales y opcionales (una frase motivacional diaria).
```

## Cumplimiento de exportación (cifrado)

Ya está configurado en `app.json` (`ITSAppUsesNonExemptEncryption: false`), así que Apple no preguntará
por cifrado en cada versión.
