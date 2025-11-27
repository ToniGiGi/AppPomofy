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
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';
import ProfilePic from '../assets/tony.png';

export default function EditProfileModal({ visible, onClose }) {
  
  const [name, setName] = useState('Toni Garcia');
  const [username, setUsername] = useState('@tonygarcia692');
  const [email, setEmail] = useState('toni@email.com');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    if (!name || !username || !email) {
      Alert.alert('Error', 'Nombre, usuario y correo son obligatorios.');
      return;
    }
    Alert.alert('Perfil Actualizado', 'Tus datos se han guardado correctamente.');
    onClose();
  };

  const handleChangePhoto = () => {
    Alert.alert('Galería', 'Aquí se abriría la galería para seleccionar foto.');
  };

  const handleDeletePhoto = () => {
    Alert.alert('Eliminar', '¿Estás seguro de borrar tu foto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive' }
    ]);
  };

  if (!visible) return null;

  return (
    <Modal animationType="none" transparent={true} visible={true} onRequestClose={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
          
          <Animated.View 
            entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
            exiting={FadeOut.duration(150)}
            style={styles.modalContainer}
          >
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
              <SafeAreaView style={styles.contentInner}>
                
                <Text style={styles.title}>EDITAR PERFIL</Text>

                {/* ScrollView ocupa el espacio disponible */}
                <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
                  
                  {/* --- SECCIÓN DE FOTO --- */}
                  <View style={styles.photoSection}>
                    <Image source={ProfilePic} style={styles.profilePic} />
                    <View style={styles.photoButtons}>
                      <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
                        <Text style={styles.photoButtonText}>Cambiar foto</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.deletePhotoButton} onPress={handleDeletePhoto}>
                        <Text style={styles.deletePhotoText}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* --- INPUTS --- */}
                  <Text style={styles.label}>Nombre</Text>
                  <TextInput 
                    style={styles.input} 
                    value={name} 
                    onChangeText={setName} 
                    placeholder="Tu nombre"
                    placeholderTextColor="#999"
                  />

                  <Text style={styles.label}>Usuario</Text>
                  <TextInput 
                    style={styles.input} 
                    value={username} 
                    onChangeText={setUsername} 
                    placeholder="@usuario"
                    placeholderTextColor="#999"
                  />

                  <Text style={styles.label}>Correo Electrónico</Text>
                  <TextInput 
                    style={styles.input} 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address"
                    placeholder="ejemplo@mail.com"
                    placeholderTextColor="#999"
                  />

                  <Text style={styles.label}>Contraseña</Text>
                  <TextInput 
                    style={styles.input} 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry={true}
                    placeholder="Nueva contraseña"
                    placeholderTextColor="#999"
                  />
                  
                  {/* Espacio extra al final del scroll para que no choque */}
                  <View style={{ height: 20 }} /> 

                </ScrollView>

                {/* --- BOTONES DE ACCIÓN (Fijos abajo) --- */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.buttonText}>Guardar</Text>
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
    backgroundColor: '#113142',
    borderRadius: 20,
    padding: 25, // Un poco más de padding interno
    
    // --- ¡AQUÍ ESTÁ EL CAMBIO DE TAMAÑO! ---
    width: '90%', // Más ancho
    maxHeight: '92%', // Más alto (casi toda la pantalla)
    // ---------------------------------------
    
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentInner: {
    width: '100%',
    height: '100%', // Asegura que use todo el alto disponible
  },
  title: {
    fontSize: 22, // Un poco más grande
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  scrollArea: {
    flex: 1, // Permite que el scroll ocupe el espacio restante
    marginBottom: 10,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 25,
  },
  profilePic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  photoButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  photoButtonText: {
    color: '#1ABC9C',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deletePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  deletePhotoText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
    marginTop: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 14, // Inputs más cómodos
    marginBottom: 15,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)', // Línea sutil separadora
  },
  cancelButton: {
    backgroundColor: '#555',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});