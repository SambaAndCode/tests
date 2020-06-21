import React, { useContext, useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Text,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BeerCard } from "./BeerCard";
import { store } from "../../store/store";
import { Creators as beerActions } from "../../store/ducks/beer";
import { SearchField } from "../../components/SearchField";

export default function SearchScreen({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const [searchName, setSearchName] = useState("");
  const { state, dispatch } = useContext(store);
  const { beer } = state;
  navigation.setOptions({
    headerRight: () => <Text>Home</Text>,
  });
  const search = () =>
    beerActions.fetchBeers({ beer_name: searchName, page: 1 }, dispatch);
  useEffect(() => {
    search();
  }, []);

  return (
    <View style={styles.container}>
      <SearchField
        value={searchName}
        onChangeText={setSearchName}
        onSubmit={search}
      />
      {beer && beer.beers && beer.beers.length > 0 ? (
        <FlatList
          data={beer.beers}
          renderItem={({ item }) => <BeerCard beer={item} />}
          keyExtractor={(item) => item.id + ""}
        />
      ) : (
        <View style={styles.notFound}>
          <Icon name="frown-o" size={25} color="#c62828" />
          <Text style={styles.textTitle}>No drink found</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "#e2e2e2",
    height: "100%",
  },
  notFound: {
    flexDirection: "row",
    backgroundColor: "#ef9a9a",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  textTitle: {
    color: "#c62828",

    padding: 10,
    fontSize: 20,
  },
});
