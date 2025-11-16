// MODIFICADO: Importamos useEffect de React
import React, { useEffect } from 'react'; 
import { StyleSheet, Text, View, Image } from 'react-native';
import AppIcon from '../assets/iconp.png';

// MODIFICADO: La pantalla ahora recibe la prop "navigation"
export default function SplashScreen({ navigation }) {

  // NUEVO: Esta es la magia.
  useEffect(() => {
    // Esto crea un temporizador
    const timer = setTimeout(() => {
      // Después de 3000 milisegundos (3 segundos)...
      
      // ...usamos "navigation.replace"
      // "Replace" (reemplazar) quita la pantalla Splash de la pila
      // y la reemplaza por "Login".
      // ¡Esto previene que el usuario pueda presionar "atrás" y volver al Splash!
      navigation.replace('Login'); 

    }, 3000); // 3000 milisegundos = 3 segundos

    // Esto "limpia" el temporizador si el usuario sale de la app
    return () => clearTimeout(timer);

  }, [navigation]); // El 'useEffect' se ejecutará cuando 'navigation' esté listo


  // El resto de tu código de Splash Screen no cambia
  return (
    <View style={styles.container}>
      <Image source={AppIcon} style={styles.pomodoroImage} />
      
      <View style={styles.bottomTextContainer}> 
        <Text style={styles.sloganText}>Estudia mejor, enfócate con</Text>
        <Text style={styles.appNameText}>POMOFY</Text>
      </View>
    </View>
  );
}

// Tus estilos no cambian (asegúrate de que estén aquí)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fb463f', // El rojo de tu icono
    alignItems: 'center',
    justifyContent: 'center',
  },
  pomodoroImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  sloganText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  appNameText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});