import React, { Component } from 'react';
import { View, ActivityIndicator, Text, FlatList } from 'react-native';

export default class Items extends Component {
    state = {
        itemList: null,
        isLoading: true
    }

    static navigationOptions = {
        title: 'Items',
      };

    componentDidMount = () => {
        fetch('http://10.2.80.123:3000/list')
        .then(response => response.json())
        .then(json => this.setState({itemList: json}))
        .then(() => {this.setState({isLoading: false})})
    }

    render(){
        const { itemList } = this.state;
        if( this.state.isLoading === true){
            return(
                <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <ActivityIndicator size="large" style={{padding: 48}}/>
                </View>
            );
        }
        else {
            return(
                <View>
                    <FlatList 
                        data={itemList}
                        renderItem={({item}) => <Text style={{margin: 24}}>{item.name}</Text>}
                        keyExtractor={(item,index) => index.toString()}
                    />
                </View>
            );
        }
    }
}