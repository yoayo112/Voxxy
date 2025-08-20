/**
 * Pitch matching page for Voxxy app 
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
 import styles, { pitchBoxHeight, pitchBoxWidth } from './styles';
 import { fqzToPosition } from './API';

 interface PitchMatchScreenProps {
  onBack: () => void;
}

 //pitch match screen
const PitchMatchScreen: React.FC<PitchMatchScreenProps> = ({ onBack }) => {

    // can I do states here?
    const [position, setPosition] = useState(250);
    const [hz, setHz] = useState(0);
    const [note, setNote] = useState("C");
    const [pitchLine, setPitchLine] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,0,0]);


   useEffect(() => {
    let subscription: any; 
  
    try {
      PitchDetector.start();
      subscription = PitchDetector.addListener((value: { frequency: number, tone: string}) => {
        setPitchLine(prev => {
          const updated = [(pitchBoxHeight-15) - fqzToPosition(value.frequency), ...prev];
            const MAX_LENGTH = 500;
            return updated.slice(0, MAX_LENGTH);
          });

        setHz(value.frequency);
        setNote(value.tone);
        let position = (pitchBoxHeight-15) - fqzToPosition(value.frequency);
        setPosition(position);

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
    
    const moveSquareUp = () => {
    // You'll need to define how much to move the square.
    // For example, move it up by 10 pixels.
    if (position > 0) { // Add boundary check to prevent it from moving off-screen
        setPosition(position - 10);
    }
  };

  const moveSquareDown = () => {
    // Move it down by 10 pixels.
    if (position < 490) { // Add boundary check
       setPosition(position + 10);
    }
  };

  return (
    <SafeAreaView style={styles.pitchmatchContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text> 
        </TouchableOpacity>
        <Text style={styles.titleText}>Pitch Match</Text> 
        <View style={styles.pitchBox}>
          <View style={[styles.targetLine, {top: (pitchBoxHeight-15) - fqzToPosition(440)}]}/>
          <View style={[styles.pitchSquare, {top: position}]} />
          {
            pitchLine.map((item, index) => (
            <View
              key={index}
              style={[
                styles.pitchTail,
                {
                  position: 'absolute',
                  top: item,
                  left: pitchBoxWidth - (pitchBoxWidth/2) - index - 12, // optional horizontal spacing
                  opacity: 1 - index / (pitchLine.length *0.35)// fade effect
                }
              ]}></View>
          ))}

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

export default PitchMatchScreen;