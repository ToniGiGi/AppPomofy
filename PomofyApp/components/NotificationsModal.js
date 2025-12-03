import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  Switch
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

export default function NotificationsModal({ visible, onClose }) {
  
  // Estados para los diferentes tipos de notificaciones
  const [studyReminders, setStudyReminders] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [promoUpdates, setPromoUpdates] = useState(false);

  // Toggles
  const toggleStudy = () => setStudyReminders(prev => !prev);
  const toggleBreak = () => setBreakReminders(prev => !prev);
  const toggleSound = () => setSoundEffects(prev => !prev);
  const togglePromo = () => setPromoUpdates(prev => !prev);

  if (!visible) return null;

  const renderSwitchRow = (label, value, onValueChange) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#1ABC9C" }} // Riel Turquesa
        thumbColor={value ? "#FF6B6B" : "#f4f3f4"} // Botón Coral si activo
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
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
              
              <Text style={styles.title}>NOTIFICACIONES</Text>
              
              <Text style={styles.sectionHeader}>General</Text>
              {renderSwitchRow("Recordatorios de estudio", studyReminders, toggleStudy)}
              {renderSwitchRow("Avisos de descanso", breakReminders, toggleBreak)}
              
              <Text style={styles.sectionHeader}>Sonido</Text>
              {renderSwitchRow("Sonidos de alerta", soundEffects, toggleSound)}

              <Text style={styles.sectionHeader}>Otros</Text>
              {renderSwitchRow("Novedades y tips", promoUpdates, togglePromo)}

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Guardar cambios</Text>
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
    shadowRadius: 4,
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
    marginBottom: 15,
    letterSpacing: 1,
  },
  sectionHeader: {
    color: '#888', // Gris sutil para separar secciones
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)', // Línea muy sutil
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: '#FF6B6B', // Coral
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});