import React, { Component } from 'react';
import Scanner from './Scanner';
import Home from './Home';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ScannerDelete from './ScannerDelete';
import ItemComponent from './ItemComponent.js';
import Login from './Login';
import { SplashScreen } from 'expo';


const RootStack = createStackNavigator(
  {
    Home: Home,
    Scanner: Scanner,
    ScannerDelete: ScannerDelete,
    ItemComponent: ItemComponent,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  state = {
    isAppReady: false,
    isSplashReady: false,
    isLoggedIn: true
  }

  componentDidUpdate() {
    SplashScreen.hide();
  }

  login = () => {
    console.log('login')
    // this.setState({isLoggedIn: true})
  }

  render(){
    if(!this.state.isLoggedIn){
      return(
        <Login login={this.login}/>
      )
    }
    else {
      return(
        <AppContainer
          login = {this.login}
        />
      );
    }
  }

}