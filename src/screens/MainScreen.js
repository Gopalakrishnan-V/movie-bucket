import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import HomeTab from "../components/HomeTab";
import TrendingTab from "../components/TrendingTab";
import SearchTab from "../components/SearchTab";

const BottomTabNavigator = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeTab
    },
    TrendingTab: {
      screen: TrendingTab
    },
    SearchTab: {
      screen: SearchTab
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#007aff",
      inactiveTintColor: "#7d7b7b"
    },
    initialRouteName: "HomeTab"
  }
);

export default BottomTabNavigator;
