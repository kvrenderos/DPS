import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import AddPieceScreen from './screens/AddPieceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar datos
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('pieces');
      if (data !== null) {
        setPieces(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // 💾 Guardar automáticamente
  useEffect(() => {
    if (!loading) {
      saveData();
    }
  }, [pieces]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('pieces', JSON.stringify(pieces));
      console.log("Datos guardados ✔");
    } catch (error) {
      console.log("Error guardando datos:", error);
    }
  };

  // 🔥 PANTALLA DE CARGA PRO
  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6'
      }}>
        <ActivityIndicator size="large" color="#1E3A8A" />
        <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1E3A8A'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >

        <Stack.Screen name="Historial de Piezas">
          {(props) => (
            <HomeScreen {...props} pieces={pieces} setPieces={setPieces} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Registrar Pieza">
          {(props) => (
            <AddPieceScreen {...props} pieces={pieces} setPieces={setPieces} />
          )}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}