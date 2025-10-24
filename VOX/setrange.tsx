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

      // Get target (increment)

      // Play sound
      //TODO refactor this into "pitches" so I should be able to "import" pitches and call playback with a single line.
      if (sound) {
        sound.play((success) => {
          console.log("trying to play");
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
            // Reset the player to the beginning
            sound.setCurrentTime(0);
          }
        });
      }
      //wait for note to finish before listening
      const timerId = setTimeout(() => {
            evaluate();
        }, 5000);
    }

    const evaluate = useCallback(() => {
      //start listening
      setAvgGrade(0.0);
      setListening(true);

      //wait 5 seconds then stop listening: grade will happen while listening.
      const timerId = setTimeout(() => {
            setListening(false);
            //determine retry, increment, or decrement. 
           //what is the score threshold? -- for now I am saying 70%
           if(avgGrade >=70)
           {
             console.log(avgGrade+ " great job you passed. lets increment the pitch!");
           }else{
             console.log(avgGrade+" hmm keep working at it!");
           }
           }, 3000);
    }, [avgGrade]);

    const loadSounds = () => {
      // TODO: all library sounds. from pitches.
     const sound = new Sound("c4.mp3", Sound.MAIN_BUNDLE, (error: any) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
      sound.setVolume(1.0);
      // 4. Update state with the loaded Sound object
      setSound(sound);
    });
  };

  const releaseSounds = () => {
    // TODO all library sounds. from pitches.
    if (sound) {
        sound.release();
        setSound(null);
      }
  }

  //playback effect
  useEffect(() =>{
    loadSounds();
    return () => {
      releaseSounds();
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