import React , {useState} from 'react';
import { 
  Button, 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity
 } from 'react-native';

import styles from './styles';

//pitch match screen
const PitchMatchScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.pitchmatchContainer}>
      <View style={styles.contentBox}>
        <Text style={styles.titleText}>Pitch Match Game</Text>
        <Text style={{color: '#c8dcdfff', fontSize: 16}}>
          // Add your Pitch Match game logic here.
          Welcome to the pitch matching game!
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//Interval screen
const IntervalScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.intervalContainer}>
      <View style={styles.contentBox}>
        <Text style={styles.titleText}>Interval Game</Text>
        <Text style={{color: '#c8dcdfff', fontSize: 16}}>
          // Add your Interval game logic here.
          Welcome to the Interval game!
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//Sequence screen
const SequenceScreen = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.sequenceContainer}>
      <View style={styles.contentBox}>
        <Text style={styles.titleText}>Sequence Game</Text>
        <Text style={{color: '#c8dcdfff', fontSize: 16}}>
          // Add your Sequence game logic here.
          Welcome to the Sequence game!
        </Text>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

//Everything happens in here?
const App = () => {

  //expirementing with a button
  
  //so0 heres a hook
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
  if (currentScreen === 'pitchMatch') {
    return <PitchMatchScreen onBack={handleGoBack} />;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.contentBox}>
        <Text style={styles.titleText}>Voxxy</Text>
        
        {/* The first button now calls the specific handler to change the screen. */}
        <TouchableOpacity style={styles.button} onPress={handlePitchMatchPress}>
          <Text style={styles.buttonText}>Pitch Match</Text>
        </TouchableOpacity>

        {/* The other buttons can be updated later to go to different screens. */}
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
