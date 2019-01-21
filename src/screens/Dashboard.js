import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'

class Dashboard extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        data: []
    };

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations.json?type=currents");
        const json = await response.json();
        this.setState({ data: json.stations });
    };

    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '14%',
              fontSize: 40,
              marginTop:30,
              marginBottom: 30
            }}
          />
        );
      };

    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x, i) => i}
                    renderItem={({ item }) => 
                        <Text>
                            {item.name}
                        </Text>}
                    ItemSeparatorComponent={this.renderSeparator} 
                    ListHeaderComponent={this.renderHeader}
                />
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
        alignItems: "center",
        marginTop: 30,
    },
    list: {
        marginTop: 30
    }
  });