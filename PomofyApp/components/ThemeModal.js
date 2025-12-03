import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default function ThemeModal({ visible, onClose }) {
  
  const [selectedTheme, setSelectedTheme] = useState('dark'); // Por defecto Oscuro

  if (!visible) return null;

  const handleSelect = (theme) => {
    setSelectedTheme(theme);
    // Aquí iría la lógica para cambiar el tema real de la app
    // Por ahora solo actualizamos el estado visual del modal
  };

  const renderThemeOption = (label, value, iconName) => (
    <TouchableOpacity 
      style={[
        styles.themeRow, 
        selectedTheme === value && styles.themeRowActive
      ]} 
      onPress={() => handleSelect(value)}
    >
      <View style={styles.iconTextContainer}>
        <MaterialIcons 
            name={iconName} 
            size={24} 
            color={selectedTheme === value ? "#1ABC9C" : "white"} 
            style={styles.icon}
        />
        <Text style={[
            styles.themeText,
            selectedTheme === value && styles.textActive
        ]}>
            {label}
        </Text>
      </View>
      
      {selectedTheme === value && (
        <MaterialIcons name="check-circle" size={24} color="#1ABC9C" />
      )}
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
              
              <Text style={styles.title}>ELEGIR TEMA</Text>

              <View style={styles.listContainer}>
                {renderThemeOption('Claro', 'light', 'wb-sunny')}
                {renderThemeOption('Oscuro', 'dark', 'nights-stay')}
                {renderThemeOption('Sistema', 'system', 'settings-brightness')}
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Listo</Text>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 25,
    letterSpacing: 1,
  },
  listContainer: {
    width: '100%',
  },
  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  themeRowActive: {
    backgroundColor: 'rgba(26, 188, 156, 0.1)', // Fondo sutil turquesa
    borderColor: '#1ABC9C', // Borde turquesa
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  themeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  textActive: {
    color: '#1ABC9C',
    fontWeight: 'bold',
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