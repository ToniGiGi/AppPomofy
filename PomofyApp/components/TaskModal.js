import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// 1. Importamos Reanimated para el POP
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

export default function TaskModal({ visible, onAddTask, onEditTask, onClose, taskToEdit }) {
  
  const [titulo, setTitulo] = useState('');
  const [materia, setMateria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (visible) {
      if (taskToEdit) {
        setTitulo(taskToEdit.title);
        setMateria(taskToEdit.subject);
        setDescripcion(taskToEdit.description);
      } else {
        setTitulo('');
        setMateria('');
        setDescripcion('');
        setDate(new Date());
      }
    }
  }, [visible, taskToEdit]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const cleanUpAndClose = () => {
    onClose();
  };

  const handleConfirmar = () => {
    if (!titulo || !materia) {
      Alert.alert('Error', 'El título y la materia son obligatorios.');
      return;
    }
    
    const taskData = {
      title: titulo,
      subject: materia,
      date: date.toLocaleDateString(),
      description: descripcion || 'Sin descripción.',
      status: taskToEdit ? taskToEdit.status : 'active',
      id: taskToEdit ? taskToEdit.id : Date.now().toString(),
    };

    if (taskToEdit) {
      onEditTask(taskData);
      Alert.alert('Actualizado', 'Tu tarea ha sido modificada.');
    } else {
      onAddTask(taskData);
      Alert.alert('¡Éxito!', 'Nueva tarea creada.');
    }
    
    cleanUpAndClose();
  };

  if (!visible) return null;

  return (
    <Modal
      animationType="none" // Quitamos la animación nativa
      transparent={true}
      visible={true}
      onRequestClose={cleanUpAndClose}
    >
      {/* KeyboardAvoidingView para que el teclado empuje el modal hacia arriba */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableOpacity 
          style={styles.modalBackdrop} 
          activeOpacity={1} 
          onPress={cleanUpAndClose} 
        >
          {/* --- ANIMACIÓN POP --- */}
          <Animated.View
            entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
            exiting={FadeOut.duration(150)}
            style={{ width: '100%', alignItems: 'center' }}
          >
            {/* Contenido del Modal (Tarjeta Azul Oscuro) */}
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                
              <Text style={styles.modalTitle}>
                {taskToEdit ? "EDITAR TAREA" : "NUEVA TAREA"}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Título de tarea"
                placeholderTextColor="#aaa"
                value={titulo}
                onChangeText={setTitulo}
              />
              <TextInput
                style={styles.input}
                placeholder="Materia"
                placeholderTextColor="#aaa"
                value={materia}
                onChangeText={setMateria}
              />
              
              <TouchableOpacity onPress={showDatepicker} style={styles.dateButton}>
                <Text style={styles.dateButtonText}>
                  Fecha límite: {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              
              {showPicker && Platform.OS === 'ios' && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="spinner"
                  onChange={onChangeDate}
                  textColor="white"
                />
              )}

              <TextInput
                style={[styles.input, styles.inputDescripcion]}
                placeholder="Descripción (opcional)"
                placeholderTextColor="#aaa"
                multiline={true}
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={cleanUpAndClose}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
                  <Text style={styles.buttonText}>
                    {taskToEdit ? "Guardar" : "Confirmar"}
                  </Text>
                </TouchableOpacity>
              </View>

            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

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

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',     // Centrado horizontal
  },
  modalContent: {
    backgroundColor: '#113142', // Tu Azul Oscuro
    borderRadius: 20,
    padding: 25,
    width: '85%', // Ancho del modal
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    color: '#333',
  },
  inputDescripcion: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  dateButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  dateButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#555',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  confirmButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});