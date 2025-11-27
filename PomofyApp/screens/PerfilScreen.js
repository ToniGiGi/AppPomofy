// 1. Importamos useCallback
import React, { useState, useCallback } from 'react'; 
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// 2. Importamos useFocusEffect para recargar datos al entrar
import { useFocusEffect } from '@react-navigation/native';

// 3. Importamos el Controlador
import { TasksController } from '../controllers/TasksController';

// Assets
import ProfilePic from '../assets/tony.png';
import PomyLeyendo from '../assets/pomyleyendo.png';
import IconRacha from '../assets/iconracha.png';
import IconRayo from '../assets/iconrayo.png';
import IconMedalla from '../assets/iconmedalla.png';

import AddFriendModal from '../components/AddFriendModal';

const WEEK_DATA = [
  { day: 'LUN', status: 'done' },
  { day: 'MAR', status: 'done' },
  { day: 'MIE', status: 'done' },
  { day: 'JUE', status: 'done' },
  { day: 'VIE', status: 'pending' },
  { day: 'SAB', status: 'pending' },
  { day: 'DOM', status: 'pending' },
];

export default function PerfilScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  // --- 4. Estado para el número de tareas ---
  const [taskCount, setTaskCount] = useState(0);

  // --- 5. Efecto de Enfoque (Se ejecuta al entrar a la pantalla) ---
  useFocusEffect(
    useCallback(() => {
      const fetchCount = async () => {
        const count = await TasksController.getTasksCount();
        setTaskCount(count);
      };
      
      fetchCount();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. ENCABEZADO */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setImageModalVisible(true)} activeOpacity={0.8}>
            <Image source={ProfilePic} style={styles.profilePic} />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Toni Garcia</Text>
            <Text style={styles.userHandle}>@tonygarcia692</Text>
            <Text style={styles.userDate}>Estudiando desde 2025</Text>
            
            <TouchableOpacity 
              style={styles.addFriendButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="person-add" size={20} color="#333" style={{marginRight: 5}} />
              <Text style={styles.addFriendText}>Agregar amigo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2. TARJETAS DE ESTADÍSTICAS */}
        <View style={styles.statsCardsContainer}>
          <View style={[styles.statCard, { backgroundColor: '#01a59c' }]}>
            <Text style={styles.statNumber}>25</Text>
            <Text style={styles.statLabel}>Horas</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#f4d6b0' }]}>
            <Text style={[styles.statNumber, { color: '#333' }]}>13</Text>
            <Text style={[styles.statLabel, { color: '#333' }]}>Pomodoro</Text>
          </View>
          
          {/* --- ¡AQUÍ MOSTRAMOS EL DATO REAL! --- */}
          <View style={[styles.statCard, { backgroundColor: '#e65133' }]}>
            <Text style={styles.statNumber}>{taskCount}</Text>
            <Text style={styles.statLabel}>Tareas</Text>
          </View>
          {/* ------------------------------------- */}

        </View>

        {/* 3. RESUMEN */}
        <Text style={styles.sectionTitle}>RESUMEN</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Image source={IconRacha} style={styles.summaryIcon} />
            <Text style={styles.summaryText}>13 DÍAS</Text>
          </View>
          <View style={styles.summaryItem}>
            <Image source={IconRayo} style={styles.summaryIcon} />
            <Text style={styles.summaryText}>2 648 XP</Text>
          </View>
        </View>
        <View style={styles.levelRow}>
          <Image source={IconMedalla} style={styles.summaryIcon} />
          <Text style={styles.summaryText}>AVANZADO</Text>
        </View>

        {/* 4. GRÁFICA */}
        <View style={styles.chartContainer}>
          <View style={styles.barsGroup}>
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 100, backgroundColor: '#e65133' }]} />
              <Text style={styles.barLabel}>Mate</Text>
            </View>
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 60, backgroundColor: '#01a59c' }]} />
              <Text style={styles.barLabel}>Ingles</Text>
            </View>
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 120, backgroundColor: '#f4d6b0' }]} />
              <Text style={styles.barLabel}>Progra</Text>
            </View>
            <View style={styles.barWrapper}>
              <View style={[styles.bar, { height: 90, backgroundColor: '#FF7058' }]} />
              <Text style={styles.barLabel}>Arte</Text>
            </View>
          </View>
          <Image source={PomyLeyendo} style={styles.pomyImage} />
        </View>

        {/* 5. CALENDARIO */}
        <View style={styles.streakCalendarSection}>
          <Text style={styles.sectionTitle}>RACHA SEMANAL</Text>
          <View style={styles.weekContainer}>
            {WEEK_DATA.map((item, index) => (
              <View key={index} style={styles.dayColumn}>
                <Text style={styles.dayText}>{item.day}</Text>
                <View style={[
                  styles.dayCircle, 
                  item.status === 'done' ? styles.dayCircleDone : styles.dayCirclePending
                ]}>
                  {item.status === 'done' && (
                    <MaterialIcons name="check" size={16} color="white" />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>

      {/* Modales */}
      <AddFriendModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.imageModalBackground} 
          onPress={() => setImageModalVisible(false)}
          activeOpacity={1}
        >
          <Image source={ProfilePic} style={styles.enlargedImage} />
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
}

// --- ESTILOS (Sin cambios) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E2127' },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: '#333' },
  userInfo: { marginLeft: 20, flex: 1 },
  userName: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  userHandle: { color: '#888', fontSize: 16, marginBottom: 5 },
  userDate: { color: '#666', fontSize: 14, marginBottom: 10 },
  addFriendButton: { backgroundColor: '#f67e7d', flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10, alignSelf: 'flex-start' },
  addFriendText: { color: '#333', fontWeight: 'bold' },
  statsCardsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  statCard: { width: '30%', aspectRatio: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  statLabel: { fontSize: 14, color: 'white', fontWeight: 'bold', marginTop: 5 },
  sectionTitle: { color: '#888', fontSize: 14, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15, paddingHorizontal: 20 },
  summaryItem: { flexDirection: 'row', alignItems: 'center' },
  summaryIcon: { width: 30, height: 30, resizeMode: 'contain', marginRight: 10 },
  summaryText: { color: '#888', fontSize: 18, fontWeight: 'bold' },
  levelRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 30 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 20 },
  barsGroup: { flexDirection: 'row', alignItems: 'flex-end', height: 150 },
  barWrapper: { alignItems: 'center', marginRight: 15 },
  bar: { width: 30, borderRadius: 15, marginBottom: 5 },
  barLabel: { color: '#888', fontSize: 12 },
  pomyImage: { width: 140, height: 140, resizeMode: 'contain' },
  imageModalBackground: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.9)', justifyContent: 'center', alignItems: 'center' },
  enlargedImage: { width: '90%', height: '70%', resizeMode: 'contain' },
  streakCalendarSection: { marginTop: 40, backgroundColor: '#25282e', padding: 20, borderRadius: 20 },
  weekContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  dayColumn: { alignItems: 'center' },
  dayText: { color: '#888', fontSize: 12, marginBottom: 8, fontWeight: 'bold' },
  dayCircle: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  dayCircleDone: { backgroundColor: '#FFA000' },
  dayCirclePending: { borderWidth: 2, borderColor: '#444', backgroundColor: 'transparent' },
});