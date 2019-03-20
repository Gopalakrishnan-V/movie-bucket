import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon, Container, Content } from "native-base";
import SectionItem from "./SectionItem";
import sectionData from "../constants/SectionData";
import * as APIS from "../constants/APIS";
import { API_KEY } from "../constants/Constants";
import axios from "axios";

export default class HomeTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-home" style={{ color: tintColor }} />
    ),
    tabBarLabel: "Home"
  };

  componentDidMount = async () => {
    try {
      const feedResponse = await axios({
        method: "get",
        url: APIS.FEED
      });
      const data = feedResponse.data;
      if (data.results) {
        const results = data.results.map(result => {
          return {
            ...result,
            movies: result.movies.slice(0, 10).map((movie, movieIndex) => {
              return { movie, key: movieIndex + "" };
            })
          };
        });
        this.setState({ results });
      }
    } catch (error) {
      this.setState({ results: [] });
      console.log("error", error.response.data);
    }
  };

  render() {
    console.log("props", this.props);
    const { navigation } = this.props;
    const { results } = this.state;

    return (
      <Container>
        <Content>
          <View style={styles.container}>
            {results.map((item, index) => {
              return (
                <SectionItem
                  key={index}
                  index={index}
                  sectionData={item}
                  navigation={navigation}
                />
              );
            })}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
