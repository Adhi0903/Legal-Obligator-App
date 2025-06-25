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
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const ChatScreen = ({ navigation }) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to Legal Obligator! How can I assist you?', sender: 'bot' },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsGenerating(true);

    try {
      const res = await axios.post('http://192.168.31.90:5000/chat', {
        question: newMessage.text,
      });

      const reply = {
        id: Date.now().toString() + '_bot',
        text: res.data.answer || '⚠️ No response received.',
        sender: 'bot',
      };

      setMessages(prev => [...prev, reply]);
    } catch (error) {
      console.error('❌ Error connecting to Flask server:', error);
      const errorReply = {
        id: Date.now().toString() + '_bot_error',
        text: '⚠️ Could not connect to the legal assistant server.',
        sender: 'bot',
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setIsGenerating(false);
    }
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

      {isGenerating && (
        <Text style={styles.typingIndicator}>LegalBot is typing...</Text>
      )}

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
          onContentSizeChange={(e) =>
            setInputHeight(e.nativeEvent.contentSize.height)
          }
          multiline
          style={[styles.textInput, { height: Math.max(40, inputHeight) }]}
          outlineColor="#1E90FF"
          activeOutlineColor="#1E90FF"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
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
    backgroundColor: '#FF6347',
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
  typingIndicator: {
    paddingHorizontal: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 6,
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
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
