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
 import styles from './styles';

 interface PitchMatchScreenProps {
  onBack: () => void;
}


 //pitch match screen
const PitchMatchScreen: React.FC<PitchMatchScreenProps> = ({ onBack }) => {
  
    // can I do states here?
    const [position, setPosition] = useState(250);
    const [hz, setHz] = useState(0);

 
    
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
          <View style={[styles.pitchSquare, {top: position}]} />
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