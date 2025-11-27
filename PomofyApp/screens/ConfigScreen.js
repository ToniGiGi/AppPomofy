import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// --- Importamos los Modales ---
import PreferencesModal from '../components/PreferencesModal';
import EditProfileModal from '../components/EditProfileModal'; // <-- ¡NUEVO!

export default function ConfigScreen() {
  
  // Estados para controlar los modales
  const [preferencesVisible, setPreferencesVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false); // <-- ¡NUEVO!

  const renderOption = (text, customOnPress) => (
    <TouchableOpacity 
      style={styles.optionRow} 
      onPress={customOnPress ? customOnPress : () => Alert.alert('Opción', `Has presionado: ${text}`)}
    >
      <Text style={styles.optionText}>{text}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#333" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Configuración</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Cuenta</Text>
        
        {renderOption('Preferencias', () => setPreferencesVisible(true))}
        
        {/* --- CONECTAMOS PERFIL --- */}
        {renderOption('Perfil', () => setEditProfileVisible(true))} 
        
        {renderOption('Notificaciones')}
        {renderOption('Redes sociales')}
        {renderOption('Tema')}
        {renderOption('Ajustes de privacidad')}

        <Text style={styles.sectionTitle}>Suscripción</Text>
        {renderOption('Escoge un plan')}

        <Text style={styles.sectionTitle}>Soporte</Text>
        {renderOption('Centro de ayuda')}
        {renderOption('Sugerencias')}

      </ScrollView>

      {/* --- RENDERIZAMOS LOS MODALES --- */}
      <PreferencesModal 
        visible={preferencesVisible} 
        onClose={() => setPreferencesVisible(false)} 
      />
      
      <EditProfileModal 
        visible={editProfileVisible} 
        onClose={() => setEditProfileVisible(false)} 
      />

    </SafeAreaView>
  );
}

// --- ESTILOS (Sin cambios) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2127',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerTitle: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#888',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});