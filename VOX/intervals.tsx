/**
 * Intervals page for Voxxy app 
 * by @author Sky Vercauteren 
 * August 2025
**/

import React , {useState} from 'react';
import { 
  Button, 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity
 } from 'react-native';
 import styles from './styles';

 interface IntervalScreenProps {
  onBack: () => void;
}

 //pitch match screen
const IntervalScreen: React.FC<IntervalScreenProps> = ({ onBack }) => {
    // can I do states here?
    const [count, setCount] = useState(0);
    const handleCount = () => {
    setCount(count+1);
    };

  return (
    <SafeAreaView style={styles.intervalContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>Pitch Match Game</Text>
        <Text style={{color: '#c8dcdfff', fontSize: 16}}>
          Welcome to the interval game! {"\n"}
          {count}
        </Text>
        <Button title='Count' onPress={handleCount}></Button>
    </SafeAreaView>
  );
};

export default IntervalScreen;