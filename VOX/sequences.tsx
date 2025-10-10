/**
 * Sequences page for Voxxy app 
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
 import styles from './UI/styles';
 import BackButton from './UI/backButton';

 interface SequenceScreenProps {
  onBack: () => void;
}

 //pitch match screen
const SequenceScreen: React.FC<SequenceScreenProps> = ({ onBack }) => {
    // can I do states here?
    const [count, setCount] = useState(0);
    const handleCount = () => {
    setCount(count+1);
    };

  return (
    <SafeAreaView style={styles.sequenceContainer}>
      {/*<View style={styles.contentBox}>*/}
        <BackButton onBack={onBack}/>
        <Text style={styles.titleText}>Sequences Game</Text>
        <Text style={{color: '#c8dcdfff', fontSize: 16}}>
          Welcome to the interval game! {"\n"}
          {count}
        </Text>
        <Button title='Count' onPress={handleCount}></Button>
    </SafeAreaView>
  );
};

export default SequenceScreen;