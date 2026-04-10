import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddPieceScreen from './screens/AddPieceScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [pieces, setPieces] = useState([]);

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