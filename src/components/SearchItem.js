import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;

    let poster = data.poster_path
      ? `https://image.tmdb.org/t/p/w185/${data.poster_path}`
      : "https://eapp.org/wp-content/uploads/2018/05/poster_placeholder.jpg";
    let title = "";
    let additionalText1 = "";

    switch (data.media_type) {
      case "movie": {
        title = data.original_title;
        additionalText1 = `${
          data.release_date.split("-")[0]
        } | ${data.original_language.toUpperCase()}`;
        break;
      }
      case "tv": {
        title = data.original_name;
        additionalText1 = `${
          data.first_air_date.split("-")[0]
        } | ${data.original_language.toUpperCase()}`;
        break;
      }
      case "person": {
        title = data.name;
        additionalText1 = `Celebrity`;
        poster = `https://image.tmdb.org/t/p/w154/${data.profile_path}`;
        break;
      }
    }

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            if (data.media_type === "movie") {
              const {
                id,
                original_title,
                release_date,
                poster_path,
                backdrop_path,
                overview,
                vote_average,
                vote_count
              } = data;

              this.props.navigation.push("MovieScreen", {
                movie: {
                  id,
                  original_title,
                  release_date,
                  poster_path,
                  backdrop_path,
                  overview,
                  vote_average,
                  vote_count
                }
              });
            } else if (data.media_type === "person") {
              const { id, name, profile_path } = data;

              this.props.navigation.push("PersonScreen", {
                person: {
                  id,
                  name,
                  profile_path
                }
              });
            }
          }}
          style={styles.container}
        >
          <View style={{ flex: 1.5 }}>
            <Image
              source={{
                uri: poster
              }}
              style={{
                flex: 1,
                height: null,
                width: null,
                alignSelf: "stretch",
                resizeMode: "contain"
              }}
            />
          </View>

          <View
            style={{
              flex: 3.5,
              justifyContent: "center",
              marginTop: 5,
              paddingStart: 5
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "black"
              }}
            >
              {title}
            </Text>
            <Text style={{ marginTop: 5 }}>{additionalText1}</Text>
            {data.media_type !== "person" ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 5
                }}
              >
                <Icon name="md-star" style={{ color: "gold", fontSize: 20 }} />
                <Text style={{ marginStart: 5 }}>{data.vote_average}</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: "#e5e5e5",
            borderBottomWidth: 0.8
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "stretch",
    height: 100,
    margin: 5
  }
});

export default SearchItem;
