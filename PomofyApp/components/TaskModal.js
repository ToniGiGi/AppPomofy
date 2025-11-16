import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
// --- ¡Volvemos a importar el Date Picker! ---
import DateTimePicker from '@react-native-community/datetimepicker';

// --- ¡NUEVAS PROPS! ---
export default function TaskModal({ visible, onAddTask, onClose }) {
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  // --- Lógica de Fecha ---
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };
  // --- Fin Lógica de Fecha ---

  // Limpia los campos
  const cleanFields = () => {
    setTitulo('');
    setMateria('');
    setDescripcion('');
    setDate(new Date());
  };

  const handleConfirmar = () => {
    if (!titulo || !materia || !date) {
      Alert.alert('Error', 'Título, materia y fecha son obligatorios.');
      return;
    }
    
    // --- ¡LA LÓGICA CLAVE! ---
    // 1. Creamos el objeto de la nueva tarea
    const newTask = {
      id: Date.now().toString(), // Un ID único basado en la fecha actual
      title: titulo,
      subject: materia,
      date: date.toLocaleDateString(), // Formateamos la fecha
      status: 'active', // <-- ¡Nuevas tareas son 'active' (azul) por defecto!
      description: descripcion || 'Sin descripción.', // Añadimos la descripción
    };

    // 2. Llamamos a la función del padre (HomeScreen)
    onAddTask(newTask);

    // 3. Limpiamos y cerramos
    cleanFields();
  };

  // Esta función se llama al "tocar afuera" o presionar "atrás"
  const handleClose = () => {
    cleanFields(); // Limpiamos por si el usuario dejó algo escrito
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose} 
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalBackdrop}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={handleClose} 
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                placeholder="Título de tarea"
                placeholderTextColor="#eee"
                value={titulo}
                onChangeText={setTitulo}
              />
              <TextInput
                style={styles.input}
                placeholder="Materia"
                placeholderTextColor="#eee"
                value={materia}
                onChangeText={setMateria}
              />
              
              <TextInput
                style={[styles.input, styles.inputDescripcion]}
                placeholder="Descripción (opcional)"
                placeholderTextColor="#eee"
                multiline={true}
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
              />

              {/* --- ¡NUEVO! Botón para Fecha (al final) --- */}
              <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>
                  Fecha límite: {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              
              {/* El DatePicker para iOS (se muestra encima del formulario) */}
              {showPicker && Platform.OS === 'ios' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="default"
                  onChange={onChangeDate}
                />
              )}

              {/* --- Botón Confirmar (Ocupa todo el ancho) --- */}
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>

            </SafeAreaView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* El DatePicker para Android (es un modal separado) */}
      {showPicker && Platform.OS === 'android' && (
         <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display="default"
            onChange={onChangeDate}
          />
      )}
    </Modal>
  );
};

// --- ESTILOS (MODIFICADOS) ---
const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1ABC9C', // Tu color turquesa
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
    color: '#333',
  },
  inputDescripcion: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  dateButton: { // <-- Estilo para el botón de fecha
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#333',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#FF6B6B', // Tu color coral
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});