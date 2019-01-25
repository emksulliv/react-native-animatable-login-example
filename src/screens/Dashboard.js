import React, { Component } from 'react'
import { FlatList, View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'

class Dashboard extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: false
        };
    }

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        //fetch apis
        const allTidePredStationsResponse = await fetch("https://tidesandcurrents.noaa.gov/mdapi/v1.0/webapi/stations.json?type=tidepredictions");
        const waterLevelNowResponse = await fetch("https://tidesandcurrents.noaa.gov/api/datagetter?&station=8575512&date=latest&units=english&datum=MLLW&product=water_level&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=");
        const airTempNowResponse = await fetch("https://tidesandcurrents.noaa.gov/api/datagetter?&station=8575512&date=latest&units=english&datum=MLLW&product=air_temperature&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=");
        
        //convert to json
        const json = await allTidePredStationsResponse.json();
        const jsonLevel = await responseLevelNow.json();
        const airTempJson = await airTempNowResponse.json();

        //weed out the other state water level stations
        let filteredByMaryland = json.stations.filter(item => item.state === 'MD')
        this.setState({ data: filteredByMaryland, refreshing: false });

        this.arrayholder = json.stations;
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
                    
                    marginBottom: 30
                }}
            />
        );
    };


    renderHeader = () => {
        return (
            <SafeAreaView style={{ flex: 1}}>
                <SearchBar
                    placeholder="Type Here..."
                    lightTheme
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


    render() {
        return (
            //new container here?
            <View style={{ flex: 1 }}>
                {/* <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}> */}
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <ListItem
                                title={item.name}
                                containerStyle={{ borderBottomWidth: 0, marginTop: 30 }}
                            />
                            // <Text>
                            //     {item.name}
                            // </Text>
                        )}
                        keyExtractor={item => item.name}
                        ItemSeparatorComponent={this.renderSeparator}
                        ListHeaderComponent={this.renderHeader}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                {/* </List> */}
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