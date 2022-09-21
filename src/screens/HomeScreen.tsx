import React, { useState, useEffect, FC } from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Platform,
  Text
} from 'react-native';

import DateTimePicker from "@react-native-community/datetimepicker";
import { useNotification } from '../hooks/useNotifications';



const HomeScreen: FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));
  const [hours, setHours] = useState(' ');
  const [minutes, setMinutes] = useState(' ');
  const [date2, setDate2] = useState(' ');
  const [month, setMonth] = useState(' ');
  const [year, setYear] = useState(' ');
  const [date3, setDate3] = useState(new Date());
  const [hoursdisplay, sethoursdisplay] = useState('');
  

  //In case if you feel useEffect has lag, use useLayoutEffect
  useEffect(()=>{
    let hours1 = parseInt(hours);
    if(hours1<=12){
      sethoursdisplay(hours);
    }
    if(hours1>12){
      hours1 = hours1 -12;
      sethoursdisplay(hours1.toString());
    }
  },[time]);

  const {
    displayNotification,
    displayTriggerNotification
  } = useNotification();


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  function onDateSelected(event: any, value: any) {
    setDate2(value.getDate());
    setMonth(value.getMonth());
    setYear(value.getFullYear())
    setDatePickerVisibility(false);
  };
  function onTimeSelected(event: any, value: any) {
    setTime(value);
    setHours(value.getHours());
    setMinutes(value.getMinutes());
    setTimePickerVisibility(false);
  };

  

  const handleDisplayNotification = async() => {
    displayNotification(title, description);
  }

  const handleCreateTriggerNotification = () => {
    displayTriggerNotification(title, description, date3, hours, minutes);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.container, styles.center]}>
        <View style={{margin:20}}>
          <Button title="Display Notification" onPress={handleDisplayNotification} />
        </View>
        <View style={{margin:20}}>
          <Button title="Create Trigger Notification" onPress={handleCreateTriggerNotification} />
        </View>
        <TextInput 
          placeholder='Title' 
          value={title}
          onChangeText={setTitle}
          style={styles.title1}
        />
         <TextInput 
          placeholder='Description' 
          value={description}
          onChangeText={setDescription}
          style={styles.description1}
        />
      
          {isDatePickerVisible==true?
          <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
          />:null
          }
          {isTimePickerVisible==true?
          <DateTimePicker
          value={time}
          mode={'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onTimeSelected}
          style={styles.datePicker}
          />: null
          }
       
      <View style={{margin:20}}>
        <Button title="Show Date Picker" onPress={showDatePicker} />
      </View>
      <View style={{margin:20}}>
        <Button title="Show Time Picker" onPress={showTimePicker} />
      </View>
      <View style={{margin:20}}>
          <Text>{date2}: {month}: {year}</Text>
          <Text>{hoursdisplay}: {minutes}</Text>
      </View>
    </View>
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  title1:{
    //borderWidth:0.5, 
    margin:10, 
    paddingLeft:5,
    fontSize:20,
    height:50, 
    width:200,
    borderWidth:1,
    fontWeight:'bold'
},
description1:{
    borderWidth:1, 
    margin:10, 
    height:50, 
    width:200,
    textAlignVertical:'top', 
    paddingLeft:10,
    fontSize:16,
},
datePicker: {
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: 320,
  height: 260,
  display: 'flex',
},
});

export default HomeScreen;
