import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {BACKEND_URL} from './Constants.js';

const styles = StyleSheet.create({
    fab1: { 
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 0, 
        bottom: 64,
        elevation: 8
        },
    fab2: { 
        position: 'absolute', 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 0, 
        bottom: 0,
        elevation: 8
        }
})

export default class Home extends Component {
    state = {
        token: null,
        itemList: null,
        isLoading: true
    }

    static navigationOptions = {
        title: 'Home',
    };

    getItems = () => {
        fetch(BACKEND_URL+'/list')
        .then(response => response.json())
        .then(json => {
            if(json === false)
                this.setState({isLoading: true});
            else
                this.setState({itemList: json, isLoading: false});
        })
    }

    sendToken = async () => {
        fetch(BACKEND_URL + '/token', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: this.state.token
            })
          })
    }

    componentDidMount() {
        this.requestNotificationPermission();   
        this.getItems();     
        // this.sendToken();
    }

    componentDidUpdate() {
        this.getItems(); 
        // this.sendToken();       
    }

    requestNotificationPermission = async () => {
        const res = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if(res.status === "granted"){
            let token = await Notifications.getExpoPushTokenAsync()
            this.setState({token});
        }
        await Notifications.createChannelAndroidAsync('default',{
            name: 'default',
            sound: true,
            priority: 'max'
        });
        
        this.sendToken();
    };

    render(){
        this.getItems;
        const { itemList } = this.state;
        if( this.state.isLoading === true){
            return(
                <View style = {{flex: 1, margin: 24, alignItems: 'center', justifyContent: 'center' }} >
                    <Text>No Items Found</Text>
                    <TouchableOpacity style={styles.fab1} onPress={() => this.props.navigation.navigate('Scanner')}>
                        <Ionicons  
                            name="ios-add-circle" 
                            size={64} 
                            color="#8bc34a"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab2} onPress={() => this.props.navigation.navigate('ScannerDelete')}>
                        <Ionicons  
                            name="ios-close-circle" 
                            size={64} 
                            color="#f44336"
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return(
                <View style = {{flex:1, margin: 24, flexDirection:'column'}}>
                    <FlatList 
                    data={itemList}
                    renderItem={({item}) => 
                        <Text 
                            style = {{
                                fontSize: 18,  
                                marginBottom: 20,
                                paddingBottom: 20,
                                borderBottomColor: 'black',
                                borderBottomWidth: 0.5
                                }} 
                            onPress={() => this.props.navigation.navigate('ItemComponent',{item})}
                        >
                            {item.name}
                        </Text>
                        }
                    keyExtractor={(item,index) => index.toString()}
                    />
                    <TouchableOpacity style={styles.fab1} onPress={() => this.props.navigation.navigate('Scanner')}>
                        <Ionicons  
                            name="ios-add-circle" 
                            size={64} 
                            color="#8bc34a"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fab2} onPress={() => this.props.navigation.navigate('ScannerDelete')}>
                        <Ionicons  
                            name="ios-close-circle" 
                            size={64} 
                            color="#f44336"
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    }
}