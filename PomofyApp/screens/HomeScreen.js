import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import TaskModal from '../components/TaskModal';
import TaskDetailModal from '../components/TaskDetailModal';

// --- ¡LISTA COMPLETA RESTAURADA! ---
const INITIAL_TASKS = [
  { 
    id: 't1', 
    title: 'PAST SIMPLE', 
    subject: 'Ingles', 
    date: '2/11/2025', 
    status: 'active', 
    description: 'Me quiero dedicar a estudiar Past Simple para poder pasar el examen. Repasar verbos regulares e irregulares.' 
  },
  { 
    id: 't2', 
    title: 'SUMA RIEMANN', 
    subject: 'Calculo', 
    date: '31/10/2025', 
    status: 'active', 
    description: 'Repasar la teoría de la Suma de Riemann y hacer los 10 ejercicios de la guía que dejó el profesor.'
  },
  { 
    id: 't3', 
    title: 'ALGORITMOS', 
    subject: 'Programación', 
    date: '25/10/2025', 
    status: 'done',
    description: 'Diseñar el algoritmo de ordenamiento burbuja y probarlo con 5 arreglos diferentes.'
  },
  { 
    id: 't4', 
    title: 'FACTORIZAR', 
    subject: 'Algebra', 
    date: '15/10/2025', 
    status: 'process',
    description: 'Terminar la guía de factorización por término común y trinomio cuadrado perfecto.'
  },
  { 
    id: 't5', 
    title: 'ENSAYO FINAL', 
    subject: 'Literatura', 
    date: '10/11/2025', 
    status: 'process',
    description: 'Escribir el ensayo de 5 cuartillas sobre "Cien Años de Soledad".'
  },
  { 
    id: 't6', 
    title: 'EXAMEN UNIDAD 1', 
    subject: 'Física', 
    date: '1/11/2025', 
    status: 'done',
    description: 'Estudiar los temas de vectores y movimiento rectilíneo uniforme.'
  },
];
// -----------------------------------

export default function HomeScreen() {
  
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    let newFilteredList;
    if (activeFilter === 'Todas') newFilteredList = tasks;
    else if (activeFilter === 'En proceso') newFilteredList = tasks.filter(t => t.status === 'process');
    else if (activeFilter === 'Terminadas') newFilteredList = tasks.filter(t => t.status === 'done');
    setFilteredTasks(newFilteredList);
  }, [activeFilter, tasks]);

  const handleChangeStatus = (taskId) => {
    setTasks(currentTasks => currentTasks.map(task => task.id === taskId ? 
      { ...task, status: task.status === 'active' ? 'process' : task.status === 'process' ? 'done' : 'active' } : task
    ));
  };
  
  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setAddModalVisible(true);
  };

  const handleOpenDetailModal = (task) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  // Función para preparar la edición
  const triggerEdit = (task) => {
    setTaskToEdit(task);
    setAddModalVisible(true);
  };

  // Función para guardar NUEVA tarea
  const handleAddTask = (newTask) => {
    setTasks(current => [newTask, ...current]);
    setAddModalVisible(false);
  };

  // Función para guardar tarea EDITADA
  const handleSaveEditedTask = (editedTask) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === editedTask.id ? editedTask : task
      )
    );
    setAddModalVisible(false);
    setTaskToEdit(null);
  };
  
  const renderTaskCard = ({ item }) => {
    let circleStyle;
    if (item.status === 'active') circleStyle = styles.taskStatusCircle_Active;
    else if (item.status === 'process') circleStyle = styles.taskStatusCircle_Process;
    else circleStyle = styles.taskStatusCircle_Done;

    return (
      <TouchableOpacity style={styles.taskCard} onPress={() => handleOpenDetailModal(item)}>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskSubtitle}>{item.subject} - {item.date}</Text>
        </View>
        <TouchableOpacity onPress={() => handleChangeStatus(item.id)} style={styles.statusBtn}>
          <View style={[styles.taskStatusCircleBase, circleStyle]} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <TouchableOpacity style={styles.mainButton} onPress={handleOpenAddModal}>
          <Text style={styles.mainButtonText}>MIS TAREAS</Text>
          <MaterialIcons name="add-circle" size={30} color="#2c5f94" />
        </TouchableOpacity>

        <View style={styles.filterSection}>
            <Text style={styles.sectionTitle}>ORDENAR</Text>
            <View style={styles.filterButtons}>
              <TouchableOpacity 
                style={[ styles.filterButton, activeFilter === 'Todas' && styles.filterActive_Todas ]}
                onPress={() => setActiveFilter('Todas')}
              >
                <Text style={[styles.filterText, activeFilter === 'Todas' && styles.filterTextActive]}>Todas</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[ styles.filterButton, activeFilter === 'En proceso' && styles.filterActive_EnProceso ]}
                onPress={() => setActiveFilter('En proceso')}
              >
                <Text style={[styles.filterText, activeFilter === 'En proceso' && styles.filterTextActive]}>En proceso</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[ styles.filterButton, activeFilter === 'Terminadas' && styles.filterActive_Terminadas ]}
                onPress={() => setActiveFilter('Terminadas')}
              >
                <Text style={[styles.filterText, activeFilter === 'Terminadas' && styles.filterTextActive]}>Terminadas</Text>
              </TouchableOpacity>
            </View>
        </View>

        <Text style={styles.sectionTitle}>TODAS MIS TAREAS</Text>
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskCard}
          keyExtractor={item => item.id}
          style={styles.taskList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <TaskModal 
        visible={addModalVisible} 
        onClose={() => { setAddModalVisible(false); setTaskToEdit(null); }}
        onAddTask={handleAddTask} 
        onEditTask={handleSaveEditedTask}
        taskToEdit={taskToEdit}
      />
      
      <TaskDetailModal
        task={selectedTask}
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
        onEdit={triggerEdit}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E2127' },
  contentWrapper: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  mainButton: { backgroundColor: '#FF6B6B', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 15, marginBottom: 20 },
  mainButtonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  sectionTitle: { color: '#888', fontSize: 14, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
  filterSection: { marginBottom: 20 },
  filterButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  filterButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, backgroundColor: '#333', alignItems: 'center', justifyContent: 'center' },
  filterActive_Todas: { backgroundColor: '#00BCD4' },
  filterActive_EnProceso: { backgroundColor: '#FFA000' },
  filterActive_Terminadas: { backgroundColor: '#E57373' },
  filterText: { color: '#999', fontWeight: 'bold' },
  filterTextActive: { color: 'white' },
  taskList: { width: '100%' },
  taskCard: { backgroundColor: '#F5DEB3', borderRadius: 15, padding: 20, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  taskSubtitle: { fontSize: 14, color: '#555' },
  statusBtn: { padding: 5, marginLeft: 10 },
  taskStatusCircleBase: { width: 32, height: 32, borderRadius: 16 },
  taskStatusCircle_Active: { backgroundColor: '#2c5f94' },
  taskStatusCircle_Process: { backgroundColor: '#FFA000' },
  taskStatusCircle_Done: { backgroundColor: '#4CAF50' },
  emptyListText: { color: '#888', textAlign: 'center', marginTop: 50, fontSize: 16 }
});