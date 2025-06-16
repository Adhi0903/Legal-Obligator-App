import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { TextInput, Avatar, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({ navigation }) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to Legal Obligator! How can I assist you?', sender: 'bot' },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);
    setMessage('');
  };

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

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, Adhi</Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('UserDetails')}>
  <Avatar.Image
    size={40}
    source={require('../assets/pc1.jpg')}
    style={styles.avatar}
  />
    </TouchableOpacity>
</View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContent}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <TextInput
          mode="outlined"
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
          style={styles.textInput}
          outlineColor="#1E90FF"
          activeOutlineColor="#1E90FF"
        />
        <TouchableOpacity onPress={handleSend}>
          <Icon name="send" size={28} color="#1E90FF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  header: {
    backgroundColor: '#1E90FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FF6347', // tomato red
    borderRadius: 8,
    marginRight: 12,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    backgroundColor: '#4682B4',
  },
  chatContent: {
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 4,
    borderRadius: 15,
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#E1E1E1',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#fff',
  },
});
