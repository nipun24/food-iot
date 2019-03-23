import React, { Component } from 'react';
import Scanner from './Scanner';
import Home from './Home';
import Items from './Items';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ScannerDelete from './ScannerDelete';


const RootStack = createStackNavigator(
  {
    Home: Home,
    Scanner: Scanner,
    Items: Items,
    ScannerDelete: ScannerDelete
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render(){
    return(
      <AppContainer/>
    );
  }

}