import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from 'react-native';
import Animated, { ZoomIn, FadeOut } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';

export default function SubscriptionModal({ visible, onClose }) {
  
  if (!visible) return null;

  const handleSelectPlan = (planName) => {
    Alert.alert('Plan Seleccionado', `Has elegido el plan ${planName}. \n(Proceso de pago simulado)`);
    onClose();
  };

  const renderPlanCard = (title, price, features, isPopular = false) => (
    <TouchableOpacity 
      style={[
        styles.planCard, 
        isPopular && styles.popularCard // Estilo especial para el popular
      ]}
      onPress={() => handleSelectPlan(title)}
    >
      {isPopular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>MÁS POPULAR</Text>
        </View>
      )}
      
      <Text style={styles.planTitle}>{title}</Text>
      <Text style={styles.planPrice}>{price}</Text>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <MaterialIcons name="check" size={16} color={isPopular ? "white" : "#1ABC9C"} />
            <Text style={[styles.featureText, isPopular && styles.textWhite]}> {feature}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <Animated.View 
          entering={ZoomIn.springify().damping(20).stiffness(300).mass(0.5)}
          exiting={FadeOut.duration(150)}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
            <SafeAreaView style={styles.contentInner}>
              
              <Text style={styles.title}>MEJORA TU POMOFY</Text>
              <Text style={styles.subtitle}>Desbloquea todo el potencial</Text>

              <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                
                {renderPlanCard('Mensual', '$4.99 / mes', [
                  'Sin anuncios',
                  'Estadísticas avanzadas',
                  'Temas personalizados'
                ])}

                {renderPlanCard('Anual', '$39.99 / año', [
                  'Ahorra 33%',
                  'Todo lo del plan mensual',
                  'Acceso anticipado a funciones',
                  'Soporte prioritario'
                ], true)}

              </ScrollView>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Quizás después</Text>
              </TouchableOpacity>

            </SafeAreaView>
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#113142', // Azul Oscuro
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxHeight: '80%',
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentInner: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    marginBottom: 10,
  },
  // --- Estilos de Tarjetas ---
  planCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  popularCard: {
    backgroundColor: '#1ABC9C', // Turquesa para destacar
    borderColor: '#16a085',
    transform: [{ scale: 1.02 }], // Un pelín más grande
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#FF6B6B', // Coral
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  popularText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresContainer: {
    marginTop: 5,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  featureText: {
    color: '#555',
    fontSize: 14,
  },
  textWhite: {
    color: 'white', // Texto blanco para la tarjeta destacada
  },
  // --- Botón Cerrar ---
  closeButton: {
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
  },
  closeButtonText: {
    color: '#ccc',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});