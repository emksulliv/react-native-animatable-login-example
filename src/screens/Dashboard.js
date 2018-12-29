import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Dashboard extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View>
                <Text style={styles.title} >Dashboard</Text>
            </View>
        )
    }
}

export default Dashboard

const styles = StyleSheet.create({
    title: {
        paddingTop: 20,
        fontFamily: 'font',
        color: '#000000', 
        justifyContent: 'center',
        marginTop: 30,
    }
  });