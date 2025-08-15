/**
 * Main page for Voxxy app 
 * by @author Sky Vercauteren 
 * August 2025
**/

import React , {useState, useEffect} from 'react';
import { 
  Button, 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
 } from 'react-native';

import styles from './VOX//styles';
import PitchMatchScreen from './VOX//pitchmatch';
import IntervalScreen from './VOX//intervals';
import SequenceScreen from './VOX//sequences';

//Everything happens in here?
const App = () => {

    // Function to request microphone permissions
  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to record audio.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Microphone permission granted');
        } else {
          console.log('Microphone permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // The useEffect hook runs the code inside it after the component renders.
  // The empty dependency array [] ensures it only runs once on mount.
  useEffect(() => {
    requestPermissions();
  }, []);
  
  //so heres a hook
    const [currentScreen, setCurrentScreen] = useState('main');

  // This function will be called when the "Pitch Match" button is pressed.
  const handlePitchMatchPress = () => {
    setCurrentScreen('pitchMatch');
  };

  //when Interval button is pressed
  const handleIntervalsPress = () => {
    setCurrentScreen('intervals');
  };

  //when sequence is pressed
  const handleSequencePress = () => {
    setCurrentScreen('sequence');
  };

  // This function will be passed to the new screen to handle going back.
  const handleGoBack = () => {
    setCurrentScreen('main');
  };

  // We use a conditional return to render the correct screen.
  switch(currentScreen){
    case 'pitchMatch':
      return <PitchMatchScreen onBack={handleGoBack} />;
    case 'intervals':
      return <IntervalScreen onBack={handleGoBack} />;
    case 'sequence':
      return <SequenceScreen onBack={handleGoBack} />;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContent}>
        <Text style={styles.titleText}>Voxxy</Text>
        
        {/* The three buttons handle changing screens*/}
        <TouchableOpacity style={styles.button} onPress={handlePitchMatchPress}>
          <Text style={styles.buttonText}>Pitch Match</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleIntervalsPress}>
          <Text style={styles.buttonText}>Interval Training</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSequencePress}>
          <Text style={styles.buttonText}>Sequences</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default App;
