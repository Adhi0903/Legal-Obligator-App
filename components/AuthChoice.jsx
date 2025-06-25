import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or Feather, AntDesign, etc.

const { height } = Dimensions.get('window');

export default function AuthChoice({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Custom Back Arrow */}
{/*       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> */}
{/*         <Icon name="arrow-back" size={28} color="#FFFFFF" /> */}
{/*       </TouchableOpacity> */}

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.subheading}>Please login or register to continue.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#0B0C10',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 70,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#0B0C10',
    fontWeight: '600',
  },
});
