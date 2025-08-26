/**
 * simple back button interface
 * @author Sky Vercauteren 2025
 */

import React from 'react';
import {
    Text,  
    TouchableOpacity,
 } from 'react-native';
 import styles from './styles';

  interface props {
  onBack: () => void;
}

 const BackButton: React.FC<props> =  ({ onBack })  => {
    return (
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
    );
 };

 export default BackButton;