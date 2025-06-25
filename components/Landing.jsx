import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        {/* Title with neon glow on "Obligator" */}
        <View style={styles.glowWrapper}>
          <Text style={styles.title}>
            <Text style={styles.legal}>Legal </Text>
            <Text style={styles.obligator}>Obligator</Text>
          </Text>
        </View>

        <Text style={styles.subtitle}>
          Helping you stand up, speak out, and get what you deserve
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AuthChoice')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#0B0C10', // Dark blue-black
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  glowWrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  legal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  obligator: {
    color: '#FFFFFF',
    textShadowColor: '#00BFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#CCCCCC',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#0B0C10',
    fontSize: 16,
    fontWeight: '600',
  },
});
