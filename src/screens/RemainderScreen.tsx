import { StyleSheet, Text, View, Button } from 'react-native';
import React, { FC, useLayoutEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RemainderScreen: FC = () => {
  const [rdata, setRdata] = useState();
    const {getTriggerNotificationIds} = useNotification();
      
  const findNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('alarmList');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      console.warn(jsonValue);
      
    } catch(e) {
      // error reading value
    }
  }
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  return (
    <View style={{margin:40}}>
      <Text>RemainderScreen </Text>
      <Button title='Display notification IDs' onPress={getTriggerNotificationIds} />
      <View style={{margin:20}}>
        <Button title='Show Saved Triggers' onPress={findNotes} />
      </View>
      <View style={{margin:20}}>
        <Button title='Clear Triggers' onPress={clearAll} />
      </View>
    </View>
  )
}

export default RemainderScreen
const styles = StyleSheet.create({})