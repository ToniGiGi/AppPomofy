import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  Switch,
  ScrollView
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

const LANGUAGES = ['Español', 'Inglés', 'Francés', 'Alemán'];
const REGIONS = ['México', 'Estados Unidos', 'Brasil', 'Rusia'];

export default function PreferencesModal({ visible, onClose }) {
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  const [selectedLanguage, setSelectedLanguage] = useState('Español');
  const [selectedRegion, setSelectedRegion] = useState('México');

  const [currentView, setCurrentView] = useState('main');

  const toggleSound = () => setSoundEnabled(prev => !prev);
  const toggleVibration = () => setVibrationEnabled(prev => !prev);

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setCurrentView('main');
  };

  const handleSelectRegion = (reg) => {
    setSelectedRegion(reg);
    setCurrentView('main');
  };

  const renderMainView = () => (
    <>
      <Text style={styles.title}>PREFERENCIAS</Text>
      
      <Text style={styles.sectionHeader}>Experiencia</Text>

      <View style={styles.preferenceRow}>
        <Text style={styles.preferenceText}>Efectos de sonido</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#1ABC9C" }}
          thumbColor={soundEnabled ? "#FF6B6B" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSound}
          value={soundEnabled}
        />
      </View>

      <View style={styles.preferenceRow}>
        <Text style={styles.preferenceText}>Vibración</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#1ABC9C" }}
          thumbColor={vibrationEnabled ? "#FF6B6B" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleVibration}
          value={vibrationEnabled}
        />
      </View>

      <TouchableOpacity 
        style={styles.arrowRow} 
        onPress={() => setCurrentView('language')}
      >
        <View>
          <Text style={styles.preferenceText}>Idioma</Text>
          <Text style={styles.subValue}>{selectedLanguage}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.arrowRow} 
        onPress={() => setCurrentView('region')}
      >
        <View>
          <Text style={styles.preferenceText}>Región</Text>
          <Text style={styles.subValue}>{selectedRegion}</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="#888" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Listo</Text>
      </TouchableOpacity>
    </>
  );

  const renderSelectionList = (title, items, selectedItem, onSelect) => (
    <>
      <View style={styles.subHeader}>
        <TouchableOpacity onPress={() => setCurrentView('main')} style={styles.backArrow}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView style={styles.listContainer}>
        {items.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.selectionRow, 
              item === selectedItem && styles.selectionRowActive
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={[
              styles.preferenceText, 
              item === selectedItem && styles.textActive
            ]}>
              {item}
            </Text>
            
            {item === selectedItem && (
              <MaterialIcons name="check" size={24} color="#1ABC9C" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );

  if (!visible) return null;

  return (
    <Modal animationType="none" transparent={true} visible={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        
        <Animated.View 
          entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
          exiting={FadeOut.duration(150)}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <SafeAreaView style={styles.contentInner}>
              
              {currentView === 'main' && renderMainView()}
              
              {currentView === 'language' && renderSelectionList(
                'SELECCIONAR IDIOMA', 
                LANGUAGES, 
                selectedLanguage, 
                handleSelectLanguage
              )}
              
              {currentView === 'region' && renderSelectionList(
                'SELECCIONAR REGIÓN', 
                REGIONS, 
                selectedRegion, 
                handleSelectRegion
              )}

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
    backgroundColor: '#113142',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
    minHeight: 400,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    padding: 5,
  },
  sectionHeader: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 5,
    textTransform: 'uppercase',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  preferenceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  subValue: {
    color: '#1ABC9C',
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    maxHeight: 300,
  },
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  selectionRowActive: {
    backgroundColor: 'rgba(26, 188, 156, 0.1)',
    borderRadius: 10,
  },
  textActive: {
    color: '#1ABC9C',
    fontWeight: 'bold',
  },
});