import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import MainScreen from "./src/screens/MainScreen";
import MovieScreen from "./src/screens/MovieScreen";
import TvScreen from "./src/screens/TvScreen";
import PersonScreen from "./src/screens/PersonScreen";

const AppStackNavigator = createStackNavigator(
  {
    MainScreen,
    MovieScreen,
    TvScreen,
    PersonScreen
  },
  {
    defaultNavigationOptions: {
      title: "Movie Bucket"
    },
    initialRouteName: "MainScreen"
  }
);

const AppContainer = createAppContainer(AppStackNavigator);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer />;
  }
}

export default App;
