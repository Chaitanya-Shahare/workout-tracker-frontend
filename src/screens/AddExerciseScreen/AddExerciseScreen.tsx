import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
import { useNetwork } from "../../hooks/network";

export const AddExerciseScreen = ({ navigation }: any) => {
  const [exerciseName, setExerciseName] = React.useState("");
  const [exerciseDescription, setExerciseDescription] = React.useState("");

  const route = useRoute();
  const listName = (route.params as { listName?: string })?.listName;

  const { post } = useNetwork();

  const handleAddExercise = async () => {
    // Write your AddList function logic here
    navigation.goBack();
    await post("/exercise", { listName, exerciseName, exerciseDescription })
      .then((res) => {
        console.log("add exercise", res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Surface style={styles.container}>
      <TextInput
        label="Exercise Name"
        value={exerciseName}
        onChangeText={setExerciseName}
      />
      <TextInput
        label="Exercise Description"
        value={exerciseDescription}
        onChangeText={setExerciseDescription}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleAddExercise}
      >
        Add Exercise
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
    // marginTop: 16,
    borderRadius: 8,
  },
});
