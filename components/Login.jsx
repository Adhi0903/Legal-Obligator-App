import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('Success', 'Logged in successfully!');
        navigation.navigate('Chat');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Login Failed', 'No user found for that email.');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Login Failed', 'Incorrect password.');
        } else {
          Alert.alert('Login Failed', error.message);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Title style={styles.title}>Login</Title>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        theme={{
          colors: {
            primary: '#FFFFFF',
            text: '#FFFFFF',
            placeholder: '#AAAAAA',
            background: '#1C1F26',
          },
        }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
        theme={{
          colors: {
            primary: '#FFFFFF',
            text: '#FFFFFF',
            placeholder: '#AAAAAA',
            background: '#1C1F26',
          },
        }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={{ color: '#0B0C10', fontWeight: '600' }}
        buttonColor="#FFFFFF"
      >
        Login
      </Button>

      <View style={styles.row}>
        <Text style={{ color: '#FFFFFF' }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 28,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    borderRadius: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  link: {
    color: '#4DA6FF',
    fontWeight: '600',
  },
});
