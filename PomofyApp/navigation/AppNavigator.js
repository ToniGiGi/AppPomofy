import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importamos los iconos
import IconHome from '../assets/iconhome.png';
import IconPomo from '../assets/iconpomo.png';
import IconCursos from '../assets/iconcursos.png';
import IconPerfil from '../assets/iconperfil.png';
import IconConfig from '../assets/iconconfig.png';

// Importamos las pantallas
import HomeScreen from '../screens/HomeScreen';
import PomoScreen from '../screens/PomoScreen';
import CursosScreen from '../screens/CursosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ConfigScreen from '../screens/ConfigScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      // Opciones para todas las pestañas
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar, // Tu estilo con height: 110

        // ELIMINAMOS 'tabBarItemStyle' porque no funcionó
        
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = IconHome;
          } else if (route.name === 'Pomo') {
            iconName = IconPomo;
          } else if (route.name === 'Cursos') {
            iconName = IconCursos;
          } else if (route.name === 'Perfil') {
            iconName = IconPerfil;
          } else if (route.name === 'Config') {
            iconName = IconConfig;
          }

          return (
            <Image 
              source={iconName} 
              style={{ 
                // Tus tamaños personalizados
                width: 60, 
                height: 50, 
                resizeMode: 'contain',
                opacity: focused ? 1 : 0.5,

                // --- ¡LA NUEVA SOLUCIÓN! (Añadimos 'marginTop') ---
                // (AlturaBarra 110 - AlturaIcono 50) / 2 = 30
                marginTop: 30,
                // --- FIN DE LA SOLUCIÓN ---
              }} 
            />
          );
        },
      })}
    >
      {/* Declaramos las 5 pestañas */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pomo" component={PomoScreen} />
      <Tab.Screen name="Cursos" component={CursosScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Config" component={ConfigScreen} />
    </Tab.Navigator>
  );
}

// --- HOJA DE ESTILOS MODIFICADA ---
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#161f24',
    // Tu altura personalizada
    height: 110, 
    borderTopWidth: 0, 
  },
});