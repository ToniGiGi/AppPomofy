import React, { useState, useEffect } from 'react'; 
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Modal, 
  Pressable 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import PomySaludando from '../assets/pomysaludo.png';

// 1. Importamos el controlador de Usuarios
import { UsersController } from '../controllers/UsersController';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para el Modal de recuperación (sin cambios)
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState(''); 
  
  // --- 2. INICIALIZACIÓN DE LA BASE DE DATOS (SEED) ---
  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // A) Crear tabla
        await UsersController.initTable();
        // B) Insertar usuario maestro (Tony)
        // "INSERT OR IGNORE" en el controlador evita duplicados
        await UsersController.registerUser('tony@gmail.com', '12345');
        console.log('Base de datos de usuarios lista. Usuario Tony creado.');
      } catch (e) {
        console.error('Error DB Usuarios:', e);
      }
    };
    setupDatabase();
  }, []);

  const handleForgotPassword = () => {
    Alert.alert(
      'Instrucciones Enviadas', 
      `Si existe una cuenta con ${recoveryEmail}, recibirás un correo.`
    );
    setModalVisible(false); 
    setRecoveryEmail(''); 
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // --- 3. FUNCIÓN DE LOGIN REAL ---
  const handleLogin = async () => {
    
    // Validaciones básicas (Frontend)
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo valido');
      return;
    }

    // Validación de Base de Datos (Backend Local)
    try {
      const user = await UsersController.loginUser(email, password);
      
      if (user) {
        // ¡ÉXITO! Encontramos al usuario
        // console.log('Usuario logueado:', user); // Para debug
        navigation.replace('MainApp'); // Entramos a la app
      } else {
        // FRACASO. No existe o la contraseña está mal
        Alert.alert('Error', 'Correo o contraseña incorrectos.');
      }
    } catch (e) {
      Alert.alert('Error', 'Ocurrió un problema al intentar iniciar sesión.');
    }
  };

  return (
    <View style={styles.container}>

      {/* Modal Recuperación (Sin cambios) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
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

      {/* UI Principal */}
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
            autoCapitalize="none" // Importante para emails
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
      
      <TouchableOpacity onPress={() => setModalVisible(true)}> 
        <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin} // Llama a nuestra nueva función
      >
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerButton}>Registrarse</Text>
      </TouchableOpacity>

    </View>
  );
}

// --- ESTILOS (Sin cambios) ---
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
  // Estilos Modal
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
    shadowOffset: { width: 0, height: 2 },
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