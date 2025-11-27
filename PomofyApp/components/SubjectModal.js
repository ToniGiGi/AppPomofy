import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

// --- CAMBIO DE NOMBRES ---
const SUBJECTS = [
  'Libre',
  'Mate',    // Antes Matemáticas
  'Inglés',
  'Progra',  // Antes Programación
  'Física',
  'Literatura',
  'Historia',
  'Química'
];

export default function SubjectModal({ visible, onClose, onSelectSubject }) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customSubject, setCustomSubject] = useState('');

  const handleSelect = (subject) => {
    onSelectSubject(subject);
    resetAndClose();
  };

  const handleCustomConfirm = () => {
    if (!customSubject.trim()) {
      Alert.alert("Error", "Por favor escribe el nombre de la materia.");
      return;
    }
    onSelectSubject(customSubject);
    resetAndClose();
  };

  const resetAndClose = () => {
    setShowCustomInput(false);
    setCustomSubject('');
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal animationType="none" transparent={true} visible={true} onRequestClose={resetAndClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={resetAndClose}>
          
          <Animated.View 
            entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
            exiting={FadeOut.duration(150)}
            style={styles.modalContainer}
          >
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
              <SafeAreaView style={styles.contentInner}>
                
                <Text style={styles.title}>SELECCIONA MATERIA</Text>
                
                {!showCustomInput ? (
                  <>
                    {/* ¡CLAVE DEL ARREGLO! 
                       Usamos 'flex: 1' en el ScrollView. 
                       Esto le dice: "Ocupa todo el espacio disponible entre el Título y el Botón Cancelar, 
                       pero si creces más, activa el scroll en lugar de empujar cosas fuera".
                    */}
                    <ScrollView style={styles.scrollList} contentContainerStyle={styles.scrollContent}>
                      {SUBJECTS.map((subject, index) => (
                        <TouchableOpacity 
                          key={index} 
                          style={styles.optionButton}
                          onPress={() => handleSelect(subject)}
                        >
                          <Text style={styles.optionText}>{subject}</Text>
                        </TouchableOpacity>
                      ))}

                      <TouchableOpacity 
                        style={[styles.optionButton, styles.customOptionButton]} 
                        onPress={() => setShowCustomInput(true)}
                      >
                        <Text style={[styles.optionText, styles.customOptionText]}>+ Personalizado</Text>
                      </TouchableOpacity>

                    </ScrollView>

                    {/* El botón cancelar ahora siempre estará visible al fondo */}
                    <TouchableOpacity style={styles.cancelButton} onPress={resetAndClose}>
                      <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  /* --- VISTA DE INPUT (Sin cambios) --- */
                  <View style={styles.customInputView}>
                    <Text style={styles.subTitle}>Escribe el nombre:</Text>
                    <TextInput 
                      style={styles.input}
                      placeholder="Ej: Biología"
                      placeholderTextColor="#999"
                      value={customSubject}
                      onChangeText={setCustomSubject}
                      autoFocus={true}
                    />
                    <View style={styles.rowButtons}>
                      <TouchableOpacity style={[styles.actionButton, styles.backButton]} onPress={() => setShowCustomInput(false)}>
                        <Text style={styles.actionText}>Atrás</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionButton, styles.confirmButton]} onPress={handleCustomConfirm}>
                        <Text style={styles.actionText}>Confirmar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

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
    alignItems: 'center' 
  },
  modalContainer: { 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  modalContent: { 
    backgroundColor: '#113142', 
    borderRadius: 20, 
    padding: 20, 
    width: '85%', 
    // Limitamos la altura máxima al 70% de la pantalla para que no se salga
    maxHeight: '70%', 
  },
  contentInner: {
    width: '100%',
    height: '100%', // Forzamos a llenar el contenedor
  },
  title: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15, 
    letterSpacing: 1,
    flexShrink: 0 // El título no se encoge
  },
  // --- Estilos Corregidos del Scroll ---
  scrollList: {
    flex: 1, // Ocupa el espacio disponible
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 10,
    flexGrow: 0, // Permite que el contenido crezca naturalmente
  },
  // ------------------------------------
  optionButton: { 
    backgroundColor: '#F5DEB3', 
    paddingVertical: 15, 
    borderRadius: 10, 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  optionText: { 
    color: '#333', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  customOptionButton: {
    backgroundColor: 'rgba(245, 222, 179, 0.3)', 
    borderWidth: 1,
    borderColor: '#F5DEB3',
  },
  customOptionText: {
    color: '#F5DEB3',
  },
  cancelButton: { 
    marginTop: 5, 
    alignItems: 'center', 
    padding: 10,
    flexShrink: 0 // El botón no se encoge
  },
  cancelText: { 
    color: '#FF6B6B', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  
  // --- Estilos Input ---
  customInputView: {
    width: '100%',
    alignItems: 'center',
  },
  subTitle: {
    color: '#ddd',
    marginBottom: 10,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#555',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});