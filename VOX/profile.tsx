/**
 * Profile page for Voxxy App.
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
 import styles from './styles';

 interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({onBack}) => {
      return (
    <SafeAreaView style={styles.profileContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Go Back</Text> 
        </TouchableOpacity>
    </SafeAreaView>
      );
};

export default ProfileScreen;