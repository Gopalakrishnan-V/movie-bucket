import React, { Component } from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import { Icon, Container, Content, Item, Input, Button } from "native-base";
import { SearchBar } from "react-native-elements";
import SearchItem from "./SearchItem";
import * as APIS from "../constants/APIS";
import { API_KEY } from "../constants/Constants";
import axios from "axios";

export default class SearchTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      results: []
    };
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="ios-search" style={{ color: tintColor }} />
    ),
    tabBarLabel: "Search"
  };

  search = async query => {
    try {
      const searchResponse = await axios({
        method: "get",
        url: APIS.SEARCH_MULTI,
        params: {
          api_key: API_KEY,
          query
        }
      });
      const data = searchResponse.data;
      if (data.results) {
        const results = data.results;
        this.setState({
          results: results.filter(item => true)
        });
      }
    } catch (error) {
      this.setState({ results: [] });
      console.log("error", error.response.data);
    }
  };

  render() {
    const { searchQuery, results } = this.state;

    return (
      <Container style={styles.container}>
        <Content>
          <SearchBar
            placeholder="Search movies, tv shows, people"
            onChangeText={value => {
              console.log("reaching here");
              this.setState({ searchQuery: value });
              this.search(value.trim().toLowerCase());
            }}
            onClear={() => {
              console.log("clear clicked");
            }}
            value={searchQuery}
            containerStyle={{
              backgroundColor: "white",
              borderBottomColor: "transparent",
              borderTopColor: "transparent"
            }}
            inputContainerStyle={{ backgroundColor: "#e5e5e5" }}
          />
          <View>
            {results.map((result, resultIndex) => {
              return (
                <SearchItem
                  key={resultIndex}
                  data={result}
                  index={resultIndex}
                  navigation={this.props.navigation}
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
