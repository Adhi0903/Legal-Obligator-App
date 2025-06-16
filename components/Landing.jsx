import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LandingPage = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.background}
      imageStyle={{ opacity: 0.3 }} // Makes image faded
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Legal Obligator</Text>
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
    </ImageBackground>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
