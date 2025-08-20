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
 import styles, { pitchBoxHeight, pitchBoxWidth, heightRange } from './styles';
 import { fqzToPosition, pitchFrequencies } from './API';

 interface PitchMatchScreenProps {
  onBack: () => void;
}

 //pitch match screen
const PitchMatchScreen: React.FC<PitchMatchScreenProps> = ({ onBack }) => {

    // can I do states here?
    const [position, setPosition] = useState(250);
    const [hz, setHz] = useState(0);
    const [note, setNote] = useState("C");
    const [pitchLine, setPitchLine] = useState<number[]>([]);
    const [targetLine, setTargetLine] = useState(440);
    const [targetText, setTargetText] = useState('A4');

    function setTarget(note: string)
    {
      setTargetText(note);
      setTargetLine(pitchFrequencies[note]);
    }

   useEffect(() => {
    let subscription: any; 
  
    try {
      PitchDetector.start();
      subscription = PitchDetector.addListener((value: { frequency: number, tone: string}) => {
        setPitchLine(prev => {
          const updated = [(heightRange) - fqzToPosition(value.frequency) - 2, ...prev]; // - 2 is half of the tail block height, so the pitch goes through the center
            const MAX_LENGTH = 500;
            return updated.slice(0, MAX_LENGTH);
          });

        setHz(value.frequency);
        setNote(value.tone);
        let position = (heightRange) - fqzToPosition(value.frequency) - 3; // - 3 is half of the pitch block height so the pitch goes through the center
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

  return (
    <SafeAreaView style={styles.pitchmatchContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text> 
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginBottom: 0}}>
          <Text style={[styles.titleText, {marginBottom: 2}]}>Pitch Match</Text> 
          <TouchableOpacity style={[styles.button, {width:'40%', height:'80%', margin:2, marginLeft:20, paddingVertical:5}]} onPress={() => setTarget('C4')}>
            <Text style={styles.backButtonText}>Set Target</Text> 
          </TouchableOpacity>
        </View>
        
        <View style={styles.pitchBox}>
          {
            Object.entries(pitchFrequencies).map(([pitch,fqz],index) => (
              <View key={pitch} style={[styles.pitchGrid, {top:heightRange - fqzToPosition(fqz)}]}></View>
            ))
          }
          <Text style={[styles.targetText, {top: (heightRange - 18) - fqzToPosition(targetLine)}]}>{targetText}</Text>
          <View style={[styles.targetLine, {top: (heightRange - 2) - fqzToPosition(targetLine)}]}/>
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