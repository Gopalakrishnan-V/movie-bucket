import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Container, Content } from "native-base";
import TrendingItem from "./TrendingItem";
import axios from "axios";
import * as APIS from "../constants/APIS";
import { API_KEY } from "../constants/Constants";

export default class TrendingTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-trending-up" style={{ color: tintColor }} />
    ),
    tabBarLabel: "Trending"
  };

  componentDidMount = async () => {
    try {
      const trendingResponse = await axios({
        method: "get",
        url: APIS.TRENDING,
        params: {
          api_key: API_KEY,
          language: "en-US"
        }
      });
      const data = trendingResponse.data;
      if (data.results) {
        const results = data.results;
        this.setState({ results });
      }
    } catch (error) {
      console.log("ex", error.response.data);
    }
  };

  render() {
    const { results } = this.state;
    return (
      <Container>
        <Content>
          <View style={styles.container}>
            {results.map((result, resultIndex) => (
              <TrendingItem
                key={resultIndex}
                data={result}
                index={resultIndex}
                navigation={this.props.navigation}
              />
            ))}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
