/**
 * style css page for Voxxy app 
 * by @author Sky Vercauteren 
 * August 2025
**/

import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
export const pitchBoxHeight = height - (height/3)
export const pitchBoxWidth = width - 20;


// We export the styles so they can be imported and used in other files.
const styles = StyleSheet.create({
  pitchBox: {
    width: pitchBoxWidth,
    height: pitchBoxHeight,
    marginHorizontal: 10,
    borderColor: "#84d3ebff",
    borderWidth: 1,
    marginTop: 10,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : 'black',
  },
  pitchSquare: {
    width: 10,
    height: 10,
    marginLeft: 0,
    backgroundColor: '#fa54ecff',
    position: 'absolute',
  },
  pitchTail: {
    width: 10,
    height: 10,
    marginLeft: 0,
    backgroundColor: '#ffffffff',
    position: 'absolute',
  },
  targetLine: {
    height: 8, 
    backgroundColor: '#00d460ff', 
    width: '25%', 
    marginLeft:100, 
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pitchmatchContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  mainContent: {
    flex:1,
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
    justifyContent:'flex-start',
    marginTop: 45,
    padding: 10,
    backgroundColor: '#53f396ff',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default styles;