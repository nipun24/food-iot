import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class Scanner extends Component {
  state = {
    hasCameraPermission: null
  };

  static navigationOptions = {
    title: 'Scan Item',
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
    this.props.navigation.navigate('Manual',{res: data.data});
  };

  render() {
    if(this.state.hasCameraPermission === true){
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