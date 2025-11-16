import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Modal,
  SafeAreaView
} from 'react-native';

// Este modal recibe 'task' (la tarea seleccionada), 'visible' y 'onClose'
export default function TaskDetailModal({ task, visible, onClose }) {
  
  // Si no hay tarea seleccionada, no mostramos nada
  if (!task) {
    return null;
  }

  // Funciones para los botones
  const handleEdit = () => {
    Alert.alert('Próximamente', 'Aquí se abriría la pantalla de edición.');
    onClose(); // Cerramos el modal
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
            // Aquí iría la lógica para borrar la tarea
            Alert.alert('Éxito', `"${task.title}" ha sido eliminada.`);
            onClose(); // Cerramos el modal
          }
        },
      ]
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Fondo oscuro "táctil" para cerrar */}
      <TouchableOpacity 
        style={styles.modalBackdrop} 
        activeOpacity={1} 
        onPress={onClose} 
      >
        {/* Contenido del Modal (turquesa) */}
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <SafeAreaView>
            
            {/* --- Sección de Información --- */}
            <Text style={styles.label}>TAREA:</Text>
            <Text style={styles.infoText}>{task.title}</Text>
            
            <Text style={styles.label}>MATERIA:</Text>
            <Text style={styles.infoText}>{task.subject}</Text>

            <Text style={styles.label}>FECHA LÍMITE:</Text>
            <Text style={styles.infoText}>{task.date}</Text>
            
            <Text style={styles.label}>DESCRIPCIÓN:</Text>
            <Text style={styles.descriptionText}>{task.description}</Text>

            {/* --- Sección de Botones --- */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>

          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// --- ESTILOS (Basados en tu TaskModal) ---
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
  label: {
    color: '#f0f0f0',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 10,
  },
  infoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 15,
    flex: 1,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFA000', // Naranja para Editar
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#D32F2F', // Rojo oscuro para Eliminar
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});