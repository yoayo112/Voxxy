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
    <View style={styles.profileContainer}>

      <Text style={[styles.titleText,{marginTop:40}]}>Profile</Text>
    </View>
      );
};

export default ProfileScreen;