import { StyleSheet, Text, View } from 'react-native';
import React, {FC} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import RemainderScreen from './src/screens/RemainderScreen';
import Ionicons from 'react-native-vector-icons';


const Tab = createBottomTabNavigator();

const App: FC = () => {
 
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Tab.Screen 
          name="Remainder" 
          component={RemainderScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})