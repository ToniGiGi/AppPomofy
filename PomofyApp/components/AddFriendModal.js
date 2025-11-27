import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated'; // <-- Importar

export default function AddFriendModal({ visible, onClose }) {
  const [username, setUsername] = useState('');

  const handleAddFriend = () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Por favor escribe un nombre de usuario.');
      return;
    }
    Alert.alert('Solicitud Enviada', `Se envió una solicitud a ${username}`);
    setUsername('');
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal animationType="none" transparent={true} visible={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          
          {/* --- ANIMACIÓN --- */}
          <Animated.View 
            entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
            exiting={FadeOut.duration(150)}
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
              <Text style={styles.label}>Ingresa nombre de usuario</Text>
              <TextInput 
                style={styles.input} placeholder="@nombre.usuario" placeholderTextColor="#aaa"
                value={username} onChangeText={setUsername} autoCapitalize="none"
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
                <Text style={styles.addButtonText}>Agregar amigo</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>

        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#009688', width: 300, borderRadius: 15, padding: 20, alignItems: 'center', elevation: 5 },
  label: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { backgroundColor: 'white', width: '100%', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 15, fontSize: 16, color: '#333', marginBottom: 20 },
  addButton: { backgroundColor: '#FF7058', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});