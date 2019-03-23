import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Permissions, Notifications } from 'expo';

export default class Home extends Component {
    state = {
        token: null
    }

    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount() {
        this.requestNotificationPermission();
    }

    requestNotificationPermission = async () => {
        const res = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if(res.status === "granted"){
            let token = await Notifications.getExpoPushTokenAsync()
            this.setState({token});
            console.log(token);
        }
        await Notifications.createChannelAndroidAsync('default',{
            name: 'default',
            sound: true,
            priority: 'max'
        });
    };

    render(){
        return(
            <View style={{margin: 24}} > 
                <Button
                    title="add item"
                    onPress={() => this.props.navigation.navigate('Scanner')}
                />
                <View style={{margin: 12}} ></View>
                <Button
                    title="remove item"
                    onPress={() => this.props.navigation.navigate('ScannerDelete')}
                />
                <View style={{margin: 12}} ></View>
                <Button
                    title="view item"
                    onPress={() => this.props.navigation.navigate('Items')}
                />
            </View>
        );
    }
}