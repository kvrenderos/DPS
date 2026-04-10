import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';

export default function AddPieceScreen({ navigation, pieces, setPieces }) {

  const [pieza, setPieza] = useState('');
  const [marca, setMarca] = useState('');
  const [serie, setSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSave = () => {
    if (!pieza || !marca || !serie || !precio || !fecha) {
      alert("Completa todos los campos");
      return;
    }

    const newPiece = {
      id: Date.now().toString(),
      pieza,
      marca,
      serie,
      precio,
      fecha
    };

    setPieces([...pieces, newPiece]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <TextInput placeholder="Pieza" style={styles.input} onChangeText={setPieza} />
      <TextInput placeholder="Marca" style={styles.input} onChangeText={setMarca} />
      <TextInput placeholder="No Serie" style={styles.input} onChangeText={setSerie} />
      <TextInput placeholder="Precio" style={styles.input} keyboardType="numeric" onChangeText={setPrecio} />
      <TextInput placeholder="Fecha (YYYY-MM-DD)" style={styles.input} onChangeText={setFecha} />

      <Button title="Guardar" onPress={handleSave} />
      <Button title="Cancelar" onPress={() => navigation.goBack()} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8
  }
});