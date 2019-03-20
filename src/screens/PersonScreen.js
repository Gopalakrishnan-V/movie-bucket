import React, { Component } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Container, Content } from "native-base";
import SectionItem from "../components/SectionItem";
import sectionData from "../constants/SectionData";
import axios from "axios";
import * as APIS from "../constants/APIS";
import { API_KEY } from "../constants/Constants";

const { width, height } = Dimensions.get("window");

export default class PersonScreen extends Component {
  constructor(props) {
    super(props);
    this.params = props.navigation.state.params;
    const { id, name, profile_path } = this.params.person;
    const profile = `https://image.tmdb.org/t/p/w185/${profile_path}`;

    this.state = {
      details: {
        id,
        profile,
        name,
        birthday: "",
        place_of_birth: "",
        biography: ""
      },
      knownFor: [],
      bioNumLines: 4
    };
  }

  static navigationOptions = {
    title: ""
  };

  componentDidMount = async () => {
    await this.fetchPersonDetails();
    await this.fetchMovieCredits();
  };

  fetchPersonDetails = async () => {
    const id = this.state.details.id;
    try {
      const personDetailsResponse = await axios({
        method: "get",
        url: `${APIS.PERSON}/${id}`,
        params: {
          api_key: API_KEY,
          language: "en-US"
        }
      });
      const data = personDetailsResponse.data;
      if (data) {
        const { birthday, biography, place_of_birth } = data;
        const details = {
          ...this.state.details,
          birthday,
          biography,
          place_of_birth
        };
        this.setState({ details });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchMovieCredits = async () => {
    const id = this.state.details.id;
    try {
      const movieCreditsResponse = await axios({
        method: "get",
        url: `${APIS.PERSON}/${id}/movie_credits`,
        params: {
          api_key: API_KEY,
          language: "en-US"
        }
      });
      const data = movieCreditsResponse.data;
      if (data) {
        let { cast } = data;
        cast = cast.map((castItem, castIndex) => {
          return { movie: castItem, key: castIndex + "" };
        });
        this.setState({ knownFor: cast });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { details, knownFor, bioNumLines } = this.state;
    const { profile, name, birthday, place_of_birth, biography } = details;

    return (
      <Container>
        <Content>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", margin: 5 }}>
              <Image
                source={{
                  uri: profile
                }}
                style={{
                  flex: 1.5,
                  borderRadius: 5,
                  resizeMode: "contain",
                  height: width / 1.5
                }}
              />
              <View
                style={{
                  flex: 2,
                  marginStart: 6,
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700"
                  }}
                >
                  {name}
                </Text>
                <Text style={{ marginTop: 5 }}>{birthday}</Text>
                <Text style={{ marginTop: 5 }}>{place_of_birth}</Text>
              </View>
            </View>
            <Text
              onPress={() => {
                if (bioNumLines === 4) {
                  this.setState({ bioNumLines: 1000 });
                } else {
                  this.setState({ bioNumLines: 4 });
                }
              }}
              numberOfLines={bioNumLines}
              style={{
                marginTop: 5,
                marginBottom: 20,
                marginStart: 10,
                marginEnd: 10
              }}
            >
              {biography}
            </Text>
            <SectionItem
              sectionData={{ title: "Known For", movies: knownFor }}
              navigation={this.props.navigation}
              style={{ display: knownFor.length ? "flex" : "none" }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
