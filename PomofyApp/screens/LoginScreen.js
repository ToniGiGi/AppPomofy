import React, { useState } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Modal, // Para la ventana emergente
  Pressable // Para los botones del modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PomySaludando from '../assets/pomysaludo.png';

// MODIFICADO: La pantalla ahora recibe la prop "navigation"
export default function LoginScreen({ navigation }) {

  // Estados para el login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para el Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState(''); 
  
  const handleForgotPassword = () => {
    Alert.alert(
      'Instrucciones Enviadas', 
      `Si existe una cuenta con ${recoveryEmail}, recibirás un correo.`
    );
    setModalVisible(false); // Cierra el modal
    setRecoveryEmail(''); // Limpia el input del modal
  };

  // Función de validación de Email
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // --- FUNCIÓN DE LOGIN MODIFICADA ---
  const handleLogin = () => {
    
    // 1. Verificación de campos vacíos
    if (!email && !password) {
      Alert.alert('Error', 'No puedes dejar los campos vacíos');
      return; 
    }

    // 2. Verificación de correo vacío
    if (!email) {
      Alert.alert('Error', 'Por favor ingresa un correo');
      return;
    }

    // 3. Verificación de contraseña vacía
    if (!password) {
      Alert.alert('Error', 'Por favor ingresa una contraseña');
      return;
    }

    // 4. Verificación de formato de correo válido
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo valido');
      return;
    }

    // --- ¡CAMBIO IMPORTANTE! ---
    // Si todo pasa, en lugar de una alerta, navegamos a la app principal
    // Usamos "replace" para que el usuario no pueda "volver" al Login
    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>

      {/* --- Modal de Recuperación de Contraseña --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Ingresa tu correo electrónico para mandarte las instrucciones de recuperación de tu cuenta
            </Text>
            <View style={styles.inputWithIcon}>
              <MaterialIcons name="email" size={24} color="#555" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="tu-correo@ejemplo.com"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={recoveryEmail}
                onChangeText={setRecoveryEmail}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.buttonSend]}
                onPress={handleForgotPassword}
              >
                <Text style={styles.textStyle}>Enviar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* --- FIN DEL MODAL --- */}


      {/* --- Contenido principal del Login --- */}
      <Image source={PomySaludando} style={styles.logo} />
      <Text style={styles.title}>POMOFY</Text>
      <View style={styles.inputContainer}>
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
      
      {/* Botón para abrir el Modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)}> 
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Botón de Iniciar Sesión (lleva a MainApp) */}
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
      {/* Botón de Registrarse (lleva a Registro) */}
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerButton}>Registrarse</Text>
      </TouchableOpacity>

    </View>
  );
}

// --- HOJA DE ESTILOS COMPLETA ---
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
    marginBottom: 40,
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
  forgotPassword: {
    color: '#FFF',
    fontSize: 14,
    width: '100%',
    textAlign: 'right',
    marginBottom: 30,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#90EE90',
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#2e2e2e',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // --- Estilos del Modal ---
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '48%',
  },
  buttonClose: {
    backgroundColor: '#FF6347',
  },
  buttonSend: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});