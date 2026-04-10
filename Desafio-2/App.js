import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddPieceScreen from './screens/AddPieceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [pieces, setPieces] = useState([]);
  const [loading, setLoading] = useState(true);

  // CARGAR DATOS
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // GUARDAR AUTOMÁTICO
  useEffect(() => {
    if (!loading) {
      saveData();
    }
  }, [pieces]);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('pieces', JSON.stringify(pieces));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <HomeScreen {...props} pieces={pieces} setPieces={setPieces} />
          )}
        </Stack.Screen>

        <Stack.Screen name="AddPiece">
          {(props) => (
            <AddPieceScreen {...props} pieces={pieces} setPieces={setPieces} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}