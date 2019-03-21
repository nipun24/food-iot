import React, { Component } from 'react';
import Scanner from './Scanner';
import Home from './Home';
import Items from './Items';
import ManualAdd from './ManualAdd';
import { createStackNavigator, createAppContainer } from 'react-navigation';


const RootStack = createStackNavigator(
  {
    Home: Home,
    Scanner: Scanner,
    Items: Items,
    Manual: ManualAdd
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