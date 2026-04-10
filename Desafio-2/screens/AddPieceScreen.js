import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
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

  const [errors, setErrors] = useState({});

  // 📷 SELECCIONAR IMAGEN
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permiso requerido", "Necesitas permitir acceso a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // VALIDACIONES
  const validate = () => {
    let newErrors = {};

    if (!pieza.trim()) {
      newErrors.pieza = "La pieza es requerida";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(pieza)) {
      newErrors.pieza = "Solo letras";
    }

    if (!marca.trim()) newErrors.marca = "Requerido";

    if (!serie.trim()) {
      newErrors.serie = "Requerido";
    } else if (serie.length < 5) {
      newErrors.serie = "Mínimo 5 caracteres";
    }

    if (!precio) {
      newErrors.precio = "Requerido";
    } else if (isNaN(precio)) {
      newErrors.precio = "Debe ser número";
    } else if (Number(precio) <= 0) {
      newErrors.precio = "Mayor a 0";
    }

    // VALIDACIÓN DE FECHA
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!fecha) {
      newErrors.fecha = "La fecha es requerida";
    } else if (!fechaRegex.test(fecha)) {
      newErrors.fecha = "Formato: YYYY-MM-DD";
    }

    if (!image) {
      newErrors.image = "Debes seleccionar una imagen";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      Alert.alert("Error", "Corrige los campos");
      return;
    }

    const newPiece = {
      id: Date.now().toString(),
      pieza,
      marca,
      serie,
      precio,
      fecha,
      image
    };

    setPieces([...pieces, newPiece]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <TextInput placeholder="Pieza" style={styles.input} onChangeText={setPieza} />
      {errors.pieza && <Text style={styles.error}>{errors.pieza}</Text>}

      <TextInput placeholder="Marca" style={styles.input} onChangeText={setMarca} />
      {errors.marca && <Text style={styles.error}>{errors.marca}</Text>}

      <TextInput placeholder="No Serie" style={styles.input} onChangeText={setSerie} />
      {errors.serie && <Text style={styles.error}>{errors.serie}</Text>}

      <TextInput
        placeholder="Precio"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setPrecio}
      />
      {errors.precio && <Text style={styles.error}>{errors.precio}</Text>}

      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        style={styles.input}
        onChangeText={setFecha}
      />
      {errors.fecha && <Text style={styles.error}>{errors.fecha}</Text>}

      <Button title="Seleccionar Imagen" onPress={pickImage} />
      {errors.image && <Text style={styles.error}>{errors.image}</Text>}

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, marginTop: 10 }}
        />
      )}

      <View style={{ marginTop: 10 }}>
        <Button title="Guardar" onPress={handleSave} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  input: {
    borderWidth: 1,
    marginBottom: 5,
    padding: 10
  },
  error: {
    color: 'red',
    marginBottom: 5
  }
});