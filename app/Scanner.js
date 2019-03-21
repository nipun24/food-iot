import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class Scanner extends Component {
  state = {
    isLoading: false,
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
    this.setState({isLoading: true});
    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(res => res.json())
    // .then(json => console.log(json))
    fetch('http://10.2.80.123:3000/getName', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          barcode: data.data
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      if(json === false){
        this.setState({isLoading: false}); 
        this.props.navigation.navigate('Manual',{barcode: data.data})      
      }
      else{
        this.setState({isLoading: false})
        this.props.navigation.navigate('Manual',{barcode: data.data,name: json.name}); 
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