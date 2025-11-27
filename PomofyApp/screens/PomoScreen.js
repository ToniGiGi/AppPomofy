import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView,
} from 'react-native';
import { Audio } from 'expo-av';

// --- Assets ---
import TimerImage from '../assets/contadorpomo.png';
import PomyMeditando from '../assets/pomymeditando.png';
import IconRacha from '../assets/iconracha.png';
import CongratsModal from '../components/CongratsModal';
import PomoSettingsModal from '../components/PomoSettingsModal';
import SubjectModal from '../components/SubjectModal';
import StreakModal from '../components/StreakModal';

const DEFAULT_POMODORO_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export default function PomoScreen() {
  
  const [timeRemaining, setTimeRemaining] = useState(DEFAULT_POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('pomodoro');
  
  // Estados de Modales
  const [congratsModalVisible, setCongratsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [subjectModalVisible, setSubjectModalVisible] = useState(false);
  const [streakModalVisible, setStreakModalVisible] = useState(false);

  // --- ¡CAMBIO AQUÍ! Iniciamos en 13 ---
  const [streak, setStreak] = useState(13); 
  
  const [hoursStudied, setHoursStudied] = useState(25);
  const [selectedSubject, setSelectedSubject] = useState(null); 
  const sound = useRef(null);

  // --- useEffects (sin cambios) ---
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound: soundObject } = await Audio.Sound.createAsync(
           require('../assets/alarma.mp3')
        );
        sound.current = soundObject;
      } catch (error) {
        console.log('Error al cargar el sonido', error);
      }
    };
    loadSound();
    return () => {
      if (sound.current) sound.current.unloadAsync();
    };
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } 
    else if (isActive && timeRemaining === 0) {
      clearInterval(interval);
      setIsActive(false);
      if (mode === 'pomodoro') {
        playSound();
        setCongratsModalVisible(true);
      } else {
        handleNextMode();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, mode]);

  // --- Funciones Auxiliares (sin cambios) ---
  const playSound = async () => {
    if (sound.current) {
      try { await sound.current.replayAsync(); } catch (error) {}
    }
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleNextMode = () => {
    setIsActive(false);
    if (mode === 'pomodoro') {
      setMode('break');
      setTimeRemaining(BREAK_TIME);
      setStreak(prevStreak => prevStreak + 1); 
    } else {
      setMode('pomodoro');
      setTimeRemaining(DEFAULT_POMODORO_TIME);
    }
  };

  const handleModalDismiss = () => {
    setCongratsModalVisible(false);
    handleNextMode();
  };

  const handleUpdateDuration = (minutes) => {
    const newSeconds = minutes * 60;
    setTimeRemaining(newSeconds);
    setIsActive(false);
    setMode('pomodoro');
    setSettingsModalVisible(false);
  };

  const handleSelectSubject = (subject) => {
    setSelectedSubject(subject);
    setSubjectModalVisible(false);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>
        {mode === 'pomodoro' ? 'CONCENTRATE' : 'DESCANSO'}
      </Text>

      <TouchableOpacity 
        style={styles.timerContainer}
        onPress={() => setSettingsModalVisible(true)}
        activeOpacity={0.8}
      >
        <Image source={TimerImage} style={styles.timerImage} />
        <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.startButton} onPress={handleStartPause}>
        <Text style={styles.startButtonText}>
          {isActive ? 'Pausar' : 'Comenzar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.statsRow}>
        <Image source={PomyMeditando} style={styles.pomyImage} />
        
        <TouchableOpacity 
          style={styles.subjectBox} 
          onPress={() => setSubjectModalVisible(true)}
        >
          <Text style={styles.studyingLabel}>Estudiando</Text>
          {selectedSubject ? (
            <Text style={styles.subjectValue}>{selectedSubject}</Text>
          ) : (
            <Text style={styles.subjectPlaceholder}>
              Presiona aquí para asignar materia
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.streakContainer}
        onPress={() => setStreakModalVisible(true)}
        activeOpacity={0.8}
      >
        { [1, 2, 3, 4, 5].map((index) => (
            <Image 
              key={index} 
              source={IconRacha} 
              style={[
                styles.flameIcon, 
                // Si la racha es mayor a 5 (como 13), todas las llamas se quedan prendidas
                index > (streak > 5 ? 5 : streak) && styles.flameIconInactive
              ]} 
            />
        ))}
      </TouchableOpacity>

      {/* Modales */}
      <CongratsModal visible={congratsModalVisible} onDismiss={handleModalDismiss} />
      
      <PomoSettingsModal 
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        onSelectDuration={handleUpdateDuration}
      />

      <SubjectModal
        visible={subjectModalVisible}
        onClose={() => setSubjectModalVisible(false)}
        onSelectSubject={handleSelectSubject}
      />

      <StreakModal 
        visible={streakModalVisible}
        onClose={() => setStreakModalVisible(false)}
        streak={streak} // Pasamos el 13 al modal
      />

    </SafeAreaView>
  );
}

// --- ESTILOS (Sin cambios) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2127',
    alignItems: 'center',
    justifyContent: 'space-evenly', 
    paddingVertical: 10,
  },
  title: {
    color: '#6D7375',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  timerImage: {
    width: 280, 
    height: 280,
    resizeMode: 'contain',
  },
  timerText: {
    position: 'absolute',
    color: 'white',
    fontSize: 56, 
    fontWeight: 'bold',
    marginTop: 35, 
  },
  startButton: {
    backgroundColor: '#f4d6b0',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20, 
  },
  pomyImage: {
    width: 130, 
    height: 130,
    resizeMode: 'contain',
  },
  subjectBox: {
    backgroundColor: '#01a59c',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 180, 
    height: 100, 
  },
  studyingLabel: {
    color: '#333', 
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subjectValue: {
    color: '#333', 
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subjectPlaceholder: {
    color: 'rgba(0,0,0,0.5)', 
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  streakContainer: {
    backgroundColor: '#333',
    borderRadius: 30,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  flameIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginHorizontal: 8,
  },
  flameIconInactive: {
    opacity: 0.3,
  },
});