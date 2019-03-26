import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import {BACKEND_URL} from './Constants.js';

export default class Scanner extends Component {
  state = {
    isLoading: false,
    hasCameraPermission: null
  };

  static navigationOptions = {
    title: 'Add Item',
  };

  componentDidMount() {
    this.requestCameraPermission();
  }

  requestCameraPermission = () => {
    Permissions.askAsync(Permissions.CAMERA)
    .then(res => {
      if(res.status === "granted"){
        this.setState({hasCameraPermission: true});
      }
    })
    .catch(err => {
      console.log(err);
    })
  };

  handleBarCodeRead = data => {
    this.setState({isLoading: true});
    fetch(BACKEND_URL + '/add', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          item: JSON.parse(data.data)
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if(json){
        ToastAndroid.show('Item Added Successfully', ToastAndroid.SHORT);
        this.props.navigation.navigate('Home');
      }
      else {
        Alert.alert('Can not add item! Try Again');
        this.props.navigation.navigate('Home');
      }
    })
  };

  render() {
    if(this.state.isLoading){
      return(
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <ActivityIndicator size="large" style={{padding: 48}}/>
        </View>
    );
    }
    else if(this.state.hasCameraPermission === true){
      return(
        <View style = {{flex: 1}}>
          <BarCodeScanner
            onBarCodeScanned = {this.handleBarCodeRead}
            style = {{flex: 1}}
          />
        </View>
      );
    }
    else if(this.state.hasCameraPermission === null) {
      return(
        <View style = {{flex: 1, alignItems: 'center', justifyContent: 'center' }} >
          <Text>
            Waiting for camera permission
          </Text>
          <ActivityIndicator size="large" style={{padding: 48}}/>
          <Button 
            title="Camera Permission"
            onPress={() => this.requestCameraPermission()}
          />
        </View>
      );
    }
  }
}