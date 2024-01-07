import React from "react";
import { StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";

export const AddSetScreen = ({ navigation }: any) => {
  const [reps, setReps] = React.useState("");
  const [weight, setWeight] = React.useState("");

  const handleAddSet = () => {
    // Write your AddList function logic here
    navigation.goBack();
  };

  return (
    <Surface style={styles.container}>
      <TextInput label="Reps" value={reps} onChangeText={setReps} />
      <TextInput label="Weight" value={weight} onChangeText={setWeight} />
      <Button mode="contained" onPress={handleAddSet}>
        Add Set
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
