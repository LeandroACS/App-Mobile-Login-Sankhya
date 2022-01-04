import { StyleSheet, View, Image,Text } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import {useState} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Principal from './screens/Principal';
import { getHeaderTitle } from '@react-navigation/elements';




const Stack = createStackNavigator();

function MyStack(navigation,back) {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerStyle: { backgroundColor: 'orange' } }} >
        <Stack.Screen name="Login" component={Login} options={{title: '',}}  />
        <Stack.Screen name="Principal" component={Principal} options={''}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}  
  export default function App() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  };
