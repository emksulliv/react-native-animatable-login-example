import React, { Component } from 'react'
import { FlatList, View, Text, 
    StyleSheet, SafeAreaView, StatusBar, 
    RefreshControl, TouchableOpacity } from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import {Icon} from 'native-base';

class Dashboard extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: false, 
            //waterLevelData: [],
            //airTempData: [],
        };
    }

    componentWillMount() {
        this.fetchData();
  // [8575512, 1611400, 1612340, 1612480].map(id => this.getDetails(id))
    //    this.getDetails();
    }

    getDetails = async (id, index)=> {
        // console.log(id, index)
        // console.log(this.waterLevelUrlById(id))
        // console.log(this.airTempUrlById(id))
        let wl = await(await fetch(this.waterLevelUrlById(id))).json()
        let at = await(await fetch(this.airTempUrlById(id))).json()
        console.log(wl, at)
        let data = this.state.data;
        data[index].waterLevel = wl.data[0].v
        data[index].airTemp = at.data[0].v
        this.setState({data});
    }

    waterLevelUrlById = (id) => `https://tidesandcurrents.noaa.gov/api/datagetter?&station=${id}&date=latest&units=english&datum=MLLW&product=water_level&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=`
    airTempUrlById = (id) => `https://tidesandcurrents.noaa.gov/api/datagetter?&station=${id}&date=latest&units=english&datum=MLLW&product=air_temperature&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=`

    fetchData = async () => {
        //fetch api for ALL water level stations
        const allTidePredStationsResponse = await fetch("https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations.json?type=1minute");
        //convert to json
        const json = await allTidePredStationsResponse.json();
        //weed out the other state water level stations
        let filteredByMaryland = json.stations.filter(item => item.state === 'MD')

        //array holder (for search function)
        this.arrayholder = json.stations;
        
        // //fetch  api's for everything else
        // //TODO change ID to the id of json items (item.id)
        // const waterLevelNowResponse = await fetch("https://tidesandcurrents.noaa.gov/api/datagetter?&station="+ ID + "&date=latest&units=english&datum=MLLW&product=water_level&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=");
        // const airTempNowResponse = await fetch("https://tidesandcurrents.noaa.gov/api/datagetter?&station="+ ID + "&date=latest&units=english&datum=MLLW&product=air_temperature&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=");
        // //convert THOSE to jsons
        // const waterLevelJson = await waterLevelNowResponse.json();
        // const airTempJson = await airTempNowResponse.json();
      //  filteredByMaryland = Promise.all(filteredByMaryland.map((item) => this.getData(item)));

        this.setState({ data: filteredByMaryland, 
            //waterLevelData: waterLevelJson.data, airTempData: airTempJson 
            refreshing: false });
    };


    handleRefresh = () => {
        this.setState({
            refreshing: true,
        },
            () => {
                this.fetchData();
            }
        );
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                    fontSize: 40,
                }}
            />
        );
    };


    renderHeader = () => {
        return (
            <SafeAreaView style={{ 
                            flex: 1, 
                            backgroundColor: '#373d47'
                            }}>
                <SearchBar
                    placeholder="Type Here..."
                    darkTheme
                    round
                    onChangeText={text => this.searchFilterFunction(text)}
                    autoCorrect={false}
                />
            </SafeAreaView>
        );
    };

    searchFilterFunction = text => {
        console.log(this.arrayholder);
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };


    listItem = (item, index) => {
        console.log(item.id)
        const data = this.getDetails(item.id, index);
        return (
            <ListItem
            title={item.name}
            subtitle={`Water Level: ${item.waterLevel} | Air Temp: ${item.airTemp}`}
            containerStyle={{ borderBottomWidth: 0, marginTop: 30, marginBottom: 30}}
            />
        )
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content"/> 
                {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => this.listItem(item, index)}
                        keyExtractor={item => item.name}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        // refreshing={this.state.refreshing}
                        // onRefresh={this.handleRefresh}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.handleRefresh}
                                backgroundColor="#4d5460"
                                tintColor="#e3e9f2"
                            />
                        }      
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