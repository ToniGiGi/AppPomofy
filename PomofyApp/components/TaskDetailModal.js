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
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';

// Recibimos 'onDelete'
export default function TaskDetailModal({ task, visible, onClose, onEdit, onDelete }) {
  
  if (!task || !visible) return null;

  const handleEditPress = () => {
    onClose();
    setTimeout(() => {
        onEdit(task);
    }, 100);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive', 
          onPress: () => {
            // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
            // Llamamos a la función real de borrar
            if (onDelete) {
                onDelete(task.id);
            }
          }
        },
      ]
    );
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={onClose}>
        <Animated.View
            entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
            exiting={FadeOut.duration(150)}
            style={{ width: '100%', alignItems: 'center' }}
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
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditPress}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#113142', borderRadius: 20, padding: 25, width: '85%', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 },
  label: { color: '#ccc', fontSize: 12, fontWeight: 'bold', marginBottom: 2, marginTop: 15 },
  infoText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  descriptionText: { color: '#ddd', fontSize: 16, fontStyle: 'italic', marginTop: 5, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: { borderRadius: 15, paddingVertical: 15, flex: 1, alignItems: 'center' },
  editButton: { backgroundColor: '#FFA000', marginRight: 10 },
  deleteButton: { backgroundColor: '#D32F2F', marginLeft: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});