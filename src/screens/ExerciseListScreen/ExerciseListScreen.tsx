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

export const ExerciseListScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // The listName parameter is in route.params.listName
  const listName = (route.params as { listName?: string })?.listName;

  useEffect(() => {
    console.log("listName", listName);
    navigation.setOptions({ title: listName });
  }, [listName]);

  const exercises = [
    { id: 1, name: "Bench Press" },
    { id: 2, name: "DB Overhead Press" },
    { id: 3, name: "Side Lateral Raises" },
    // Add more exercises as needed
  ];

  const renderExerciseItem = ({
    item,
  }: {
    item: { id: number; name: string };
  }) => (
    <TouchableRipple
      onPress={() => {
        console.log("pressed exercise");
        // navigation.navigate("ExerciseList", { listName: list });
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
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
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
