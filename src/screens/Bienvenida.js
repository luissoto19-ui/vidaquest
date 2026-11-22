// Lo primero que ve un jugador nuevo: nombre → personaje → cuestionario → FODA → notificación.
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Personaje from '../components/Personaje';
import EditorFoda from '../components/EditorFoda';
import { Boton, BarraProgreso, Chip, Tarjeta, Titulo, Subtitulo } from '../components/UI';
import { CUADRANTES_FODA, CUESTIONARIO, LISTA_CUADRANTES } from '../data/foda';
import { COLORES_PELO, ITEMS, PIELES } from '../data/tienda';
import { ESTADO_INICIAL, useJuego } from '../estado/JuegoContext';
import { AREAS, COLORES, LISTA_AREAS } from '../tema';

const PEINADOS_GRATIS = ITEMS.filter((i) => i.categoria === 'peinado' && i.precio === 0);
// Pasos: 0 nombre, 1 personaje, 2 cuestionario, 3-6 FODA, 7 notificación
const TOTAL_PASOS = 8;

export function Muestras({ colores, actual, onElegir }) {
  return (
    <View style={estilos.muestras}>
      {colores.map((c) => (
        <Pressable
          key={c}
          onPress={() => onElegir(c)}
          style={[estilos.muestra, { backgroundColor: c }, actual === c && estilos.muestraActiva]}
        />
      ))}
    </View>
  );
}

export default function Bienvenida() {
  const { crearPersonaje } = useJuego();
  const [paso, setPaso] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apariencia, setApariencia] = useState(ESTADO_INICIAL.apariencia);
  const [pregunta, setPregunta] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [foda, setFoda] = useState(ESTADO_INICIAL.foda);

  const siguiente = () => setPaso((p) => p + 1);
  const atras = () => setPaso((p) => Math.max(0, p - 1));

  const responder = (valor) => {
    setRespuestas((r) => ({ ...r, [pregunta]: valor }));
    if (pregunta < CUESTIONARIO.length - 1) setPregunta(pregunta + 1);
    else siguiente();
  };

  const terminar = () => {
    // Promedio de las respuestas de cada área = valor inicial de la barra.
    const barras = {};
    for (const area of LISTA_AREAS) {
      const valores = CUESTIONARIO.map((q, i) => (q.area === area ? respuestas[i] : null)).filter((v) => v != null);
      barras[area] = valores.length ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length) : 40;
    }
    crearPersonaje({ nombre: nombre.trim(), apariencia, barras, foda });
  };

  let contenido;
  if (paso === 0) {
    contenido = (
      <View>
        <Text style={estilos.logo}>🎮</Text>
        <Titulo style={{ textAlign: 'center', fontSize: 30 }}>VidaQuest</Titulo>
        <Subtitulo style={{ textAlign: 'center' }}>
          Tu vida es el juego. Cumple misiones reales, sube tus barras de Salud, Amor, Dinero e Inteligencia y
          conviértete en tu mejor versión.
        </Subtitulo>
        <Tarjeta>
          <Text style={estilos.etiqueta}>¿Cómo te llamas, jugador?</Text>
          <TextInput
            style={estilos.input}
            placeholder="Tu nombre de usuario"
            placeholderTextColor={COLORES.textoSuave}
            value={nombre}
            onChangeText={setNombre}
            maxLength={20}
          />
        </Tarjeta>
        <Boton titulo="Crear mi personaje" onPress={siguiente} deshabilitado={!nombre.trim()} />
      </View>
    );
  } else if (paso === 1) {
    contenido = (
      <View>
        <Titulo>Crea tu personaje</Titulo>
        <Subtitulo>Después podrás comprarle más ropa y accesorios con las monedas que ganes.</Subtitulo>
        <View style={{ alignItems: 'center' }}>
          <Personaje apariencia={apariencia} alto={260} />
        </View>
        <Tarjeta>
          <Text style={estilos.etiqueta}>Tono de piel</Text>
          <Muestras colores={PIELES} actual={apariencia.piel} onElegir={(c) => setApariencia({ ...apariencia, piel: c })} />
          <Text style={estilos.etiqueta}>Peinado</Text>
          <View style={estilos.muestras}>
            {PEINADOS_GRATIS.map((p) => (
              <Chip
                key={p.id}
                texto={p.nombre}
                activo={apariencia.peinado === p.id}
                onPress={() => setApariencia({ ...apariencia, peinado: p.id })}
              />
            ))}
          </View>
          <Text style={estilos.etiqueta}>Color de pelo</Text>
          <Muestras
            colores={COLORES_PELO}
            actual={apariencia.colorPelo}
            onElegir={(c) => setApariencia({ ...apariencia, colorPelo: c })}
          />
        </Tarjeta>
        <Boton titulo="Siguiente" onPress={siguiente} />
      </View>
    );
  } else if (paso === 2) {
    const q = CUESTIONARIO[pregunta];
    const info = AREAS[q.area];
    contenido = (
      <View>
        <Titulo>¿Cómo va tu vida hoy?</Titulo>
        <Subtitulo>
          Responde con honestidad, nadie más lo verá. Así sabremos con cuánto empieza cada barra. ({pregunta + 1}/
          {CUESTIONARIO.length})
        </Subtitulo>
        <Tarjeta>
          <Text style={[estilos.areaEtiqueta, { color: info.color }]}>
            {info.emoji} {info.nombre}
          </Text>
          <Text style={estilos.pregunta}>{q.pregunta}</Text>
          {q.opciones.map((o) => (
            <Pressable
              key={o.texto}
              style={[estilos.opcion, respuestas[pregunta] === o.valor && { borderColor: info.color }]}
              onPress={() => responder(o.valor)}
            >
              <Text style={estilos.opcionTexto}>{o.texto}</Text>
            </Pressable>
          ))}
        </Tarjeta>
        {pregunta > 0 && <Boton titulo="← Pregunta anterior" tipo="secundario" onPress={() => setPregunta(pregunta - 1)} />}
      </View>
    );
  } else if (paso >= 3 && paso <= 6) {
    const cuadrante = LISTA_CUADRANTES[paso - 3];
    const info = CUADRANTES_FODA[cuadrante];
    contenido = (
      <View>
        <Text style={estilos.pasoFoda}>Tu FODA · {paso - 2} de 4</Text>
        <Titulo>
          {info.emoji} {info.titulo}
        </Titulo>
        <Subtitulo>{info.pregunta} Elige las que apliquen o escribe las tuyas.</Subtitulo>
        {cuadrante === 'debilidades' && (
          <Tarjeta style={{ backgroundColor: '#FFF0F4' }}>
            <Text style={{ color: COLORES.texto }}>
              💡 Tus debilidades no te definen: la app las usa para darte misiones que te ayuden justo ahí.
            </Text>
          </Tarjeta>
        )}
        <Tarjeta>
          <EditorFoda cuadrante={cuadrante} valores={foda[cuadrante]} onChange={(v) => setFoda({ ...foda, [cuadrante]: v })} />
        </Tarjeta>
        <Boton titulo={foda[cuadrante].length ? 'Siguiente' : 'Saltar por ahora'} onPress={siguiente} />
      </View>
    );
  } else {
    contenido = (
      <View style={{ alignItems: 'center' }}>
        <Personaje apariencia={apariencia} alto={240} />
        <Titulo style={{ textAlign: 'center' }}>¡Listo, {nombre.trim()}!</Titulo>
        <Subtitulo style={{ textAlign: 'center' }}>
          Cada mañana te llegará una notificación con una frase motivacional. Tu personaje se pone triste si
          descuidas tus barras… ¡y feliz cuando las subes!
        </Subtitulo>
        <Boton titulo="¡Empezar mi aventura! 🚀" onPress={terminar} style={{ alignSelf: 'stretch' }} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={estilos.contenedor} keyboardShouldPersistTaps="handled">
      {paso > 0 && (
        <View style={estilos.cabecera}>
          <Pressable onPress={paso === 2 && pregunta > 0 ? () => setPregunta(pregunta - 1) : atras}>
            <Text style={estilos.atras}>←</Text>
          </Pressable>
          <View style={{ flex: 1 }}>
            <BarraProgreso valor={(paso / (TOTAL_PASOS - 1)) * 100} />
          </View>
        </View>
      )}
      {contenido}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 20, paddingBottom: 40, backgroundColor: COLORES.fondo, flexGrow: 1 },
  cabecera: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  atras: { fontSize: 26, color: COLORES.primario, marginRight: 12, fontWeight: '700' },
  logo: { fontSize: 72, textAlign: 'center', marginTop: 30, marginBottom: 6 },
  etiqueta: { fontWeight: '700', color: COLORES.texto, marginBottom: 8, marginTop: 6, fontSize: 15 },
  input: {
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    borderRadius: 14,
    padding: 14,
    fontSize: 17,
    color: COLORES.texto,
  },
  muestras: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  muestra: { width: 38, height: 38, borderRadius: 19, marginRight: 10, marginBottom: 10, borderWidth: 3, borderColor: '#fff' },
  muestraActiva: { borderColor: COLORES.primario, transform: [{ scale: 1.1 }] },
  areaEtiqueta: { fontWeight: '800', fontSize: 14, marginBottom: 6 },
  pregunta: { fontSize: 19, fontWeight: '700', color: COLORES.texto, marginBottom: 14 },
  opcion: {
    borderWidth: 2,
    borderColor: COLORES.borde,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  opcionTexto: { fontSize: 16, color: COLORES.texto, fontWeight: '600' },
  pasoFoda: { color: COLORES.primario, fontWeight: '800', marginBottom: 4 },
});
