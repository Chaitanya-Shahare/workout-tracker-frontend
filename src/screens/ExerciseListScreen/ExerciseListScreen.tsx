import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import {
  List,
  Divider,
  Surface,
  Button,
  TouchableRipple,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNetwork } from "../../hooks/network";
import { useFocusEffect } from "@react-navigation/native";

export const ExerciseListScreen = ({ navigation }: any) => {
  const route = useRoute();

  const listName = (route.params as { listName?: string })?.listName;
  const routeName = (route.params as { routeName?: string })?.routeName;

  const exercises = [
    { _id: 1, name: "Bench Press" },
    { _id: 2, name: "DB Overhead Press" },
    { _id: 3, name: "Side Lateral Raises" },
  ];

  const [exerciseList, setExerciseList] = React.useState([]);

  const { get } = useNetwork();

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({ title: listName });
      get("/exercise/" + listName)
        .then((res) => {
          setExerciseList(res.exercises);
          console.log("get exercise useeffect", res);
        })
        .catch((err) => {
          console.error(err);
        });
    }, [])
  );

  const renderExerciseItem = ({ item }: { item: any }) => (
    <TouchableRipple
      onPress={() => {
        console.log("pressed exercise " + item.name + " in " + listName);
        navigation.navigate("ExerciseLog", { listName, exercise: item });
      }}
    >
      <List.Item
        title={item.name}
        right={() => <List.Icon icon="chevron-right" color="grey" />}
      />
    </TouchableRipple>
  );

  return (
    <Surface style={styles.container}>
      <Surface style={styles.listWrapper} elevation={2}>
        <FlatList
          data={exerciseList}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item._id.toString()}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
        {/* {exercises.map((exercise, index) =>
          renderExerciseItem({ item: exercise })
        )} */}
      </Surface>

      <Button
        mode="contained"
        onPress={() => {
          console.log("pressed Add Exercise");
          navigation.navigate("AddExercise", { listName });
        }}
        style={styles.button}
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
  listWrapper: {
    borderRadius: 8,
  },
  listItem: {
    padding: 16,
  },
  button: {
    borderRadius: 8,
  },
  divider: {
    marginLeft: 16,
    marginRight: 16,
  },
});
