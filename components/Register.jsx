import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Text, ScrollView } from 'react-native';
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
    alert("Passwords do not match!");
    return;
  }

  if (!email || !password) {
    alert("Email and password are required.");
    return;
  }
};
auth()
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Update displayName with the name user entered
    return userCredential.user.updateProfile({
      displayName: name, // 'name' is the input from your registration form
    });
  })
  .then(() => {
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login');
  })
  .catch(error => {
    Alert.alert('Error', error.message);
  });


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Title style={[styles.title, { fontWeight: 'bold' }]}>Register</Title>

        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
          autoCapitalize="words"
        />

        <TextInput
          label="User ID"
          value={userId}
          onChangeText={setUserId}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
          autoCapitalize="none"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Retype Password"
          value={retypePassword}
          onChangeText={setRetypePassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <Button mode="contained" onPress={handleRegister} style={styles.button}>
          Register
        </Button>

        <View style={styles.row}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  link: {
    color: '#3498db',
  },
});
