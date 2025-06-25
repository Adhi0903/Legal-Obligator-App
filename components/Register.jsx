import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleRegister = () => {
    if (password !== retypePassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({
          displayName: name,
        });
      })
      .then(() => {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Title style={styles.title}>Register</Title>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          autoCapitalize="words"
          theme={inputTheme}
        />

        <TextInput
          label="User ID"
          value={userId}
          onChangeText={setUserId}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          theme={inputTheme}
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
          theme={inputTheme}
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={inputTheme}
        />

        <TextInput
          label="Retype Password"
          value={retypePassword}
          onChangeText={setRetypePassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
          theme={inputTheme}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.button}
          labelStyle={{ color: '#0B0C10', fontWeight: '600' }}
          buttonColor="#FFFFFF"
        >
          Register
        </Button>

        <View style={styles.row}>
          <Text style={{ color: '#FFFFFF' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const inputTheme = {
  colors: {
    primary: '#FFFFFF',
    text: '#FFFFFF',
    placeholder: '#AAAAAA',
    background: '#1C1F26',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  scrollContainer: {
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
