import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon } from "native-base";

class TrendingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      poster_path,
      backdrop_path,
      original_title,
      release_date,
      original_language,
      vote_average,
      vote_count
    } = this.props.data;

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.push("MovieScreen", {
              movie: {
                id,
                original_title,
                release_date,
                poster_path,
                backdrop_path,
                overview: "",
                vote_average,
                vote_count
              }
            });
          }}
          style={styles.container}
        >
          <View style={{ flex: 1.5 }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w185/${poster_path}`
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
            style={{ flex: 3.5, justifyContent: "center", paddingStart: 10 }}
          >
            <Text
              numberOfLines={2}
              style={{
                color: "black",
                fontSize: 16,
                fontWeight: "600"
              }}
            >
              {original_title}
            </Text>
            <Text style={{ marginTop: 5, fontSize: 14 }}>
              {release_date.split("-")[0]} | {original_language.toUpperCase()}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5
              }}
            >
              <Icon name="md-star" style={{ color: "gold", fontSize: 20 }} />
              <Text style={{ marginStart: 5, fontSize: 14 }}>
                {vote_average}
              </Text>
            </View>
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
    height: 150,
    marginTop: 8,
    marginBottom: 8,
    marginStart: 4,
    marginEnd: 4
  }
});

export default TrendingItem;
