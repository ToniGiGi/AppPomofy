import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  Linking, // Para abrir enlaces reales (opcional)
  Alert
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';
// Usamos FontAwesome porque tiene los logos de redes sociales
import { FontAwesome } from '@expo/vector-icons'; 

export default function SocialsModal({ visible, onClose }) {
  
  if (!visible) return null;

  const handlePress = (network) => {
    // Aquí podrías usar Linking.openURL('https://instagram.com/...')
    Alert.alert('Red Social', `Abriendo ${network}...`);
  };

  // Función para renderizar cada botón de red social
  const renderSocialButton = (name, iconName, color) => (
    <TouchableOpacity 
      style={styles.socialRow} 
      onPress={() => handlePress(name)}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <FontAwesome name={iconName} size={20} color="white" />
      </View>
      <Text style={styles.socialText}>{name}</Text>
      <FontAwesome name="angle-right" size={24} color="#555" />
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
          exiting={FadeOut.duration(150)}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <SafeAreaView style={styles.contentInner}>
              
              <Text style={styles.title}>SÍGUENOS</Text>
              <Text style={styles.subtitle}>Únete a la comunidad Pomofy</Text>

              <View style={styles.listContainer}>
                {renderSocialButton('Instagram', 'instagram', '#E1306C')}
                {renderSocialButton('Facebook', 'facebook', '#1877F2')}
                {renderSocialButton('Twitter / X', 'twitter', '#1DA1F2')}
                {renderSocialButton('TikTok', 'music', '#000000')} 
                {/* Usamos 'music' como sustituto de tiktok si no está disponible, o 'tiktok' en versiones nuevas */}
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Volver</Text>
              </TouchableOpacity>

            </SafeAreaView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
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
    backgroundColor: '#113142', // Azul Oscuro
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentInner: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 25,
  },
  listContainer: {
    width: '100%',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo blanco para resaltar
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  socialText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#FF6B6B', // Coral
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});