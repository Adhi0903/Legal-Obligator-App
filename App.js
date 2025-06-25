import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from './components/Landing';
import AuthChoice from './components/AuthChoice';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import UserDetails from './components/UserDetails';

const Stack = createStackNavigator();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? 'Chat' : 'Landing'}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B0C10', // dark header
          },
          headerTintColor: '#FFFFFF', // white back arrow
          headerTitle: '', // hide title
          headerBackTitleVisible: false, // hide back text on iOS
        }}
      >
        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
        <Stack.Screen name="AuthChoice" component={AuthChoice} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
