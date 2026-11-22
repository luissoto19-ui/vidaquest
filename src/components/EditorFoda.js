// Editor de un cuadro del FODA: chips sugeridos + escribir los tuyos propios.
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CUADRANTES_FODA } from '../data/foda';
import { COLORES } from '../tema';
import { Chip } from './UI';

export default function EditorFoda({ cuadrante, valores, onChange }) {
  const info = CUADRANTES_FODA[cuadrante];
  const [texto, setTexto] = useState('');
  const sugeridos = info.opciones.map((o) => o.texto);
  const propios = valores.filter((v) => !sugeridos.includes(v.texto));

  const estaActivo = (t) => valores.some((v) => v.texto === t);

  const alternar = (opcion) => {
    if (estaActivo(opcion.texto)) onChange(valores.filter((v) => v.texto !== opcion.texto));
    else onChange([...valores, opcion]);
  };

  const agregar = () => {
    const limpio = texto.trim();
    if (!limpio || estaActivo(limpio)) return;
    onChange([...valores, { texto: limpio }]);
    setTexto('');
  };

  return (
    <View>
      <View style={estilos.chips}>
        {info.opciones.map((o) => (
          <Chip key={o.texto} texto={o.texto} activo={estaActivo(o.texto)} color={info.color} onPress={() => alternar(o)} />
        ))}
        {propios.map((v) => (
          <Chip key={v.texto} texto={`${v.texto}  ✕`} activo color={info.color} onPress={() => alternar(v)} />
        ))}
      </View>
      <View style={estilos.fila}>
        <TextInput
          style={estilos.input}
          placeholder="Escribe la tuya…"
          placeholderTextColor={COLORES.textoSuave}
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={agregar}
          returnKeyType="done"
        />
        <Pressable style={[estilos.mas, { backgroundColor: info.color }]} onPress={agregar}>
          <Text style={estilos.masTexto}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  fila: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COLORES.borde,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#fff',
    color: COLORES.texto,
  },
  mas: { width: 44, height: 44, borderRadius: 14, marginLeft: 8, alignItems: 'center', justifyContent: 'center' },
  masTexto: { color: '#fff', fontSize: 22, fontWeight: '800' },
});
