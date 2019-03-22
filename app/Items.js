import React, { Component } from 'react';
import { View, ActivityIndicator, Text, FlatList, Alert } from 'react-native';

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
        .then(json => {
            if(json === false)
                Alert.alert(
                    'No items found',
                    'Add or Scan items to add',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate('Home')}
                    ],
                    {cancelable: false}
                )
            else
                this.setState({itemList: json})
        })
        .then(() => this.setState({isLoading: false}))
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
                        renderItem={({item}) => <Text>{item.name}</Text>}
                        keyExtractor={(item,index) => index.toString()}
                    />
                </View>
            );
        }
    }
}