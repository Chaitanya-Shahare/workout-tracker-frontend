import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  List,
  Text,
  Portal,
  Surface,
  TouchableRipple,
  Modal,
  TextInput,
  Divider,
} from "react-native-paper";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../SignupScreen";

export const HomeScreen = ({ navigation }: any) => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    (async () => {
      const userToBeParsed = await AsyncStorage.getItem("user");
      if (userToBeParsed) setUser(JSON.parse(userToBeParsed));
    })();
  }, []);

  const [lists, setLists] = React.useState([
    "My Exercises",
    "push",
    "pull",
    "legs",
  ]);
  //   (async () => {
  //     const userToBeParsed = await AsyncStorage.getItem("user");
  //     if (userToBeParsed) setLists(JSON.parse(userToBeParsed).lists);
  //   })();

  return (
    <Surface style={styles.container}>
      <List.Section>
        <List.Subheader>Exercise Lists</List.Subheader>
        <Surface style={styles.listWrapper} elevation={2}>
          <TouchableRipple
            onPress={() => {
              console.log("pressed Add list");
              navigation.navigate("AddList");
            }}
          >
            <List.Item
              title="Add a List"
              left={() => <List.Icon icon="plus" />}
              style={styles.listItem}
            />
          </TouchableRipple>
          {user.lists.map((list, index) => (
            <TouchableRipple
              key={index}
              onPress={() => {
                console.log("pressed", list);
                navigation.navigate("ExerciseList", { listName: list });
              }}
              //   rippleColor="rgba(0, 0, 0, .32)"
            >
              <View>
                <List.Item
                  title={list}
                  left={() => <List.Icon icon="format-list-bulleted" />}
                  right={() => <List.Icon icon="chevron-right" color="grey" />}
                  style={styles.listItem}
                />
                <Divider style={styles.divider} />
              </View>
            </TouchableRipple>
          ))}
        </Surface>
      </List.Section>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    minHeight: "100%",
  },
  listWrapper: {
    borderRadius: 8,
  },
  listItem: {
    padding: 16,
  },
  divider: {
    marginLeft: 16,
    marginRight: 16,
  },
});
