/**
 * range determination page for Voxxy app 
 * used by the profile section
 * by @author Sky Vercauteren 
 * August 2025
**/

import React , {useState, useEffect} from 'react';
import { 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity,
 } from 'react-native';
 import { PitchDetector } from 'react-native-pitch-detector';
 import { Pitches } from './API/pitch';
 import { Profile } from './profile';
  import styles from './UI/styles';
 import BackButton from './UI/backButton';

 interface setRangeScreenProps {
  onBack: () => void;
}

 //pitch match screen
const SetRangeScreen: React.FC<setRangeScreenProps> = ({ onBack }) => {
  
  const startPitch = Pitches.C4;
  const lowPitch = Pitches.C4;
  const highPitch = Pitches.C4;

    const [position, setPosition] = useState(250);
    const [hz, setHz] = useState(0);
    const [note, setNote] = useState("C4");
    const [grade, setGrade] = useState(1); // TODO this needs to be scored per "slice" 


   useEffect(() => {
    let subscription: any; 
  
    try {
      PitchDetector.start();
      subscription = PitchDetector.addListener((value: { frequency: number, tone: string}) => {
        setHz(value.frequency); // the fqz of what you are singing
        setNote(value.tone);    // the name of the pitch you are singing. 
        setGrade(expected => {
            let score = 1;
            // TODO : use value, frequency, and tone to "grade" the acuracy of the pitch
            return score;
          });

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
    <SafeAreaView >
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text> 
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginBottom: 0}}>
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
    </SafeAreaView>
  );
};

export default SetRangeScreen;