import React, {Component} from 'react';
import { StyleSheet, Text, View, 
    ImageBackground, TextInput, 
    TouchableOpacity, Image, 
    Animated, Dimensions, 
    Keyboard, Platform, 
    Button, AsyncStorage, Alert } from 'react-native';
import {StackNavigator} from 'react-navigation';
import Wave from 'react-native-waveview';
import {Icon} from 'native-base';
import {Font} from 'expo';
import * as Expo from 'expo';

const SCREEN_HEIGHT = Dimensions.get('window').height
import * as Animatable from 'react-native-animatable'

class LoginScreen extends Component {
    
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.state ={
            placeholderTextUsername: 'Enter your Username',
            placeholderTextPassword: 'Enter your Password',
            signedIn: false,
        }
    }

    state={username:"", password: ""}

    attemptLogin(){
        
        const { username, password } = this.state
        console.warn(username, password)
        if(username == 'Admin' && password == 'admin') {
            this.props.navigation.navigate('dashboard')
        } else {
            // console.warn('Login is wrong')
            Alert.alert('Error', 'Username or Password is incorrect', [{
                text: 'Okay'
            }])
        }
    }


    signIn = async () => {
        try {
            const result = await Expo.Google.logInAsync({
            //   androidClientId: YOUR_CLIENT_ID_HERE,
              iosClientId: 450091873068-dnkjiim6usr1ej8gcrh9sdrbsvp1tm7m.apps.googleusercontent.com,
              scopes: ['profile', 'email'],
            });
    
            if (result.type === 'success') {
              return result.accessToken;
            } else {
              return {cancelled: true};
            }
          } catch(e) {
            return {error: true};
          }
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
        this.passwordInputOpacity = new Animated.Value(0)
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

            Animated.timing(this.passwordInputOpacity, {
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

            Animated.timing(this.passwordInputOpacity, {
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

        this.setState({placeholderTextUsername: 'Username'})
        this.setState({placeholderTextPassword: 'Password'})
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

    increaseHeightOfSignUp= () => {

        this.setState({placeholderTextUsername: 'Create a Username'})
        this.setState({placeholderTextPassword: 'Create a Password'})
        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration:500
        }).start(()=>{
            this.refs.textInput.focus()
        })
    }

    decreaseHeightOfSignUp = () => {
        Keyboard.dismiss()
        Animated.timing(this.loginHeight, {
            toValue:150,
            duration:500
        }).start()
    }



    async signInWithGoogleAsync() {
        try {
          const result = await Expo.Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            behavior : 'web',
            iosClientId: '450091873068-dnkjiim6usr1ej8gcrh9sdrbsvp1tm7m.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
  
          if (result.type === 'success') {
            return result;
          } else {
            return {cancelled: true};
          }
        } catch(e) {
          return {error: true};
        }
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

    const passwordInputOpacity = this.loginHeight.interpolate({
        inputRange:[150, 300,SCREEN_HEIGHT],
        outputRange:[0, 0, 1]
    })

    const titleTextLeft= this.loginHeight.interpolate({
        inputRange:[150, SCREEN_HEIGHT],
        outputRange:[100, 25]
    })

    const titleTextBottom= this.loginHeight.interpolate({
        inputRange:[150, 400, SCREEN_HEIGHT],
        outputRange:[0, 0, 100]
    })

    const titleTextOpacity= this.loginHeight.interpolate({
        inputRange:[150, SCREEN_HEIGHT],
        outputRange:[0,1]
    })

    const UsernameTitleLeft= this.loginHeight.interpolate({
        inputRange:[150, SCREEN_HEIGHT],
        outputRange:[100, 5]
    })

    const UsernameTitleBottom= this.loginHeight.interpolate({
        inputRange:[150, 400, SCREEN_HEIGHT],
        outputRange:[0, 0, 0]
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
                <TouchableOpacity 
                    onPress={_ => this.attemptLogin()}>
                    <Icon name="md-arrow-forward" style={{color: 'white'}} />
                </TouchableOpacity>
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
                    <Animated.View style={{
                        marginTop: marginTop, //animated
                        paddingHorizontal: 25,
                        flexDirection: 'row',
                        }}>
                        <Animated.Text style = 
                            {{fontSize: 24, color: 'gray', 
                            position: 'absolute', 
                            bottom:titleTextBottom, 
                            left:titleTextLeft, 
                            opacity:titleTextOpacity}}>
                                Enter User Information
                        </Animated.Text>

                        <Animated.View 
                                pointerEvents="none"
                                style={{ flexDirection: "row",
                                flex: 1,
                                borderBottomWidth: this.borderBottomWidth //animated
                                }}>
                                
                                <Animated.Text style={{
                                    opacity: headerTextOpacity,
                                    fontSize:20,
                                    paddingHorizontal: 10

                                }}>Sign-In</Animated.Text>

                                <Animated.Text style = 
                                    {{fontSize: 20, 
                                    position: 'absolute', 
                                    bottom:UsernameTitleBottom, 
                                    left:UsernameTitleLeft, 
                                    opacity:titleTextOpacity}}>
                                        Username
                                </Animated.Text>

                                <TextInput 
                                    ref="textInput"
                                    style={{flex:1, fontSize:20, paddingLeft: 20}}
                                    placeholder={this.state.placeholderTextUsername}
                                    underlineColorAndroid="transparent"
                                    autoCorrect={false}
                                    onChangeText={text => this.setState({ username : text })}
                                    onSubmitEditing={() => this.refs.textInput2.focus()}/>  

                                
                        </Animated.View>
                    </Animated.View>                        
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => this.increaseHeightOfSignUp()}>

                        <Animated.Text style={{
                        opacity: headerTextOpacity,
                        fontSize:17,
                        paddingHorizontal: 10,
                        paddingTop: 18,
                        color: '#c7b3d6',
                        paddingLeft: 35

                        }}>New User? Sign Up</Animated.Text>

                </TouchableOpacity>


                <TouchableOpacity
                    onPress = {() => this.refs.textInput2.focus()}>
                    
                    <Animated.View style={{
                        marginTop: marginTop, //animated
                        paddingHorizontal: 25,
                        flexDirection: 'row',
                        }}>
                        <Animated.View 
                                pointerEvents="none"
                                style={{flexDirection: "row", 
                                flex: 1,
                                opacity: passwordInputOpacity,
                                borderBottomWidth: this.borderBottomWidth //animated
                                }}>

                                <Text style={{
                                    fontSize:20,
                                    paddingHorizontal: 10,
                                    paddingTop: 5
                                    }}>Password
                                </Text>

                                <TextInput 
                                    ref="textInput2"
                                    style={{flex:1, fontSize:20,}}
                                    placeholder={this.state.placeholderTextPassword}
                                    secureTextEntry
                                    onChangeText={text => this.setState({ password: text})}
                                    underlineColorAndroid="transparent"/>
                            
                        </Animated.View>
                    </Animated.View>
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
                                
                            <Button color='#c7b3d6' 
                                title="or connect using a social account" 
                                onPress={async () => {
                                    this.signInWithGoogleAsync().then(user => {
                                        console.log(user)
                                      })}} />

                    </View>
                </View>

            </Animatable.View>
            </ImageBackground>
        </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
    return {}
}

const actionCreator = (action, payload = null) => ({ action, payload })

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        authSuccess: (token) => {
            AsyncStorage.multiSet([['token', token], ['authenticated', '1']])
            dispatch(actionCreator('LOGIN_SUCCESS'))
        }
    }
}

export const authStateReducer = (state={app_stated:false, authenticated:false},{type,payload})=>{
    switch(type){
        case 'LOGIN_SUCCESS':
        return {...state,authenticated:true}
        case 'LOGGOUT':
        return {...state,authenticated:false}
        case 'APP_LOADED':
        return {...state,app_started:true}
        default:
        return state
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
        fontFamily: 'font',
        fontWeight: 'bold',
        fontSize: 38,
        color: '#000000', 
        justifyContent: 'center',
        marginTop: 20,

    }
  });