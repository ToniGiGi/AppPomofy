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

// --- Imports de Modales ---
import PreferencesModal from '../components/PreferencesModal';
import EditProfileModal from '../components/EditProfileModal';
import NotificationsModal from '../components/NotificationsModal';
import SocialsModal from '../components/SocialsModal';
import ThemeModal from '../components/ThemeModal';
import PrivacyModal from '../components/PrivacyModal';
import SubscriptionModal from '../components/SubscriptionModal';
import HelpModal from '../components/HelpModal';
import SuggestionModal from '../components/SuggestionModal'; // <-- ¡NUEVO!

export default function ConfigScreen() {
  
  // Estados para controlar los modales
  const [preferencesVisible, setPreferencesVisible] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [socialsVisible, setSocialsVisible] = useState(false);
  const [themeVisible, setThemeVisible] = useState(false);
  const [privacyVisible, setPrivacyVisible] = useState(false);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [suggestionVisible, setSuggestionVisible] = useState(false); // <-- ¡NUEVO!

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
        {renderOption('Perfil', () => setEditProfileVisible(true))} 
        {renderOption('Notificaciones', () => setNotificationsVisible(true))}
        {renderOption('Redes sociales', () => setSocialsVisible(true))}
        {renderOption('Tema', () => setThemeVisible(true))}
        {renderOption('Ajustes de privacidad', () => setPrivacyVisible(true))}

        <Text style={styles.sectionTitle}>Suscripción</Text>
        {renderOption('Escoge un plan', () => setSubscriptionVisible(true))}

        <Text style={styles.sectionTitle}>Soporte</Text>
        {renderOption('Centro de ayuda', () => setHelpVisible(true))}
        
        {/* --- Conectamos Sugerencias --- */}
        {renderOption('Sugerencias', () => setSuggestionVisible(true))}

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
      <NotificationsModal
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />
      <SocialsModal
        visible={socialsVisible}
        onClose={() => setSocialsVisible(false)}
      />
      <ThemeModal
        visible={themeVisible}
        onClose={() => setThemeVisible(false)}
      />
      <PrivacyModal
        visible={privacyVisible}
        onClose={() => setPrivacyVisible(false)}
      />
      <SubscriptionModal
        visible={subscriptionVisible}
        onClose={() => setSubscriptionVisible(false)}
      />
      <HelpModal
        visible={helpVisible}
        onClose={() => setHelpVisible(false)}
      />
      {/* --- ¡NUEVO MODAL! --- */}
      <SuggestionModal
        visible={suggestionVisible}
        onClose={() => setSuggestionVisible(false)}
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