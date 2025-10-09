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
 import SetRangeScreen from './setrange';
 import styles, {pitchBoxWidth} from './UI/styles';
 import { pitchFrequencies, setRange } from './pitchAPI';
 import Dropdown from './UI/dropdown';
 import {ItemType} from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileProps{
  done: () => void;
}

export var Profile: Record<string, string> = {
  "name" : "",
  "low_range": "",
  "high_range": ""
}

export const RetreiveProfile = async () => {
  console.log("retrieving data");
    try {
      const jsonValue = await AsyncStorage.getItem('user_profile');
      console.log(jsonValue);
      if(jsonValue != null)
        {
          Profile["name"] = JSON.parse(jsonValue).name;
          Profile["low_range"] = JSON.parse(jsonValue).low_range;
          Profile["high_range"] = JSON.parse(jsonValue).high_range;
          setRange();
        }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
  };

export const SaveProfile = async () => {
    try {
    const jsonValue = JSON.stringify(Profile);
    await AsyncStorage.setItem('user_profile', jsonValue);
    console.log('User data saved successfully.');
  } catch (e) {
    console.error('Error saving user data:', e);
  }
}

const ProfileScreen: React.FC<ProfileProps> = ({done}) => {
  const [name, setName] = useState<string>(Profile["name"]);
  const [low_range, setLow_range] = useState<string | null>(Profile["low_range"]);
  const [high_range, setHigh_range] = useState<string | null>(Profile["high_range"]);
  const [rangeGame, setRangeGame] = useState<boolean>(false);

  const handleSetRangeGame = () => {
    if(rangeGame == true)
    {
      setRangeGame(false);
    }else{
      setRangeGame(true);
    }
  }

  const setProfile = () => {
    Profile["name"] = name;
    Profile["low_range"] = low_range != null ? low_range : 'C2';
    Profile["high_range"] = high_range != null ? high_range : "C6";
    SaveProfile();
    setRange();
  }

  const handleDone = () => {
    setProfile();
    done();
  }



  let hr_fq = high_range != null ? high_range : "C6";
  const lowRangeItems = Object.keys(pitchFrequencies)
    .filter(pitch => pitchFrequencies[pitch] < pitchFrequencies[hr_fq])
    .map(key => ({ label: key, value: key }));

  let lr_fq = low_range != null ? low_range : 'C2';
  const highRangeItems = Object.keys(pitchFrequencies)
    .filter(pitch => pitchFrequencies[pitch] > pitchFrequencies[lr_fq])
    .map(key => ({ label: key, value: key }));

  return (
    <View style={styles.profileContainer}>
      {rangeGame && <SetRangeScreen onBack={handleSetRangeGame} /> }
      {!rangeGame &&
        <View style={styles.profileContainer}>
          <Text style={[styles.titleText,{marginTop:40}]}>Profile</Text>
          <View style={styles.form}>
          <Text style={styles.label}>Enter your name:</Text>
          <TextInput
            style={[styles.input,{marginBottom:10}]}
            onChangeText={newText => setName(newText)}
            value={name}
            placeholder={name}
          />
          <Text style={styles.label}>Vocal Range: Lowest Note</Text>
          <Dropdown 
            placeholder={low_range || "Select Low Note"} 
            items={lowRangeItems}
            value={low_range}
            setValue={setLow_range}
          />
          <Text style={styles.label}>Vocal Range: Highest Note</Text>
          <Dropdown 
            placeholder={high_range || "Select High Note"} 
            items={highRangeItems}
            value={high_range}
            setValue={setHigh_range}
          />
          </View>
          <TouchableOpacity style={[styles.button, {backgroundColor:"#09c9b9ff", left:10}]} onPress={handleSetRangeGame}>
            <Text >Determine Your Range</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.backButton, {position:'absolute', bottom:80, left:(pitchBoxWidth/2)-30}]} onPress={handleDone}>
            <Text >Done</Text>
          </TouchableOpacity>
        </View>
      }
      
    </View>
  );
};

export default ProfileScreen;