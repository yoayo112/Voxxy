/**
 * Profile page for Voxxy App.
 * by @author Sky Vercauteren 
 * August 2025
**/

import React , {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity,
  TextInput
 } from 'react-native';
 import styles from './UI/styles';
 import Dropdown from './UI/dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

export var Profile: Record<string, string> = {
  "name" : "",
  "low_range": "",
  "high_range": ""
}

export const RetreiveProfile = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user_profile');
      if(jsonValue != null)
        {
          Profile["name"] = JSON.parse(jsonValue).name;
          Profile["low_range"] = JSON.parse(jsonValue).low_range;
          Profile["high_range"] = JSON.parse(jsonValue).high_range;
        }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  };

const ProfileScreen: React.FC = () => {
  const [text, setText] = useState<string>('');

      return (
    <View style={styles.profileContainer}>
      <Text style={[styles.titleText,{marginTop:40}]}>Profile</Text>
     <View style={styles.form}>
      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        onChangeText={newText => setText(newText)}
        value={text}
        placeholder="e.g., John Doe"
      />
      <Text style={styles.label}>Vocal Range: Lowest Note</Text>
      <Dropdown placeholder='C2'/>
      <Text style={styles.label}>Vocal Range: Highest Note</Text>
      <Dropdown placeholder='C6'/>
    </View>
    </View>
      );
};

export default ProfileScreen;