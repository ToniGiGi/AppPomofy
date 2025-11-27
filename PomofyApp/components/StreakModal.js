import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

// Importamos la llama
import IconRacha from '../assets/iconracha.png';

export default function StreakModal({ visible, onClose, streak }) {
  if (!visible) return null;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      {/* Fondo oscuro */}
      <TouchableOpacity 
        style={styles.modalBackdrop} 
        onPress={onClose} 
        activeOpacity={1}
      >
        {/* Animación POP */}
        <Animated.View 
          entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
          exiting={FadeOut.duration(150)}
          style={styles.modalContainer}
        >
          {/* Contenido del Modal (Tarjeta Oscura) */}
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <SafeAreaView style={styles.contentInner}>
              
              {/* Número de Días */}
              <Text style={styles.streakNumber}>{streak}</Text>
              
              {/* Texto */}
              <Text style={styles.streakLabel}>DIAS DE RACHA</Text>
              
              {/* Llama Gigante */}
              <Image source={IconRacha} style={styles.bigFlame} />

            </SafeAreaView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#0d2b36', // Un azul muy oscuro (casi negro/petróleo) como en tu imagen
    borderRadius: 30,
    padding: 40,
    width: 300, // Cuadrado o casi cuadrado
    height: 320,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra/Elevación
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  contentInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakNumber: {
    fontSize: 80, // Número gigante
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 85, // Ajuste para que no tenga mucho espacio extra
  },
  streakLabel: {
    fontSize: 22,
    color: 'white',
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 1,
  },
  bigFlame: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});