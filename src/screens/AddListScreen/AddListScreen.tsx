import React from "react";
import { StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";

export const AddListScreen = ({ navigation }: any) => {
  const [listName, setListName] = React.useState("");
  const [listDescription, setListDescription] = React.useState("");

  const handleAddList = () => {
    // Write your AddList function logic here
    navigation.goBack();
  };

  return (
    <Surface style={styles.container}>
      <TextInput
        label="List Name"
        value={listName}
        onChangeText={setListName}
      />
      <TextInput
        label="List Description"
        value={listDescription}
        onChangeText={setListDescription}
      />
      <Button mode="contained" onPress={handleAddList}>
        Add List
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    minHeight: "100%",
    gap: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});
