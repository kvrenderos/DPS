import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Alert,
  TextInput
} from 'react-native';

export default function HomeScreen({ navigation, pieces, setPieces }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [search, setSearch] = useState('');

  const deletePiece = (id) => {
    Alert.alert(
      "Eliminar pieza",
      "¿Seguro que deseas eliminar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setPieces(pieces.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const openModal = (item) => {
    setSelectedPiece(item);
    setModalVisible(true);
  };

  // 🔥 FILTRO SEGURO + ORDEN
  const filteredPieces = pieces
    .filter(item =>
      (item.pieza || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.vehiculo || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.marca || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  return (
    <View style={styles.container}>

      <Button
        title="Agregar Pieza"
        onPress={() => navigation.navigate("Registrar Pieza")}
      />

      <TextInput
        placeholder="Buscar por pieza, marca o placa..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredPieces}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ marginTop: 20 }}>
            No hay piezas registradas
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => openModal(item)}
          >
            <View style={styles.card}>

              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageCard}
                />
              )}

              <Text style={styles.title}>{item.pieza}</Text>
              <Text>Fecha: {item.fecha}</Text>
              <Text>Vehículo: {item.vehiculo || "N/A"}</Text>

              <Button
                title="Eliminar"
                onPress={(e) => {
                  e.stopPropagation();
                  deletePiece(item.id);
                }}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>

            {selectedPiece?.image && (
              <Image
                source={{ uri: selectedPiece.image }}
                style={styles.imageModal}
              />
            )}

            <Text style={styles.title}>{selectedPiece?.pieza}</Text>
            <Text>Marca: {selectedPiece?.marca}</Text>
            <Text>Serie: {selectedPiece?.serie}</Text>
            <Text>Precio: {selectedPiece?.precio}</Text>
            <Text>Fecha: {selectedPiece?.fecha}</Text>
            <Text>Vehículo: {selectedPiece?.vehiculo}</Text>

            <Button
              title="Cerrar"
              onPress={() => setModalVisible(false)}
            />
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

  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#1E3A8A'
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1E3A8A'
  },

  imageCard: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10
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
    borderRadius: 15,
    alignItems: 'center'
  },

  imageModal: {
    width: 150,
    height: 150,
    marginBottom: 10
  }
});