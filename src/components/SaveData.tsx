import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveData = async (triggerNotificationId: string, title: string, body:string, date:string, hours:string, minutes: string) => {
  const findNotes = async () =>{
    const result = await AsyncStorage.getItem('notes');
    if(result !==null){
      let aItem = JSON.parse(result);
      const updatedAlarm = [...alarmList1, aItem];
    }
  }
  useEffect(()=>{
    findNotes();
  },[])
    //const [alarmList, setAlarmList] = useState([]);
    const alarmList1: never[] = [];
    const alarmItem = { 
        //id: note.id,
        id: triggerNotificationId, 
        title: title, 
        description: body,
        alarmDate: date,
        alarmHours:hours,
        alarmMinutes: minutes
      };

   
     
    const updatedAlarm = [...alarmList1, alarmItem];
    console.warn(updatedAlarm);
    await AsyncStorage.setItem('alarmList', JSON.stringify(updatedAlarm));
    console.warn("Saved!");

}

export default SaveData

const styles = StyleSheet.create({})