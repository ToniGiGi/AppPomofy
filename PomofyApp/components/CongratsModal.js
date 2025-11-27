import React from 'react';
import { View, Text, StyleSheet, Modal, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated'; // <-- Importar
import PomyDormido from '../assets/pomydormido.png';

export default function CongratsModal({ visible, onDismiss }) {
  if (!visible) return null;

  return (
    <Modal animationType="none" transparent={true} visible={true} onRequestClose={onDismiss}>
      <TouchableOpacity style={styles.modalBackdrop} onPress={onDismiss} activeOpacity={1}>
        
        {/* --- ANIMACIÓN --- */}
        <Animated.View 
          entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
          exiting={FadeOut.duration(150)}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <SafeAreaView style={styles.contentInner}>
              <Text style={styles.title}>¡ Felicidades !</Text>
              <Text style={styles.subtitle}>Es hora de que tomes un descanso</Text>
              <Image source={PomyDormido} style={styles.pomyImage} />
            </SafeAreaView>
          </TouchableOpacity>
        </Animated.View>

      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '100%', alignItems: 'center', justifyContent: 'center' },
  modalContent: { backgroundColor: '#113142', borderRadius: 20, padding: 30, marginHorizontal: 20, elevation: 8 },
  contentInner: { justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 20, color: 'white', textAlign: 'center' },
  pomyImage: { width: 120, height: 120, resizeMode: 'contain', marginTop: 30 },
});