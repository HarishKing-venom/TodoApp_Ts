import notifee, { TimestampTrigger, TriggerType, RepeatFrequency, AndroidColor, AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useLayoutEffect, useState} from 'react';
//import SaveData from '../components/SaveData';


export const useNotification = () => {
  //const [alarmList1, setAlarmList1] : string[] = [];
  let alarmList1: string[] = [];
  const findNotes = async (alarmList1: string[]) =>{
    const result = await AsyncStorage.getItem('alarmList');
    if(result !==null){
      let aItem = JSON.parse(result);
      alarmList1.push(aItem);
      //const updatedAlarm = [...alarmList1, aItem];
    }
  }
  useEffect(()=>{
    findNotes(alarmList1);
  },[alarmList1]);

  async function displayNotification(title: string, body: string) {
    // Create a channel required for Android Notifications
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

   

    // Display a notification
    const notificationId = notifee.displayNotification({
      // id: "string" | updates Notification instead if provided id already exists
      title: title,
      body: body,
      android: {
        channelId,
        color: AndroidColor.FUCHSIA,
        colorized:true,
        smallIcon: "ic_launcher",
        //asForegroundService:true,
        importance: AndroidImportance.HIGH, 
      },
    });
    return notificationId;
  }
  async function displayTriggerNotification(
    title: string,
    body: string,
    date4: Date,
    hours: any,
    minutes: any,
    repeatFrequency: RepeatFrequency | undefined = undefined
  ) {
    // Create a channel required for Android Notifications
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    
    });
  const getTimestamp = () => {
    const timestampDate = date4;
    timestampDate.setHours(parseInt(hours));
    timestampDate.setMinutes(parseInt(minutes));
    return timestampDate.getTime();
  };
    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: getTimestamp(),
      //timestamp: timestamp, // fire at the provided date
      repeatFrequency: repeatFrequency, // repeat the notification on a hourly/daily/weekly basis
    };
  
    // Create a trigger notification
    const triggerNotificationId = await notifee.createTriggerNotification(
      {
        // id: "string" | updates Notification instead if provided id already exists
        title: title,
        body: body,
        android: {
          channelId,
          color: AndroidColor.RED,
          importance:AndroidImportance.HIGH,
          colorized:true,
          showTimestamp: true,
          
        },
      },
      trigger, // use displayNotification to update triggerNotifications which trigger already fired
    );
    SaveData(triggerNotificationId, title, body, date4.toLocaleDateString(), hours, minutes)
    return triggerNotificationId;
    //let id = triggerNotificationId;
     // console.warn(title, body, date4, hours, minutes);
    //SaveData(id, title, body,  )
  }
  
 
    // Please note, for iOS, a repeating trigger does not work the same as Android - the initial trigger cannot be delayed
    // See https://notifee.app/react-native/docs/triggers

    // You can also use Intervall triggers
    /*
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: 30
      timeUnit: TimeUnit.MINUTES
    };
    */

    // Create a trigger notification
   

  // get all trigger notifications
  async function getTriggerNotificationIds() {
    const triggerNotificationIds = await notifee.getTriggerNotificationIds();
    console.warn(triggerNotificationIds);
    return triggerNotificationIds;
  }

  // cancel all or specific trigger notifications
  async function cancelTriggerNotifications(notificationIds: string[] | undefined) {
    await notifee.cancelTriggerNotifications(notificationIds);
  }

  // cancel all notifications
  async function cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }

  // cancel notification via notificationId or tag
  async function cancelNotification(notificationId: string, tag: string | undefined = undefined) {
    await notifee.cancelNotification(notificationId, tag);
  }
  const SaveData = async (triggerNotificationId: string, title: string, body:string, date:string, hours:string, minutes: string) => {
    
      //const [alarmList, setAlarmList] = useState([]);
      {/*const alarmList1 : string[] = [];*/}
     
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
        console.warn(alarmList1);
        await AsyncStorage.setItem('alarmList', JSON.stringify(updatedAlarm));
        console.warn("Saved!");
  }

  // There are way more methods I didn't cover here that can help you in various scenarios
  // See https://notifee.app/react-native/reference

  return {
    displayNotification,
    displayTriggerNotification,
    getTriggerNotificationIds,
    cancelTriggerNotifications,
    cancelAllNotifications,
    cancelNotification
  }
}
