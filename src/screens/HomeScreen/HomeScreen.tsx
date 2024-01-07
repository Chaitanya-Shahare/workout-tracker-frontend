import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet } from "react-native";
import {
  List,
  Text,
  Portal,
  Surface,
  TouchableRipple,
  Modal,
  TextInput,
} from "react-native-paper";

export const HomeScreen = () => {
  const [lists, setLists] = React.useState(["push", "pull", "legs"]);
  //   (async () => {
  //     const userToBeParsed = await AsyncStorage.getItem("user");
  //     if (userToBeParsed) setLists(JSON.parse(userToBeParsed).lists);
  //   })();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "white",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    // outerHeight: "50vh",
  };

  return (
    <Surface style={styles.container}>
      <List.Section>
        <List.Subheader>Exercise Lists</List.Subheader>
        <Surface style={styles.listWrapper} elevation={2}>
          <TouchableRipple
            onPress={() => {
              console.log("pressed Add list");
              setVisible(true);
            }}
          >
            <List.Item
              title="Add a List"
              left={() => <List.Icon icon="plus" />}
              style={styles.listItem}
            />
          </TouchableRipple>
          {lists.map((list, index) => (
            <TouchableRipple
              key={index}
              onPress={() => console.log("pressed", list)}
              //   rippleColor="rgba(0, 0, 0, .32)"
            >
              <List.Item
                title={list}
                left={() => <List.Icon icon="format-list-bulleted" />}
                right={() => <List.Icon icon="chevron-right" color="grey" />}
                style={styles.listItem}
              />
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
});
