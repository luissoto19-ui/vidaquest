// Tienda y vestidor: cambia ropa, peinado, accesorios, piel y color de pelo.
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Personaje from '../components/Personaje';
import { Boton, Chip, Tarjeta, Titulo } from '../components/UI';
import { LOGROS } from '../data/logros';
import { CATEGORIAS, COLORES_PELO, ITEMS, ITEMS_POR_ID, PIELES } from '../data/tienda';
import { useJuego } from '../estado/JuegoContext';
import { COLORES } from '../tema';
import { calcularAnimo } from '../utils/juego';
import { Muestras } from './Bienvenida';

const PESTANAS = ['peinado', 'camisa', 'pantalon', 'zapatos', 'accesorio', 'colores'];
const nombreLogro = (id) => LOGROS.find((l) => l.id === id)?.nombre;

export default function Personalizar() {
  const { estado, comprar, cambiarApariencia } = useJuego();
  const [pestana, setPestana] = useState('camisa');
  const [seleccion, setSeleccion] = useState(null); // prenda que estás "probándote" sin tenerla
  const { apariencia, inventario, monedas } = estado;

  // Si estás viendo una prenda que no tienes, el personaje te la muestra puesta.
  const itemVista = seleccion ? ITEMS_POR_ID[seleccion] : null;
  let vista = itemVista ? { ...apariencia, [itemVista.categoria]: itemVista.id } : apariencia;
  if (pestana === 'peinado') vista = { ...vista, accesorio: null };

  const tocar = (item) => {
    if (!item) {
      setSeleccion(null);
      cambiarApariencia('accesorio', null);
      return;
    }
    if (inventario.includes(item.id)) {
      setSeleccion(null);
      cambiarApariencia(item.categoria, item.id);
    } else {
      setSeleccion(item.id);
    }
  };

  const items = ITEMS.filter((i) => i.categoria === pestana);

  return (
    <View style={{ flex: 1 }}>
      <View style={estilos.cabecera}>
        <Titulo style={{ flex: 1, marginBottom: 0 }}>Personalizar</Titulo>
        <View style={estilos.pildora}>
          <Text style={estilos.pildoraTexto}>🪙 {monedas}</Text>
        </View>
      </View>

      <View style={estilos.escenario}>
        <Personaje apariencia={vista} animo={calcularAnimo(estado.barras)} alto={220} />
      </View>

      {itemVista && (
        <Tarjeta style={estilos.compra}>
          <View style={{ flex: 1 }}>
            <Text style={estilos.compraNombre}>{itemVista.nombre}</Text>
            <Text style={estilos.compraInfo}>
              {itemVista.logro
                ? `🔒 Se gana con el logro "${nombreLogro(itemVista.logro)}"`
                : monedas >= itemVista.precio
                ? `Cuesta ${itemVista.precio} 🪙`
                : `Te faltan ${itemVista.precio - monedas} 🪙. ¡Cumple misiones!`}
            </Text>
          </View>
          {!itemVista.logro && (
            <Boton
              titulo="Comprar"
              deshabilitado={monedas < itemVista.precio}
              onPress={() => {
                comprar(itemVista.id);
                setSeleccion(null);
              }}
              style={{ paddingVertical: 10 }}
            />
          )}
          <Pressable onPress={() => setSeleccion(null)} style={{ padding: 8 }}>
            <Text style={{ fontSize: 18, color: COLORES.textoSuave }}>✕</Text>
          </Pressable>
        </Tarjeta>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.pestanas} contentContainerStyle={{ paddingHorizontal: 18 }}>
        {PESTANAS.map((p) => (
          <Chip
            key={p}
            texto={p === 'colores' ? '🎨 Piel y pelo' : `${CATEGORIAS[p].emoji} ${CATEGORIAS[p].nombre}`}
            activo={pestana === p}
            onPress={() => {
              setPestana(p);
              setSeleccion(null);
            }}
          />
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={estilos.rejilla}>
        {pestana === 'colores' ? (
          <Tarjeta style={{ width: '100%' }}>
            <Text style={estilos.etiqueta}>Tono de piel</Text>
            <Muestras colores={PIELES} actual={apariencia.piel} onElegir={(c) => cambiarApariencia('piel', c)} />
            <Text style={estilos.etiqueta}>Color de pelo</Text>
            <Muestras colores={COLORES_PELO} actual={apariencia.colorPelo} onElegir={(c) => cambiarApariencia('colorPelo', c)} />
          </Tarjeta>
        ) : (
          <>
            {pestana === 'accesorio' && (
              <Pressable style={[estilos.item, !apariencia.accesorio && estilos.itemPuesto]} onPress={() => tocar(null)}>
                <Text style={{ fontSize: 34, marginVertical: 22 }}>🚫</Text>
                <Text style={estilos.itemNombre}>Ninguno</Text>
              </Pressable>
            )}
            {items.map((item) => {
              const tiene = inventario.includes(item.id);
              const puesto = apariencia[item.categoria] === item.id;
              return (
                <Pressable
                  key={item.id}
                  style={[estilos.item, puesto && estilos.itemPuesto, seleccion === item.id && estilos.itemViendo]}
                  onPress={() => tocar(item)}
                >
                  <Personaje
                    apariencia={{
                      ...apariencia,
                      [item.categoria]: item.id,
                      // en peinados quitamos el accesorio para que la gorra no tape el pelo
                      ...(item.categoria === 'peinado' ? { accesorio: null } : {}),
                    }}
                    alto={90}
                  />
                  <Text style={estilos.itemNombre} numberOfLines={1}>
                    {item.nombre}
                  </Text>
                  <Text style={[estilos.itemPrecio, tiene && { color: COLORES.exito }]}>
                    {puesto ? 'Puesto' : tiene ? 'Tuyo' : item.logro ? '🔒 Logro' : `${item.precio} 🪙`}
                  </Text>
                </Pressable>
              );
            })}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  cabecera: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingTop: 14 },
  pildora: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7 },
  pildoraTexto: { fontWeight: '800', fontSize: 15, color: COLORES.texto },
  escenario: {
    alignItems: 'center',
    backgroundColor: COLORES.primarioClaro,
    borderRadius: 28,
    marginHorizontal: 18,
    marginTop: 10,
    paddingVertical: 8,
  },
  compra: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 18, marginTop: 10, marginBottom: 0, padding: 12 },
  compraNombre: { fontWeight: '800', fontSize: 16, color: COLORES.texto },
  compraInfo: { color: COLORES.textoSuave, fontSize: 13, marginTop: 2 },
  pestanas: { flexGrow: 0, marginTop: 12, marginBottom: 4 },
  rejilla: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, paddingBottom: 30 },
  item: {
    width: '30%',
    margin: '1.66%',
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  itemPuesto: { borderColor: COLORES.exito },
  itemViendo: { borderColor: COLORES.primario },
  itemNombre: { fontSize: 12, fontWeight: '700', color: COLORES.texto, marginTop: 4, paddingHorizontal: 4 },
  itemPrecio: { fontSize: 12, fontWeight: '800', color: COLORES.primario, marginTop: 2 },
  etiqueta: { fontWeight: '700', color: COLORES.texto, marginBottom: 8, marginTop: 6, fontSize: 15 },
});
