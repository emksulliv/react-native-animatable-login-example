import React, {Component} from 'react';
import { StyleSheet, Text, View, 
    ImageBackground, TextInput, 
    TouchableOpacity, Image, 
    Animated, Dimensions, 
    Keyboard, Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Wave from 'react-native-waveview';
import {Icon} from 'native-base';
import {Font} from 'expo';

const SCREEN_HEIGHT = Dimensions.get('window').height
import * as Animatable from 'react-native-animatable'

class LoginScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    componentWillMount() {
        this.loginHeight = new Animated.Value(150)

        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
        this.keyboardWillShow)

        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
        this.keyboardWillHide)

        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
        // this.keyboardDidShow)

        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
        // this.keyboardDidHide)

        this.keyboardHeight = new Animated.Value(0)
        this.forwardArrowOpacity = new Animated.Value(0)
        this.borderBottomWidth = new Animated.Value(0)
    }

    keyboardWillShow = (event) => {

        if (Platform.OS == 'android') {
            duration = 100
        }
        else {
            duration = event.duration
        }

        Animated.parallel([

            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,
                toValue: event.endCoordinates.height + 10
            }),

            Animated.timing(this.forwardArrowOpacity, {
                duration: duration,
                toValue: 1
            }),

            Animated.timing(this.borderBottomWidth, {
                duration: duration,
                toValue: 1
            })
        ]).start()
    }

    keyboardWillHide = (event) => {

        Animated.parallel([

            Animated.timing(this.keyboardHeight, {
                duration: event.duration + 100,
                toValue: 0
            }),

            Animated.timing(this.forwardArrowOpacity, {
                duration: event.duration,
                toValue: 0
            }),

            Animated.timing(this.borderBottomWidth, {
                duration: event.duration,
                toValue: 0
            })
        ]).start()
    }

    increaseHeightOfLogin = () => {
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration:500
        }).start(()=>{
            this.refs.textInput.focus()
        })
    }

    decreaseHeightOfLogin = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight, {
            toValue:150,
            duration:500
        }).start()
    }

  render() {

    const headerTextOpacity = this.loginHeight.interpolate({
        inputRange:[150, SCREEN_HEIGHT],
        outputRange:[1,0]
    })

    const marginTop = this.loginHeight.interpolate({
        inputRange:[150, SCREEN_HEIGHT],
        outputRange:[25,100]
    })

    const headerBackArrowOpacity= this.loginHeight.interpolate({
        inputRange:[150, SCREEN_HEIGHT],
        outputRange:[0,1]
    })

    return (
        <View style = {{ flex: 1}}>

            <Animated.View
                style = {{
                    position:'absolute',
                    height:60,width:60,
                    top:60,
                    left:25,
                    zIndex:100,
                    opacity:headerBackArrowOpacity
            }}>
            
                <TouchableOpacity
                    onPress={() => this.decreaseHeightOfLogin()}>
                    <Icon name="md-arrow-back" style = {{color:'black'}}/>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View
                style={{
                    position: 'absolute',
                    height: 60, width: 60,
                    right:10,
                    bottom: this.keyboardHeight, //animated
                    opacity: this.forwardArrowOpacity, //animated
                    zIndex: 100,
                    backgroundColor: '#54575e',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15
                }}>

                <Icon name="md-arrow-forward" style={{color: 'white'}} />

            </Animated.View>

            <ImageBackground
                source={require('../assets/login_bg2.png')}
                style={{flex: 1}}
            >

            <Animatable.View 
                animation = "zoomIn" iterationCount={1}
                style={styles.waveContainer} >
                <Wave
                  style={styles.waveBall}
                  H={70}
                  waveParams={[
                      {A: 10, T: 180, fill: '#86cdf9'},
                      {A: 15, T: 140, fill: '#97c7e5'},
                      {A: 20, T: 100, fill: '#bcdef4'},
                  ]}
                  animated={true}
                />
                <Text style={styles.title}>Wave App</Text>
              </Animatable.View>

            {/** BOTTOM HALF */}
            <Animatable.View animation="slideInUp" iterationCount={1}>
                <Animated.View style={{
                        height: this.loginHeight,
                        backgroundColor: 'white'
                    }}>

                    <Animated.View style ={{
                            opacity: headerTextOpacity, //animated
                            alignItems:'flex-start',
                            paddingHorizontal: 25,
                            marginTop: marginTop//animated
                        }}>
                        <Text style ={{ fontSize: 24}}> 
                        Sign in or Sign Up </Text>
                    </Animated.View>
                

                    <TouchableOpacity
                        onPress = {()=> this.increaseHeightOfLogin()}
                    >
                        <View style={{
                            marginTop: this.marginTop, //animated
                            paddingHorizontal: 25,
                            flexDirection: 'row',
                        }}>
                            <Animated.View 
                                pointerEvents="none"
                                style={{flexDirection: 'row', 
                                flex: 1,
                                borderBottomWidth: this.borderBottomWidth //animated
                                }}>
                                
                                <Text style={{
                                    fontSize:20,
                                    paddingHorizontal: 10

                                }}>Sign-In</Text>

                                <TextInput 
                                    ref="textInput"
                                    style={{flex:1, fontSize:20}}
                                    placeholder="Enter UserName"
                                    underlineColorAndriod="transparent"/>                               
                            </Animated.View>
                        </View>                        
                    </TouchableOpacity>
                </Animated.View>

                <View>
                    <View  style ={{
                            height: 70,
                            backgroundColor: 'white',
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            borderTopColor: '#e8e8ec',
                            borderTopWidth: 1,
                            paddingHorizontal: 25
                        }}>

                        <Text
                            style={{
                                color: '#c7b3d6', fontWeight:
                                'bold'
                        }}>

                        or connect using a social account

                        </Text>
                    </View>
                </View>

            </Animatable.View>
            </ImageBackground>
        </View>
    );
  }
}

export default LoginScreen;

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
      marginTop: 30,

    }
  });
