import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
import { useNetwork } from "../../hooks/network";

export const AddSetScreen = ({ navigation }: any) => {
  const [reps, setReps] = React.useState("");
  const [weight, setWeight] = React.useState("");

  const route = useRoute();
  const exerciseId = (route.params as { exerciseId?: string })?.exerciseId;
  const exerciseName = (route.params as { exerciseName?: string })
    ?.exerciseName;
  const setExerciseLogs = (route.params as { setExerciseLogs?: any })
    ?.setExerciseLogs;

  useEffect(() => {
    navigation.setOptions({ title: exerciseName });
  });

  const { post } = useNetwork();

  const handleAddSet = () => {
    // Write your AddList function logic here

    post("/exercise/add-set", { exerciseId, set: { reps, weight } })
      .then((res) => {
        console.log("add set", res);
        setExerciseLogs((exerciseLogs: any) => [...exerciseLogs, res.set]);
        navigation.goBack();
      })
      .catch((err) => {
        console.error(err);
      });
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
