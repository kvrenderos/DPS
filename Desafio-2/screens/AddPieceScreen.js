import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Modal,
  Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddPieceScreen({ navigation, pieces, setPieces }) {

  const [pieza, setPieza] = useState('');
  const [marca, setMarca] = useState('');
  const [serie, setSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');

  const [image, setImage] = useState(null);

  const [piecesList, setPiecesList] = useState([]);
  const [modalPiece, setModalPiece] = useState(false);
  const [newPieceName, setNewPieceName] = useState('');

  const [vehicles, setVehicles] = useState([]);
  const [modalVehicle, setModalVehicle] = useState(false);
  const [placa, setPlaca] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');

  // 📸 Seleccionar imagen
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso requerido", "Activa permisos para acceder a imágenes");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 💾 Guardar con validaciones PRO
  const handleSave = () => {

    if (!pieza.trim()) {
      Alert.alert("Error", "La pieza es obligatoria");
      return;
    }

    if (!marca.trim()) {
      Alert.alert("Error", "La marca es obligatoria");
      return;
    }

    if (!serie.trim()) {
      Alert.alert("Error", "El número de serie es obligatorio");
      return;
    }

    if (!precio || isNaN(precio)) {
      Alert.alert("Error", "Precio inválido");
      return;
    }

    if (!fecha.trim()) {
      Alert.alert("Error", "La fecha es obligatoria");
      return;
    }

    const newPiece = {
      id: Date.now().toString(),
      pieza,
      marca,
      serie,
      precio,
      fecha,
      vehiculo: selectedVehicle || "Sin vehículo",
      image
    };

    setPieces([...pieces, newPiece]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      {/* 🔥 INPUT MANUAL DE PIEZA */}
      <TextInput
        placeholder="Nombre de la pieza"
        style={styles.input}
        value={pieza}
        onChangeText={setPieza}
      />

      <Text>Seleccionar pieza:</Text>
      {piecesList.map((p, i) => (
        <Button key={i} title={p} onPress={() => setPieza(p)} />
      ))}

      <Button title="Agregar nueva pieza" onPress={() => setModalPiece(true)} />

      {/* 🔥 FEEDBACK */}
      <Text>Pieza seleccionada: {pieza}</Text>

      <TextInput
        placeholder="Marca"
        style={styles.input}
        value={marca}
        onChangeText={setMarca}
      />

      <TextInput
        placeholder="Serie"
        style={styles.input}
        value={serie}
        onChangeText={setSerie}
      />

      <TextInput
        placeholder="Precio"
        style={styles.input}
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
      />

      <Text>Vehículo:</Text>
      {vehicles.map((v, i) => (
        <Button key={i} title={v} onPress={() => setSelectedVehicle(v)} />
      ))}

      <Button title="Agregar vehículo" onPress={() => setModalVehicle(true)} />

      {/* 🔥 FEEDBACK VEHÍCULO */}
      <Text>Vehículo seleccionado: {selectedVehicle || "Ninguno"}</Text>

      <Button title="Seleccionar Imagen" onPress={pickImage} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 100, height: 100, marginTop: 10 }}
        />
      )}

      <Button title="Guardar" onPress={handleSave} />

      {/* 🔧 MODAL PIEZA */}
      <Modal visible={modalPiece} transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nueva pieza"
              style={styles.input}
              value={newPieceName}
              onChangeText={setNewPieceName}
            />

            <Button
              title="Guardar"
              onPress={() => {
                if (!newPieceName.trim()) return;
                setPiecesList([...piecesList, newPieceName]);
                setNewPieceName('');
                setModalPiece(false);
              }}
            />

            <Button title="Cancelar" onPress={() => setModalPiece(false)} />
          </View>
        </View>
      </Modal>

      {/* 🔧 MODAL VEHÍCULO */}
      <Modal visible={modalVehicle} transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Placa"
              style={styles.input}
              value={placa}
              onChangeText={setPlaca}
            />

            <Button
              title="Guardar"
              onPress={() => {
                if (!placa.trim()) return;
                setVehicles([...vehicles, placa]);
                setPlaca('');
                setModalVehicle(false);
              }}
            />

            <Button title="Cancelar" onPress={() => setModalVehicle(false)} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: '#F3F4F6'
  },

  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: '#fff'
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10
  }
});