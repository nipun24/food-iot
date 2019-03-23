import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, ToastAndroid } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class ScannerDelete extends Component {
  state = {
    isLoading: false,
    hasCameraPermission: null
  };

  static navigationOptions = {
    title: 'Remove Item',
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
    fetch('http://10.2.80.123:3000/delete', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          item: JSON.parse(data.data)
      })
    })
    .then(res => {
        if(res.status === 400){
            Alert.alert('Can not remove item! Try again');
            this.props.navigation.navigate('Home');
        }
        else if(res.status === 200 && res._bodyText === "false") {
            Alert.alert('No item found. Add item first');
            this.props.navigation.navigate('Home');
        }
        else {
            ToastAndroid.show('Item removed', ToastAndroid.SHORT);
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