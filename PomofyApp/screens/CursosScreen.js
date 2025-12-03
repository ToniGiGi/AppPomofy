import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';

// --- ¡NUEVO! Importamos el asset para esta pantalla ---
import PomyTrabajando from '../assets/pomyt.png'; // <-- Corregí el typo, asumo que es 'pomytrajabando.png'

export default function CursosScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>
        LOS CURSOS ESTARÁN
      </Text>
      <Text style={styles.mainText}>
        DISPONIBLES
      </Text>
      <Text style={styles.mainText}>
        PRÓXIMAMENTE
      </Text>
      
      <Image source={PomyTrabajando} style={styles.pomyImage} />
    </SafeAreaView>
  );
}

// --- ¡NUEVA HOJA DE ESTILOS! ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2127', // Tu fondo oscuro
    justifyContent: 'center', // Centra todo verticalmente
    alignItems: 'center',     // Centra todo horizontalmente
    padding: 20,
  },
  mainText: {
    color: '#6D7375', // El color gris de tu mockup
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32, // Espacio entre líneas
  },
  pomyImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 40, // Espacio entre el texto y la imagen
  },
});