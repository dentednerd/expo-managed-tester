import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from './Splash';
import MainApp from './MainApp'

const AppNavigator = createStackNavigator(
  {
		Splash: Splash,
		Main: MainApp
	},
	{
		initialRouteName: 'Splash'
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
