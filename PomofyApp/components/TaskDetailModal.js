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

// Añadimos la prop 'onEdit'
export default function TaskDetailModal({ task, visible, onClose, onEdit }) {
  
  if (!task) return null;

  const handleEditPress = () => {
    onClose(); // 1. Cerramos este modal de detalles
    // 2. Esperamos un momento pequeño y llamamos a editar
    setTimeout(() => {
        onEdit(task); // Le decimos al padre: "Quiero editar ESTA tarea"
    }, 100);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
            Alert.alert('Éxito', `"${task.title}" ha sido eliminada.`);
            onClose();
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
      <TouchableOpacity 
        style={styles.modalBackdrop} 
        activeOpacity={1} 
        onPress={onClose} 
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <SafeAreaView>
            <Text style={styles.label}>TAREA:</Text>
            <Text style={styles.infoText}>{task.title}</Text>
            <Text style={styles.label}>MATERIA:</Text>
            <Text style={styles.infoText}>{task.subject}</Text>
            <Text style={styles.label}>FECHA LÍMITE:</Text>
            <Text style={styles.infoText}>{task.date}</Text>
            <Text style={styles.label}>DESCRIPCIÓN:</Text>
            <Text style={styles.descriptionText}>{task.description}</Text>

            <View style={styles.buttonContainer}>
              {/* Botón Editar conectado */}
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditPress}>
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

// ... (Tus estilos anteriores se mantienen igual, asegúrate de copiarlos aquí abajo) ...
// Para no hacer el mensaje eterno, usa los estilos que ya tenías en TaskDetailModal.js
const styles = StyleSheet.create({
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#113142', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }, // <-- OJO: Usé tu color #113142
  label: { color: '#aaa', fontSize: 12, fontWeight: 'bold', marginBottom: 2, marginTop: 15 },
  infoText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  descriptionText: { color: '#ddd', fontSize: 16, fontStyle: 'italic', marginTop: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  button: { borderRadius: 15, paddingVertical: 15, flex: 1, alignItems: 'center' },
  editButton: { backgroundColor: '#FFA000', marginRight: 10 },
  deleteButton: { backgroundColor: '#D32F2F', marginLeft: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});