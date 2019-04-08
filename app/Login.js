import React , {Component} from 'react';
import { View, Image, Button, TextInput, StyleSheet, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native';
import {Constants} from 'expo';
import { Permissions, Notifications, SplashScreen } from 'expo';
import {BACKEND_URL} from './Constants.js';

const styles = StyleSheet.create({
    container: {
        flex:4,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ffffff'
    },
    input: {
        borderColor: '#000000',
        borderWidth: 0.5,
        height: 32,
        marginRight: 32,
        marginLeft: 32,
        marginTop: 8,
        marginBottom: 8
    }
})

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            token: '',
            userName: '',
            pwd: '',
            pwd2: '',
            loading: false
        }
    }

    componentDidMount() {
        this.requestNotificationPermission();  
    }

    componentDidUpdate() {
        SplashScreen.hide();
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
    };

    login = () => {
        this.setState({loading: true})
        const {userName, pwd, token, pwd2} = this.state;
        if(userName.trim() === "" && pwd.trim() === ""){
            ToastAndroid.show('Please enter username/password', ToastAndroid.SHORT)
            this.setState({loading: false})
        }
        else if(pwd !== pwd2){
            ToastAndroid.show('Passwords do not match!', ToastAndroid.SHORT)
            this.setState({loading: false})
        }
        else {
            fetch(BACKEND_URL + '/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userName: this.state.userName.trim(),
                    pwd: this.state.pwd,
                    token: this.state.token
                })
              })
              .then(res => {
                  if(res.status === 200 && res._bodyText === 'true'){
                    ToastAndroid.show('You are logged in!', ToastAndroid.SHORT)
                    this.setState({loading: false})
                    this.props.login()
                  }
                  else {
                    ToastAndroid.show('Error Logging in!', ToastAndroid.SHORT)
                    this.setState({loading: false})
                  }
              })
        }
    }

    render(){
        if(this.state.loading){
            return(
                <View style = {{flex: 1, justifyContent:'center'}} >
                    <ActivityIndicator size="large" style={{padding: 48}}/>
                </View>
            );
        }
        else {
            return(
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={{flex:1}}></View>
                    <View style={{flex:2}} > 
                        <View style={{alignItems: 'center'}}>
                            <Image 
                                style={{height: 200, width:200}}
                                source={require('./assets/icon.png')} />
                        </View>
                        <TextInput 
                            style={styles.input}
                            placeholder="  Enter User Name"
                            onChangeText={(text) => this.setState({userName: text})}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="  Enter Password"
                            secureTextEntry = {true}
                            onChangeText={(text) => this.setState({pwd: text})}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="  Re-Enter Password"
                            secureTextEntry = {true}
                            onChangeText={(text) => this.setState({pwd2: text})}
                        />
                        <View style={{marginLeft:32, marginRight: 32, marginTop: 20}}>
                            <Button 
                                title = 'login'
                                onPress = {this.login}
                            />
                        </View>
                    </View>
                    <View style={{flex:1}}></View>
                </KeyboardAvoidingView>
            );
        }
    }

}