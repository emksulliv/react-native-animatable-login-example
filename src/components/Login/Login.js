import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Wave from 'react-native-waveview';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>

          {/* <Image
            style={styles.logo}
            source={require('../../images/lightbulb.png')}
            /> */}

              <View style={styles.waveContainer} >
                <Wave
                  style={styles.waveBall}
                  H={70}
                  waveParams={[
                      {A: 10, T: 180, fill: '#62c2ff'},
                      {A: 15, T: 140, fill: '#0087dc'},
                      {A: 20, T: 100, fill: '#1aa7ff'},
                  ]}
                  animated={true}
                />

                <Text style={styles.title}>Wave App</Text>
              </View>
              
        </View>
        <View style={styles.formContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf3ff'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1, 
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  waveContainer: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wave: {
    width: 50,
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  waveBall: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  title: {
    color: '#000000', 
    justifyContent: 'center',
    marginTop: 30
  }
});
