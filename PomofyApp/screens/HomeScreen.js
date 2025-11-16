import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import TaskModal from '../components/TaskModal';
import TaskDetailModal from '../components/TaskDetailModal';

// --- DATOS INICIALES (¡con los estados que pediste!) ---
const INITIAL_TASKS = [
  { 
    id: 't1', 
    title: 'PAST SIMPLE', 
    subject: 'Ingles', 
    date: '2/11/2025', 
    status: 'active', // Azul
    description: 'Me quiero dedicar a estudiar Past Simple para poder pasar el examen. Repasar verbos regulares e irregulares.' 
  },
  { 
    id: 't2', 
    title: 'SUMA RIEMANN', 
    subject: 'Calculo', 
    date: '31/10/2025', 
    status: 'active', // Azul
    description: 'Repasar la teoría de la Suma de Riemann y hacer los 10 ejercicios de la guía que dejó el profesor.'
  },
  // ... (el resto de tus tareas de ejemplo) ...
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
    description: 'Escribir el ensayo de 5 cuartillas sobre "Cien Años de Soledad'
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
// --- FIN DE DATOS INICIALES ---

export default function HomeScreen() {
  
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [tasks, setTasks] = useState(INITIAL_TASKS); // <-- "Master list"
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    let newFilteredList;
    if (activeFilter === 'Todas') {
      newFilteredList = tasks;
    } else if (activeFilter === 'En proceso') {
      newFilteredList = tasks.filter(task => task.status === 'process');
    } else if (activeFilter === 'Terminadas') {
      newFilteredList = tasks.filter(task => task.status === 'done');
    }
    setFilteredTasks(newFilteredList);
  }, [activeFilter, tasks]);


  const handleChangeStatus = (taskId) => {
    setTasks(currentTasks => 
      currentTasks.map(task => {
        if (task.id === taskId) {
          let nextStatus;
          if (task.status === 'active') {
            nextStatus = 'process';
          } else if (task.status === 'process') {
            nextStatus = 'done';
          } else {
            nextStatus = 'active';
          }
          return { ...task, status: nextStatus };
        }
        return task;
      })
    );
  };
  
  const handleOpenAddModal = () => setAddModalVisible(true);
  const handleOpenDetailModal = (task) => {
    setSelectedTask(task);
    setDetailModalVisible(true);
  };

  // --- ¡NUEVA FUNCIÓN PARA AÑADIR LA TAREA! ---
  const handleAddTask = (newTask) => {
    // Añadimos la nueva tarea a nuestra "master list"
    // (La ponemos al inicio del arreglo para que aparezca arriba)
    setTasks(currentTasks => [newTask, ...currentTasks]);
    
    // Cerramos el modal
    setAddModalVisible(false);
  };
  
  const renderTaskCard = ({ item }) => {
    let circleStyle;
    if (item.status === 'active') {
      circleStyle = styles.taskStatusCircle_Active;
    } else if (item.status === 'process') {
      circleStyle = styles.taskStatusCircle_Process;
    } else {
      circleStyle = styles.taskStatusCircle_Done;
    }

    return (
      <TouchableOpacity 
        style={styles.taskCard} 
        onPress={() => handleOpenDetailModal(item)}
      >
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskSubtitle}>{item.subject} - {item.date}</Text>
        </View>
        <TouchableOpacity onPress={() => handleChangeStatus(item.id)}>
          <View style={[styles.taskStatusCircleBase, circleStyle]} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>

        <TouchableOpacity 
          style={styles.mainButton} 
          onPress={handleOpenAddModal}
        >
          <Text style={styles.mainButtonText}>MIS TAREAS</Text>
          <MaterialIcons name="add-circle" size={30} color="#2c5f94" />
        </TouchableOpacity>

        {/* --- Filtros --- */}
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

        {/* --- Lista --- */}
        <Text style={styles.sectionTitle}>TODAS MIS TAREAS</Text>
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskCard}
          keyExtractor={item => item.id}
          style={styles.taskList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyListText}>No hay tareas en esta categoría.</Text>}
        />
      
      </View>

      {/* --- ¡MODAL DE AÑADIR ACTUALIZADO! --- */}
      <TaskModal 
        visible={addModalVisible} 
        onClose={() => setAddModalVisible(false)} // Para "tocar afuera"
        onAddTask={handleAddTask} // ¡Le pasamos la nueva función!
      />
      
      <TaskDetailModal
        task={selectedTask}
        visible={detailModalVisible}
        onClose={() => setDetailModalVisible(false)}
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
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mainButton: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 20,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 20, 
    borderRadius: 20,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActive_Todas: {
    backgroundColor: '#00BCD4',
  },
  filterActive_EnProceso: {
    backgroundColor: '#FFA000',
  },
  filterActive_Terminadas: {
    backgroundColor: '#E57373',
  },
  filterText: {
    color: '#999',
    fontWeight: 'bold',
  },
  filterTextActive: {
    color: 'white',
  },
  taskList: {
    width: '100%',
  },
  taskCard: {
    backgroundColor: '#F5DEB3',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  taskStatusCircleBase: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 15,
  },
  taskStatusCircle_Active: {
    backgroundColor: '#2c5f94', // Azul
  },
  taskStatusCircle_Process: {
    backgroundColor: '#FFA000', // Naranja
  },
  taskStatusCircle_Done: {
    backgroundColor: '#4CAF50', // Verde
  },
  emptyListText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  }
});