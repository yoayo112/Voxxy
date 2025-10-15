/**
 * range determination page for Voxxy app 
 * used by the profile section
 * by @author Sky Vercauteren 
 * August 2025
**/

//TODO: 
// - play pitch
// - show target
// - if score is good enough for long enough (how to check??) - increment pitch
// - if score is bad enough for long enough (how to check??) - say "try again!"
// - if failed twice in a row- -> set pitch as range!! 
// Some Kind of visual?? 

import React , {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity,
 } from 'react-native';
import { PitchDetector } from 'react-native-pitch-detector';
import { Pitches } from './API/pitch';
import {Grade} from './API/grade';
import { Profile } from './profile';
import styles from './UI/styles';
import BackButton from './UI/backButton';

const Sound = require('react-native-sound');

 interface setRangeScreenProps {
  onBack: () => void;
}


 //pitch match screen
const SetRangeScreen: React.FC<setRangeScreenProps> = ({ onBack }) => {
  
  const startPitch = Pitches.C4;
  const lowPitch = Pitches.C4;
  const highPitch = Pitches.C4;

    const [hz, setHz] = useState(0);
    const [note, setNote] = useState("C4");
    const [low_max, setLow_max] = useState("C4");
    const [high_max, setHigh_max] = useState("C4");
    const [expected, setExpected] = useState(Pitches.C4.frequency);
    const [grade, setGrade] = useState(1.0); // TODO this needs to be scored per "slice" 

    function startNextTarget(){

      
    }


   useEffect(() => {
    let subscription: any; 
  
    try {
      PitchDetector.start();
      subscription = PitchDetector.addListener((value: { frequency: number, tone: string}) => {
        setHz(value.frequency); // the fqz of what you are singing
        setNote(value.tone);    // the name of the pitch you are singing. 
        setGrade(Grade.grade(expected, value.frequency));

      });
      console.log("Pitch detection started.");
    } catch (e) {
      console.error("Failed to start pitch detector:", e);
    }
    
    // The cleanup function
    return () => {
      // Check if the subscription object exists before trying to remove it
      if (subscription) {
        PitchDetector.stop();
        PitchDetector.removeListener();
        console.log("Pitch detection stopped and listener removed.");
      }
    };
  }, []); 

  return (
    <SafeAreaView style={{top:25}}>
        <TouchableOpacity style={[styles.backButton, { position:"absolute", right:10}]} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text> 
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginBottom:0}}>
          <Text style={[styles.titleText, {marginBottom: 2}]}>Range Check</Text> 
        </View>
      <View style={styles.controls}>
        <Text style={styles.titleText}>
          Pitch: {note}
        </Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.titleText}>
          {hz}
        </Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.titleText}>
          Grade: {grade}
        </Text>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={startNextTarget}>
          <Text style={styles.buttonText}>Next Target!</Text> 
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SetRangeScreen;