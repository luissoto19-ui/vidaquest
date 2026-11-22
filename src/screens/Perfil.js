// Perfil: estadísticas, tu FODA (editable), hora de la frase motivacional y reiniciar.
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import EditorFoda from '../components/EditorFoda';
import { Boton, Tarjeta, Titulo, Subtitulo } from '../components/UI';
import { CUADRANTES_FODA, LISTA_CUADRANTES } from '../data/foda';
import { useJuego } from '../estado/JuegoContext';
import { notificacionDePrueba, notificacionesDisponibles } from '../notificaciones';
import { AREAS, COLORES, LISTA_AREAS } from '../tema';
import { calcularNivel } from '../utils/juego';

const dosDigitos = (n) => String(n).padStart(2, '0');

function Dato({ valor, etiqueta }) {
  return (
    <View style={estilos.dato}>
      <Text style={estilos.datoValor}>{valor}</Text>
      <Text style={estilos.datoEtiqueta}>{etiqueta}</Text>
    </View>
  );
}

export default function Perfil() {
  const { estado, actualizarFoda, cambiarNotificacion, reiniciar } = useJuego();
  const [editando, setEditando] = useState(null);
  const [confirmarReinicio, setConfirmarReinicio] = useState(false);
  const [mensajePrueba, setMensajePrueba] = useState('');
  const { stats, racha, notificacion, foda } = estado;

  const moverHora = (delta) => {
    let total = notificacion.hora * 60 + notificacion.minuto + delta;
    total = (total + 24 * 60) % (24 * 60);
    cambiarNotificacion({ hora: Math.floor(total / 60), minuto: total % 60 });
  };

  return (
    <ScrollView contentContainerStyle={estilos.contenedor} keyboardShouldPersistTaps="handled">
      <Titulo>{estado.nombre}</Titulo>
      <Subtitulo>Nivel {calcularNivel(estado.xp)} · {estado.xp} XP en total</Subtitulo>

      <Tarjeta style={estilos.datos}>
        <Dato valor={stats.total} etiqueta="Misiones" />
        <Dato valor={`🔥 ${racha.dias}`} etiqueta="Racha" />
        <Dato valor={racha.mejor || 0} etiqueta="Mejor racha" />
        <Dato valor={estado.logros.length} etiqueta="Logros" />
      </Tarjeta>

      <Tarjeta>
        <Text style={estilos.seccion}>Misiones por área</Text>
        {LISTA_AREAS.map((a) => (
          <View key={a} style={estilos.filaArea}>
            <Text style={{ fontSize: 15, color: COLORES.texto }}>
              {AREAS[a].emoji} {AREAS[a].nombre}
            </Text>
            <Text style={{ fontWeight: '800', color: AREAS[a].color }}>{stats[a]}</Text>
          </View>
        ))}
      </Tarjeta>

      <Text style={[estilos.seccion, { marginTop: 6 }]}>🧭 Mi FODA</Text>
      <Text style={estilos.ayuda}>Toca un cuadro para editarlo. Tus debilidades deciden qué misiones te recomendamos.</Text>
      <View style={estilos.foda}>
        {LISTA_CUADRANTES.map((c) => {
          const info = CUADRANTES_FODA[c];
          return (
            <Pressable
              key={c}
              onPress={() => setEditando(editando === c ? null : c)}
              style={[estilos.cuadro, { borderTopColor: info.color }, editando === c && { borderColor: info.color }]}
            >
              <Text style={estilos.cuadroTitulo}>
                {info.emoji} {info.titulo}
              </Text>
              {foda[c].length === 0 ? (
                <Text style={estilos.vacio}>Toca para agregar</Text>
              ) : (
                foda[c].map((v) => (
                  <Text key={v.texto} style={estilos.cuadroItem}>
                    • {v.texto}
                  </Text>
                ))
              )}
            </Pressable>
          );
        })}
      </View>
      {editando && (
        <Tarjeta>
          <Text style={estilos.seccion}>
            Editar {CUADRANTES_FODA[editando].titulo.toLowerCase()}
          </Text>
          <EditorFoda cuadrante={editando} valores={foda[editando]} onChange={(v) => actualizarFoda(editando, v)} />
          <Boton titulo="Listo" tipo="secundario" onPress={() => setEditando(null)} style={{ marginTop: 10 }} />
        </Tarjeta>
      )}

      <Tarjeta>
        <View style={estilos.filaArea}>
          <Text style={estilos.seccion}>☀️ Frase motivacional diaria</Text>
          <Switch value={notificacion.activa} onValueChange={(v) => cambiarNotificacion({ activa: v })} />
        </View>
        {notificacion.activa && (
          <View style={estilos.hora}>
            <Pressable style={estilos.horaBoton} onPress={() => moverHora(-30)}>
              <Text style={estilos.horaBotonTexto}>−</Text>
            </Pressable>
            <Text style={estilos.horaTexto}>
              {dosDigitos(notificacion.hora)}:{dosDigitos(notificacion.minuto)}
            </Text>
            <Pressable style={estilos.horaBoton} onPress={() => moverHora(30)}>
              <Text style={estilos.horaBotonTexto}>＋</Text>
            </Pressable>
          </View>
        )}
        {notificacionesDisponibles ? (
          <Boton
            titulo="Probar notificación (llega en 5 s)"
            tipo="secundario"
            onPress={async () => {
              const ok = await notificacionDePrueba();
              setMensajePrueba(ok ? '¡Enviada! Bloquea la pantalla o sal de la app.' : 'Activa los permisos de notificación.');
            }}
          />
        ) : (
          <Text style={estilos.ayuda}>Las notificaciones solo funcionan en el celular, no en el navegador.</Text>
        )}
        {!!mensajePrueba && <Text style={[estilos.ayuda, { marginTop: 8 }]}>{mensajePrueba}</Text>}
      </Tarjeta>

      <Boton
        titulo={confirmarReinicio ? '¿Seguro? Se borra TODO. Toca otra vez' : 'Reiniciar juego'}
        tipo="secundario"
        style={confirmarReinicio && { backgroundColor: '#FFE1E6' }}
        onPress={() => (confirmarReinicio ? reiniciar() : setConfirmarReinicio(true))}
      />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 18, paddingBottom: 40 },
  datos: { flexDirection: 'row', justifyContent: 'space-between' },
  dato: { alignItems: 'center', flex: 1 },
  datoValor: { fontSize: 20, fontWeight: '800', color: COLORES.texto },
  datoEtiqueta: { fontSize: 12, color: COLORES.textoSuave, marginTop: 2 },
  seccion: { fontSize: 17, fontWeight: '800', color: COLORES.texto, marginBottom: 8 },
  filaArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  ayuda: { color: COLORES.textoSuave, fontSize: 13, marginBottom: 10, lineHeight: 18 },
  foda: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 6 },
  cuadro: {
    width: '48.5%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    minHeight: 110,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopWidth: 5,
  },
  cuadroTitulo: { fontWeight: '800', color: COLORES.texto, marginBottom: 6 },
  cuadroItem: { fontSize: 12, color: COLORES.texto, marginBottom: 2 },
  vacio: { fontSize: 12, color: COLORES.textoSuave, fontStyle: 'italic' },
  hora: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 12 },
  horaBoton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORES.primarioClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  horaBotonTexto: { fontSize: 22, color: COLORES.primario, fontWeight: '800' },
  horaTexto: { fontSize: 32, fontWeight: '800', color: COLORES.texto, marginHorizontal: 24 },
});
