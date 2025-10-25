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

import React , {useState, useEffect, useCallback} from 'react';
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

import Sound from 'react-native-sound';
//const Sound = require('react-native-sound');

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
    const [grade, setGrade] = useState(1.0);
    const [avgGrade, setAvgGrade] = useState(0.0);
    const [listening, setListening] = useState(false);

    Sound.setCategory('Playback');
    const [sound, setSound] = useState<Sound | null>(null);

    function startNextTarget(){
      // Stop listening
      setListening(false);
      setAvgGrade(0.0);

      //play current target
      Pitches.noteToPitch(note).play();
      
      //wait for note to finish before listening
      const timerId = setTimeout(() => {
            evaluate();
        }, 3000);
    }


  const evaluate = useCallback(() => {
      setListening(true);

      const timerId = setTimeout(() => {
          setListening(false);

          //woah, so apparently there is an internal promise from the setter to force the most current version through the setter, so I can read it from the setter, then reset it lol. 
          setAvgGrade(latestAvgGrade => {
              if (latestAvgGrade >= 70) { 
                  console.log(latestAvgGrade + " great job you passed. lets increment the pitch!");
              } else {
                  console.log(latestAvgGrade + " hmm keep working at it!");
              }
              // We return the same value because we just wanted to read it, not change it.
              return latestAvgGrade; 
          });
      }, 3000); 
      
    return () => clearTimeout(timerId);
  }, [setListening, setAvgGrade]);


  //playback effect
  useEffect(() =>{
    Pitches.loadAll();
    return () => {
      Pitches.releaseAll();
    }
  }, []);

  // pitch detection effect
   useEffect(() => {
    let subscription: any; 
  
    if(listening == true){
      try {
        PitchDetector.start();
        subscription = PitchDetector.addListener((value: { frequency: number, tone: string}) => {
          setHz(value.frequency); // the fqz of what you are singing
          setNote(value.tone);    // the name of the pitch you are singing. 
          let current = Grade.grade(expected, value.frequency)
          setAvgGrade((grade + current) / 2);
          setGrade(current);

      });
        console.log("Pitch detection started.");
      } catch (e) {
        console.error("Failed to start pitch detector:", e);
      }
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
  }, [listening]); 

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
          Grade: {avgGrade}
        </Text>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={startNextTarget}>
          <Text style={styles.buttonText}>Next Target!</Text> 
        </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SetRangeScreen;