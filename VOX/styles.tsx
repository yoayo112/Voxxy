/**
 * style css page for Voxxy app 
 * by @author Sky Vercauteren 
 * August 2025
**/

import { StyleSheet } from 'react-native';

// We export the styles so they can be imported and used in other files.
const styles = StyleSheet.create({
  pitchmatchContainer: {
    flex: 1,
    backgroundColor: '#16083dff',
  },
  intervalContainer: {
    flex: 1,
    backgroundColor: '#282c2eff',
  },
  sequenceContainer: {
    flex: 1,
    backgroundColor: '#411414ff',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#2cf7baff',
  },
  contentBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
    color: '#fdfdfdff',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  button: {
    // This is the key change! We set the width to '80%'.
    width: '80%',
    backgroundColor: '#04756cff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center', // This centers the text horizontally inside the button
    margin: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#53f396ff', // A red color for a back button
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default styles;