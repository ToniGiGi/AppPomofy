import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated'; // <-- Importar

export default function PomoSettingsModal({ visible, onClose, onSelectDuration }) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customMinutes, setCustomMinutes] = useState('');

  const handleClose = () => {
    setShowCustomInput(false);
    setCustomMinutes('');
    onClose();
  };

  const handleCustomConfirm = () => {
    const minutes = parseInt(customMinutes);
    if (!customMinutes || isNaN(minutes) || minutes <= 0) {
      Alert.alert("Error", "Por favor ingresa un número válido.");
      return;
    }
    onSelectDuration(minutes);
    setShowCustomInput(false);
    setCustomMinutes('');
  };

  const renderOption = (title, timeText, minutesValue) => (
    <TouchableOpacity style={styles.optionButton} onPress={() => onSelectDuration(minutesValue)}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionTime}>{timeText}</Text>
    </TouchableOpacity>
  );

  if (!visible) return null;

  return (
    <Modal animationType="none" transparent={true} visible={true} onRequestClose={handleClose}>
      <TouchableOpacity style={styles.modalBackdrop} onPress={handleClose} activeOpacity={1}>
        
        {/* --- ANIMACIÓN --- */}
        <Animated.View 
          entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
          exiting={FadeOut.duration(150)}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <SafeAreaView style={styles.contentInner}>
              <Text style={styles.modalTitle}>CONFIGURA TU POMODORO</Text>
              
              {!showCustomInput ? (
                <>
                  <View style={styles.row}>
                    {renderOption('CLASICO', '25 min', 25)}
                    {renderOption('LARGO', '50 min', 50)}
                  </View>
                  <View style={styles.row}>
                    {renderOption('CORTO', '15 min', 15)}
                    <TouchableOpacity style={styles.optionButton} onPress={() => setShowCustomInput(true)}>
                      <Text style={styles.optionTitle}>PERSONALIZADO</Text>
                      <Text style={styles.optionTime}>Elegir...</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <View style={styles.customInputContainer}>
                  <Text style={styles.customLabel}>Ingresa duración (min):</Text>
                  <TextInput 
                    style={styles.input} placeholder="Ej: 40" placeholderTextColor="#999" keyboardType="numeric"
                    value={customMinutes} onChangeText={setCustomMinutes} autoFocus={true}
                  />
                  <View style={styles.row}>
                    <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={() => setShowCustomInput(false)}>
                      <Text style={styles.actionButtonText}>Atrás</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, styles.confirmButton]} onPress={handleCustomConfirm}>
                      <Text style={styles.actionButtonText}>Confirmar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
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
  modalContent: { backgroundColor: '#113142', borderRadius: 20, padding: 25, width: '90%', maxWidth: 400 },
  contentInner: { alignItems: 'center', width: '100%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 25, letterSpacing: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 15 },
  optionButton: { backgroundColor: '#F5DEB3', width: '48%', paddingVertical: 20, borderRadius: 15, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  optionTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  optionTime: { fontSize: 16, color: '#555' },
  customInputContainer: { width: '100%', alignItems: 'center' },
  customLabel: { color: '#ccc', marginBottom: 15, fontSize: 16 },
  input: { backgroundColor: 'white', width: '100%', borderRadius: 15, padding: 15, fontSize: 18, textAlign: 'center', color: '#333', marginBottom: 20 },
  actionButton: { width: '48%', paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
  cancelButton: { backgroundColor: '#555' },
  confirmButton: { backgroundColor: '#FF6B6B' },
  actionButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});