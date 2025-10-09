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
 import { Pitch, Pitches } from './API/pitch';
 import Dropdown from './UI/dropdown';
 import {ItemType} from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileProps{
  done: () => void;
}

export class Profile {
  public name!: string;
  public low_range!: Pitch;
  public high_range!: Pitch;

  constructor(){
    this.name = "username";
    this.low_range = new Pitch("C2", 65.41);
    this.high_range = new Pitch("C6", 1046.50);
  }

  public RetreiveProfile = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('user_profile');
        if(jsonValue != null) {
          const parsedData = JSON.parse(jsonValue);
          this.name = parsedData.name;

          this.low_range = new Pitch(parsedData.low_range.note, parsedData.low_range.frequency); 
          this.high_range = new Pitch(parsedData.high_range.note, parsedData.high_range.frequency);
      
          Pitches.setRange();
        }
      } catch (e) {
        console.error('Error loading user data:', e);
      }
    };

  public SaveProfile = async () => {
    try {
      const jsonValue = JSON.stringify(this); 
      await AsyncStorage.setItem('user_profile', jsonValue);
      console.log('User data saved successfully.');
    } catch (e) {
      console.error('Error saving user data:', e);
    }
  }
}

const ProfileScreen: React.FC<ProfileProps> = ({done}) => {
  const [user, setUser] = useState(new Profile());
  const [name, setName] = useState<string>(user.name);
  const [low_range, setLow_range] = useState<string | null>(user.low_range.note);
  const [high_range, setHigh_range] = useState<string | null>(user.high_range.note);
  const [rangeGame, setRangeGame] = useState<boolean>(false);

   useEffect(() => {
        const loadProfile = async () => {
            const user = new Profile();
            await user.RetreiveProfile(); 
            setUser(user);
            
            setName(user.name);
            setLow_range(user.low_range.note);
            setHigh_range(user.high_range.note);
        };
        loadProfile();
        
    }, []);

  const handleSetRangeGame = () => {
    console.log("Profile Data Loaded. Low Range Note:", user.low_range.note);
    if(rangeGame == true)
    {
      setRangeGame(false);
    }else{
      setRangeGame(true);
    }
  }

  const setProfile = () => {
    user.name = name;
    user.SaveProfile();
    Pitches.setRange();
  }

  const handleDone = () => {
    setProfile();
    done();
  }


const lowRangeItems = React.useMemo(() => {
    const items =  Pitches.allPitches
        .filter(pitch => pitch.frequency <= user.high_range.frequency)
        .map(pitch => ({ label: pitch.note, value: pitch.note })); // Added value for Dropdown
    
    return items;
}, [user]);

const highRangeItems = React.useMemo(() => {
    return Pitches.allPitches
        .filter(pitch => pitch.frequency >= user.low_range.frequency)
        .map(pitch => ({ label: pitch.note, value: pitch.note })); // Added value for Dropdown
}, [user]);

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