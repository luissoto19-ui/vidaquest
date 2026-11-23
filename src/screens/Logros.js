// Lista de logros: desbloqueados arriba a color, los que faltan en gris con su progreso.
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { BarraProgreso, Tarjeta, Titulo, Subtitulo } from '../components/UI';
import { LOGROS } from '../data/logros';
import { ITEMS_POR_ID } from '../data/tienda';
import { MASCOTAS_POR_ID } from '../data/mascotas';
import { useJuego } from '../estado/JuegoContext';
import { COLORES } from '../tema';

export default function Logros() {
  const { estado } = useJuego();
  const ordenados = [...LOGROS].sort(
    (a, b) => Number(estado.logros.includes(b.id)) - Number(estado.logros.includes(a.id))
  );

  return (
    <ScrollView contentContainerStyle={estilos.contenedor}>
      <Titulo>Logros</Titulo>
      <Subtitulo>
        Llevas {estado.logros.length} de {LOGROS.length}. Algunos te regalan ropa exclusiva que no se puede comprar.
      </Subtitulo>
      {ordenados.map((l) => {
        const tiene = estado.logros.includes(l.id);
        const [actual, meta] = l.progreso(estado);
        return (
          <Tarjeta key={l.id} style={[estilos.fila, !tiene && { opacity: 0.75 }]}>
            <View style={[estilos.medalla, tiene ? estilos.medallaOro : estilos.medallaGris]}>
              <Text style={{ fontSize: 26, opacity: tiene ? 1 : 0.35 }}>{l.emoji}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilos.nombre}>{l.nombre}</Text>
              <Text style={estilos.desc}>{l.descripcion}</Text>
              <Text style={estilos.premio}>
                +{l.monedas} 🪙{l.item ? ` · 🎁 ${ITEMS_POR_ID[l.item].nombre}` : ''}
                {l.mascota ? ` · ${MASCOTAS_POR_ID[l.mascota].emoji} ${MASCOTAS_POR_ID[l.mascota].especie}` : ''}
              </Text>
              {!tiene && (
                <View style={{ marginTop: 6 }}>
                  <BarraProgreso valor={(actual / meta) * 100} alto={6} />
                  <Text style={estilos.progreso}>
                    {actual}/{meta}
                  </Text>
                </View>
              )}
            </View>
            {tiene && <Text style={estilos.ok}>✓</Text>}
          </Tarjeta>
        );
      })}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { padding: 18, paddingBottom: 30 },
  fila: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  medalla: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  medallaOro: { backgroundColor: '#FFF4CC', borderWidth: 2, borderColor: COLORES.oro },
  medallaGris: { backgroundColor: '#F0EEF5' },
  nombre: { fontSize: 16, fontWeight: '800', color: COLORES.texto },
  desc: { fontSize: 13, color: COLORES.textoSuave, marginTop: 2 },
  premio: { fontSize: 12, color: COLORES.primario, fontWeight: '700', marginTop: 4 },
  progreso: { fontSize: 11, color: COLORES.textoSuave, marginTop: 2, fontWeight: '700' },
  ok: { fontSize: 22, color: COLORES.exito, fontWeight: '900', marginLeft: 8 },
});
