import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default function HelpModal({ visible, onClose }) {
  
  if (!visible) return null;

  const handlePressTopic = (topic) => {
    Alert.alert('Ayuda', `Abriendo artículo sobre: ${topic}`);
  };

  const handleContact = () => {
    Alert.alert('Soporte', 'Abriendo chat con soporte...');
  };

  const renderFaqItem = (icon, text) => (
    <TouchableOpacity style={styles.faqRow} onPress={() => handlePressTopic(text)}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name={icon} size={20} color="#1ABC9C" />
      </View>
      <Text style={styles.faqText}>{text}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#555" />
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
              
              <Text style={styles.title}>CENTRO DE AYUDA</Text>
              <Text style={styles.subtitle}>¿En qué podemos ayudarte?</Text>

              <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
                
                <Text style={styles.sectionLabel}>Preguntas Frecuentes</Text>
                {renderFaqItem('timer', 'Cómo funciona el Pomodoro')}
                {renderFaqItem('check-circle', 'Gestión de tareas')}
                {renderFaqItem('stacked-bar-chart', 'Estadísticas y Racha')}
                {renderFaqItem('person', 'Cuenta y Perfil')}
                {renderFaqItem('verified-user', 'Privacidad y Datos')}

              </ScrollView>

              {/* Botón Contacto */}
              <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
                <MaterialIcons name="support-agent" size={20} color="white" style={{marginRight: 8}} />
                <Text style={styles.contactButtonText}>Contactar Soporte</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>Cerrar</Text>
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
    maxHeight: '80%', // Para que no se salga si hay muchas opciones
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentInner: {
    width: '100%',
    height: '100%',
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
  listContainer: {
    marginBottom: 10,
  },
  sectionLabel: {
    color: '#1ABC9C', // Turquesa
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  iconWrapper: {
    width: 30,
    alignItems: 'center',
  },
  faqText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
    fontWeight: '500',
  },
  contactButton: {
    backgroundColor: '#FF6B6B', // Coral
    flexDirection: 'row',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  closeText: {
    color: '#888',
    fontSize: 14,
  },
});