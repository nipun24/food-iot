import React, { Component } from 'react';
import Scanner from './Scanner';
import Home from './Home';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ScannerDelete from './ScannerDelete';
import ItemComponent from './ItemComponent.js';


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
  render(){
    return(
      <AppContainer/>
    );
  }

}