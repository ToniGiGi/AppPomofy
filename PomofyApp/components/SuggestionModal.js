import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

export default function SuggestionModal({ visible, onClose }) {
  
  const [suggestion, setSuggestion] = useState('');

  const handleSend = () => {
    if (!suggestion.trim()) {
      Alert.alert('Error', 'Por favor escribe tu sugerencia.');
      return;
    }
    // Aquí conectarías con tu API en el futuro
    Alert.alert('¡Gracias!', 'Tu sugerencia ha sido enviada al equipo de Pomofy.');
    setSuggestion(''); // Limpiar
    onClose(); // Cerrar
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
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
                
                <Text style={styles.title}>DÉJANOS UNA SUGERENCIA</Text>
                <Text style={styles.subtitle}>¡Tu opinión nos ayuda a mejorar!</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Escribe aquí..."
                  placeholderTextColor="#aaa"
                  multiline={true}
                  numberOfLines={5}
                  value={suggestion}
                  onChangeText={setSuggestion}
                  textAlignVertical="top" // Para Android
                />

                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.buttonText}>Enviar</Text>
                  </TouchableOpacity>
                </View>

              </SafeAreaView>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#333',
    height: 120, // Altura fija para el área de texto
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#555',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: '48%',
  },
  sendButton: {
    backgroundColor: '#FF6B6B', // Coral
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});