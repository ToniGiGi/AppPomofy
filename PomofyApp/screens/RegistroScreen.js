import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox'; // <-- NUEVO: Importamos el Checkbox
import PomySaludando from '../assets/pomysaludo.png';

// La pantalla recibe "navigation" para poder volver atrás
export default function RegistroScreen({ navigation }) {

  // NUEVOS Estados para el registro
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // Estado para el checkbox

  // NUEVA: Lógica de validación para el registro
  const handleRegister = () => {
    // 1. Validar campos vacíos
    if (!nombre || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    // 2. Validar Términos y Condiciones
    if (!isChecked) {
      Alert.alert('Error', 'Debes aceptar los Términos y condiciones.');
      return;
    }
    
    // (Aquí iría la lógica para crear el usuario en tu base de datos)
    Alert.alert('¡Éxito!', 'Cuenta creada exitosamente.');

    // Después de registrarse, lo mandamos al Login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={PomySaludando} style={styles.logo} />
      <Text style={styles.title}>POMOFY</Text>
      {/* NUEVO: Texto de Bienvenida */}
      <Text style={styles.welcomeText}>BIENVENIDO</Text>

      <View style={styles.inputContainer}>

        {/* --- NUEVO: Input de Nombre --- */}
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="person" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#aaa"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        {/* --- Input de Email --- */}
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="email" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="correo electrónico"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* --- Input de Contraseña --- */}
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="lock" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>
      
      {/* --- NUEVO: Checkbox de Términos --- */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setIsChecked}
          color={isChecked ? '#90EE90' : undefined}
        />
        <Text style={styles.checkboxLabel}>Términos y condiciones</Text>
      </View>

      {/* --- Botón de Crear Cuenta --- */}
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={handleRegister}
      >
        <Text style={styles.registerButtonText}>Crear cuenta</Text>
      </TouchableOpacity>

      {/* --- NUEVO: Botón para volver al Login --- */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backToLoginButton}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// --- ESTILOS --- (Muy parecidos al Login, con algunos añadidos)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c5f94',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFF',
  },
  welcomeText: { // NUEVO
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: '100%',
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  checkboxContainer: { // NUEVO
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  checkbox: { // NUEVO
    marginRight: 8,
  },
  checkboxLabel: { // NUEVO
    color: '#FFF',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#90EE90',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#2e2e2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backToLoginButton: { // NUEVO
    color: '#90EE90',
    fontSize: 16,
    fontWeight: 'bold',
  },
});