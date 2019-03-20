import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { Icon, Thumbnail } from "native-base";

const { width, height } = Dimensions.get("window");

class SectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sectionData } = this.props;
    const { title, movies } = sectionData;

    return (
      <View style={{ flex: 1, marginTop: 2, marginBottom: 15 }}>
        <Text
          style={{
            marginStart: 7,
            marginTop: 15,
            marginBottom: 15,
            fontSize: 18,
            fontWeight: "700"
          }}
        >
          {title}
        </Text>
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingStart: 7,
            paddingEnd: 7
          }}
        >
          {movies.map((movie, movieIndex) => {
            return (
              <TouchableOpacity
                key={movieIndex}
                onPress={() => {
                  this.props.navigation.push("MovieScreen", { movie });
                }}
                style={[
                  { width: width / 3 },
                  { height: width / 2 },
                  { margin: 2 },
                  { resizeMode: "contain" }
                ]}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${
                      movie.poster_path
                    }`
                  }}
                  style={[{ flex: 1, borderRadius: 5, resizeMode: "contain" }]}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}
        <FlatList
          horizontal
          data={movies}
          renderItem={item => {
            const { movie, key } = item.item;

            console.log("movie", movie);

            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  this.props.navigation.push("MovieScreen", { movie });
                }}
                style={[
                  { width: width / 3 },
                  { height: width / 2 },
                  { margin: 2 },
                  { resizeMode: "contain" }
                ]}
              >
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`
                  }}
                  style={[{ flex: 1, borderRadius: 5, resizeMode: "contain" }]}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

export default SectionItem;
