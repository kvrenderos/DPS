import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image
} from 'react-native';

export default function HomeScreen({ navigation, pieces, setPieces }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const deletePiece = (id) => {
    setPieces(pieces.filter(item => item.id !== id));
  };

  const openModal = (item) => {
    setSelectedPiece(item);
    setModalVisible(true);
  };

  const sortedPieces = [...pieces].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  return (
    <View style={styles.container}>

      <Button
        title="Agregar Pieza"
        onPress={() => navigation.navigate("AddPiece")}
      />

      {pieces.length === 0 && (
        <Text>No hay piezas, agregue una</Text>
      )}

      <FlatList
        data={sortedPieces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.card}>

              {/* 🔥 IMAGEN EN CARD */}
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.imageCard}
                />
              )}

              <Text>Pieza: {item.pieza}</Text>
              <Text>Fecha: {item.fecha}</Text>

              <Button
                title="Eliminar"
                onPress={() => deletePiece(item.id)}
              />
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>

            {/* 🔥 IMAGEN EN MODAL */}
            {selectedPiece?.image && (
              <Image
                source={{ uri: selectedPiece.image }}
                style={styles.imageModal}
              />
            )}

            <Text>Pieza: {selectedPiece?.pieza}</Text>
            <Text>Marca: {selectedPiece?.marca}</Text>
            <Text>No Serie: {selectedPiece?.serie}</Text>
            <Text>Precio: {selectedPiece?.precio}</Text>
            <Text>Fecha: {selectedPiece?.fecha}</Text>

            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },

  card: {
    padding: 10,
    borderWidth: 1,
    marginTop: 10,
    alignItems: 'center'
  },

  imageCard: {
    width: 80,
    height: 80,
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
    alignItems: 'center'
  },

  imageModal: {
    width: 150,
    height: 150,
    marginBottom: 10
  }
});