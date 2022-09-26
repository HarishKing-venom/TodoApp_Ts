import { StyleSheet, Text, View, Button } from 'react-native';
import React, { FC, useLayoutEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';


const RemainderScreen: FC = () => {
  const [rdata, setRdata] = useState(' ');
    const {getTriggerNotificationIds} = useNotification();
    useFocusEffect(()=>{
      findNotes();
    })
      
  const findNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('alarmList');
      jsonValue != null ? JSON.parse(jsonValue) : null;
      jsonValue!=null?setRdata(jsonValue):setRdata('Empty');
      console.warn(jsonValue);
      
    } catch(e) {
      // error reading value
    }
  }
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch(e) {
      // clear error
    }
  
    console.log('Done.')
  }
  let mdata = rdata
  return (
    <View style={{margin:40}}>
      <Text>RemainderScreen Fetching Triggered Notifications </Text>
      <Button title='Display notification IDs' onPress={getTriggerNotificationIds} />
      <View style={{margin:20}}>
        <Button title='Show Saved Triggers' onPress={findNotes} />
      </View>
      <View style={{margin:20}}>
        <Button title='Clear Triggers' onPress={clearAll} />
        <Text>{rdata}</Text>
      </View>
    </View>
  )
}

export default RemainderScreen
const styles = StyleSheet.create({})