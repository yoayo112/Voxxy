import React , {useState} from 'react';
import { 
  Button, 
  SafeAreaView, 
  Text, 
  View,
  TouchableOpacity
 } from 'react-native';

// Import the stylesheet we just created.
import styles from './styles';


//Everything happens in here?
const App = () => {

  //expirementing with a button
  
  //so0 heres a hook
  const [count, setCount] = useState(0);

  //and the corresponding function
  const handlePress = () => {
    // We update the state by calling setCount with the new value.
    setCount(count + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.titleText}>Voxxy</Text>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Pitch Match</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Interval Training</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Sequences</Text>
        </TouchableOpacity>
        <Text>{count}</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
