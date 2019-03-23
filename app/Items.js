import React, { Component } from 'react';
import { View, ActivityIndicator, Text, FlatList, Alert } from 'react-native';

const ItemComponent = ({name, mfd, uid}) => {
    return(
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row',paddingTop: 20}}>
            <Text style={{ flex: 1, alignSelf: 'stretch' }}>{uid}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch' }}>{name}</Text>
            <Text style={{ flex: 1, alignSelf: 'stretch' }}>{mfd}</Text>
        </View>
    )
}

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
                <View style = {{flexDirection:'column', paddingTop:10, paddingLeft: 32}}>
                    <View style={{ alignSelf: 'stretch', flexDirection: 'row'}}>
                        <Text style={{fontSize:20, fontWeight: 'bold', flex: 1, alignSelf: 'stretch'}}>UID</Text>
                        <Text style={{fontSize:20, fontWeight: 'bold', flex: 1, alignSelf: 'stretch'}}>Name</Text>
                        <Text style={{fontSize:20, fontWeight: 'bold', flex: 1, alignSelf: 'stretch'}}>MFD</Text>
                    </View>
                    <FlatList 
                    data={itemList}
                    renderItem={({item}) => 
                        <ItemComponent
                            name = {item.name}
                            uid = {item.uid}
                            mfd = {item.mfd}
                        />}
                    keyExtractor={(item,index) => index.toString()}
                    />
                </View>
            );
        }
    }
}