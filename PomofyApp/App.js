import 'react-native-gesture-handler'; // <-- ¡Correcto! Sigue siendo la línea 1
import React from 'react';
// --- ¡NUEVO! Importamos el componente de gestos ---
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos todas las pantallas y navegadores
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';
import AppNavigator from './navigation/AppNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // --- ¡NUEVO! Envolvemos todo en GestureHandlerRootView ---
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false
          }}
        >
          {/* Pantallas de Autenticación */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registro" component={RegistroScreen} />

          {/* App Principal */}
          <Stack.Screen name="MainApp" component={AppNavigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
    // --- Fin del nuevo envoltorio ---
  );
}