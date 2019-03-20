import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Container, Content, Icon } from "native-base";
import axios from "axios";
import * as APIS from "../constants/APIS";
import { API_KEY } from "../constants/Constants";
import SectionItem from "../components/SectionItem";
// import sectionData from "../constants/SectionData";
// import slowlog from "react-native-slowlog";

const { width, height } = Dimensions.get("window");

export default class MovieScreen extends Component {
  constructor(props) {
    super(props);

    slowlog(this, /.*/);

    this.params = props.navigation.state.params;

    const {
      id,
      original_title,
      release_date,
      poster_path,
      backdrop_path,
      overview,
      vote_average,
      vote_count
    } = this.params.movie;
    const release_year = release_date.split("-")[0];
    const poster = `https://image.tmdb.org/t/p/w300/${poster_path}`;
    const backdrop = `https://image.tmdb.org/t/p/w300/${backdrop_path}`;

    this.state = {
      details: {
        id,
        poster,
        backdrop,
        original_title,
        release_year,
        runtime: "",
        genres: "-",
        overview,
        vote_average,
        vote_count,
        box_office_collection: "-"
      },
      cast: [],
      similarMovies: [],
      overviewMaxLines: 3
    };
  }

  static navigationOptions = {
    title: ""
  };

  componentDidMount = async () => {
    await this.fetchMovieDetails();
    await this.fetchCredits();
    await this.fetchSimilarMovies();
  };

  fetchMovieDetails = async () => {
    const id = this.state.details.id;
    try {
      const movieDetailsResponse = await axios({
        method: "get",
        url: `${APIS.MOVIE}/${id}`,
        params: {
          api_key: API_KEY,
          language: "en-US"
        }
      });
      const data = movieDetailsResponse.data;
      if (data) {
        const { overview, budget, revenue, genres, runtime } = data;
        const details = {
          ...this.state.details,
          overview,
          box_office_collection: revenue
            ? Math.round((budget + revenue) / 1000000) + "M"
            : "-",
          runtime: `${Math.round(runtime / 60)} hrs ${Math.round(
            runtime % 60
          )} mins`,
          genres: genres.map(genre => genre.name).join(", ")
        };
        this.setState({ details });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchCredits = async () => {
    const id = this.state.details.id;
    try {
      const creditsDetailsResponse = await axios({
        method: "get",
        url: `${APIS.MOVIE}/${id}/credits`,
        params: {
          api_key: API_KEY,
          language: "en-US"
        }
      });
      const data = creditsDetailsResponse.data;
      if (data) {
        const { cast, crew } = data;
        this.setState({ cast: cast.slice(0, 10) });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  fetchSimilarMovies = async () => {
    const id = this.state.details.id;
    try {
      const similarMoviesResponse = await axios({
        method: "get",
        url: `${APIS.MOVIE}/${id}/similar`,
        params: {
          api_key: API_KEY,
          language: "en-US"
        }
      });
      const data = similarMoviesResponse.data;
      if (data) {
        const results = data.results.map((result, resultIndex) => {
          return { movie: result, key: resultIndex + "" };
        });
        this.setState({ similarMovies: results.slice(0, 10) });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    const { details, cast, similarMovies, overviewMaxLines } = this.state;
    const {
      poster,
      backdrop,
      original_title,
      release_year,
      runtime,
      genres,
      overview,
      vote_average,
      vote_count,
      box_office_collection
    } = details;

    return (
      <Container>
        <Content>
          <View>
            <Image
              source={{
                uri: backdrop
              }}
              style={{
                height: width / 1.8,
                alignSelf: "stretch"
              }}
            />
            <Text
              style={{
                marginTop: 10,
                marginStart: 10,
                marginEnd: 10,
                fontSize: 18,
                fontWeight: "700"
              }}
            >
              {original_title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 6,
                marginStart: 10,
                marginEnd: 10,
                overflow: "hidden"
              }}
            >
              <Text>{release_year}</Text>
              <Text> {"\u2022"} </Text>
              <Text>{runtime}</Text>
            </View>
            <Text style={{ marginTop: 6, marginStart: 10, marginEnd: 10 }}>
              {genres}
            </Text>
            <Text
              numberOfLines={overviewMaxLines}
              onPress={() => {
                if (overviewMaxLines === 3) {
                  this.setState({ overviewMaxLines: 1000 });
                } else {
                  this.setState({ overviewMaxLines: 3 });
                }
              }}
              style={{ marginTop: 15, marginStart: 10, marginEnd: 10 }}
            >
              {overview}
            </Text>
            <View
              style={{ flexDirection: "row", margin: 10, marginBottom: 10 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="md-star" style={{ color: "gold", fontSize: 30 }} />
                <Text style={{ marginTop: 2, fontWeight: "600", fontSize: 18 }}>
                  {`${vote_average}/10`}
                </Text>
                <Text
                  style={{ marginTop: 2, fontSize: 12 }}
                >{`(${vote_count})`}</Text>
              </View>

              <View
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: "#e5e5e5",
                  marginTop: 10,
                  marginBottom: 10
                }}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-archive"
                  style={{ color: "#4175b5", fontSize: 28, marginTop: 6 }}
                />
                <Text style={{ marginTop: 2, fontWeight: "600", fontSize: 18 }}>
                  {box_office_collection}
                </Text>
                <Text style={{ marginTop: 2, fontSize: 12 }}>
                  {"Box Office"}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 2, marginBottom: 15 }}>
              <Text
                style={{
                  marginStart: 7,
                  marginTop: 25,
                  marginBottom: 15,
                  fontSize: 18,
                  fontWeight: "700",
                  display: cast.length ? "flex" : "none"
                }}
              >
                {"Top-Billed Cast"}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  paddingStart: 7,
                  paddingEnd: 7
                }}
                style={{
                  marginBottom: 20,
                  display: cast.length ? "flex" : "none"
                }}
              >
                {cast.map((castItem, castIndex) => {
                  return (
                    <TouchableOpacity
                      key={castIndex}
                      style={[
                        { justifyContent: "center" },
                        { alignItems: "center" },
                        { width: width / 3 },
                        { margin: 2 }
                      ]}
                      onPress={() => {
                        const { id, name, profile_path } = castItem;
                        this.props.navigation.push("PersonScreen", {
                          person: { id, name, profile_path }
                        });
                      }}
                    >
                      <Image
                        source={{
                          uri: `https://image.tmdb.org/t/p/w154/${
                            castItem.profile_path
                          }`
                        }}
                        style={{
                          flex: 1,
                          height: undefined,
                          width: width / 3,
                          height: width / 2,
                          borderRadius: 5,
                          resizeMode: "contain"
                        }}
                      />
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 14,
                          color: "black",
                          fontWeight: "500",
                          overflow: "hidden",
                          marginTop: 3
                        }}
                      >
                        {castItem.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 12,
                          fontWeight: "300",
                          overflow: "hidden"
                        }}
                      >
                        {castItem.character}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              {similarMovies.length ? (
                <SectionItem
                  sectionData={{
                    title: "Similar Movies",
                    movies: similarMovies
                  }}
                  navigation={this.props.navigation}
                />
              ) : null}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
