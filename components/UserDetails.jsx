import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function UserDetails({ navigation }) {
  const [user, setUser] = useState(null);
  const [showChangePass, setShowChangePass] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        Alert.alert('Logged Out', 'You have been logged out successfully');
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert('Logout Error', error.message);
      });
  };

  const reauthenticate = (currentPassword) => {
    const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(credential);
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long.');
      return;
    }

    reauthenticate(currentPassword)
      .then(() => {
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert('Success', 'Password changed successfully!');
            setShowChangePass(false);
            setCurrentPassword('');
            setNewPassword('');
          })
          .catch((error) => {
            Alert.alert('Error', error.message);
          });
      })
      .catch(() => {
        Alert.alert('Error', 'Current password is incorrect. Please try again.');
      });
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: '#fff' }}>Loading user data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>
        {user.displayName || user.email?.split('@')[0] || 'No name set'}
      </Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <TouchableOpacity
        onPress={() => setShowChangePass(!showChangePass)}
        style={styles.changePassButton}
      >
        <Text style={styles.changePassText}>
          {showChangePass ? 'Cancel Change Password' : 'Change Password'}
        </Text>
      </TouchableOpacity>

      {showChangePass && (
        <>
          <TextInput
            label="Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
            theme={{ colors: { text: '#fff', primary: '#1E90FF', background: '#1a1a1a', placeholder: '#aaa' } }}
          />
          <TextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
            theme={{ colors: { text: '#fff', primary: '#1E90FF', background: '#1a1a1a', placeholder: '#aaa' } }}
          />
          <Button mode="contained" onPress={handleChangePassword} style={styles.button}>
            Submit
          </Button>
        </>
      )}

      <Button mode="outlined" onPress={handleLogout} style={styles.logoutBtn} textColor="#fff">
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#0B0C10',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 16,
    color: '#ffffff',
  },
  value: {
    fontSize: 18,
    marginBottom: 10,
    color: '#dcdcdc',
  },
  changePassButton: {
    marginVertical: 20,
  },
  changePassText: {
    color: '#1E90FF',
    fontSize: 16,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#1E90FF',
  },
  logoutBtn: {
    marginTop: 30,
    borderColor: '#fff',
    borderWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B0C10',
  },
});
