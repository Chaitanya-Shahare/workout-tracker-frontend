import React, { useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  List,
  Text,
  Surface,
  Divider,
  TouchableRipple,
  useTheme,
  FAB,
  Button,
} from "react-native-paper";
import _ from "lodash";
import { useRoute } from "@react-navigation/native";

interface ExerciseLog {
  _id: string;
  weight: number;
  reps: number;
  timeStamp: string;
}

const exerciseLogs: ExerciseLog[] = [
  { _id: "5", weight: 10, reps: 8, timeStamp: "2022-01-02 10:00 AM" },
  { _id: "6", weight: 15, reps: 12, timeStamp: "2022-01-02 11:30 AM" },
  { _id: "7", weight: 12, reps: 10, timeStamp: "2022-01-02 09:45 AM" },
  { _id: "1", weight: 10, reps: 8, timeStamp: "2022-01-01 10:00 AM" },
  { _id: "2", weight: 15, reps: 12, timeStamp: "2022-01-01 11:30 AM" },
  { _id: "3", weight: 12, reps: 10, timeStamp: "2022-01-01 09:45 AM" },
  // Add 50 similar objects with unique _ids
  // { _id: "8", weight: 20, reps: 15, timeStamp: "2022-01-03 10:00 AM" },
  // { _id: "9", weight: 25, reps: 20, timeStamp: "2022-01-03 11:30 AM" },
  // { _id: "10", weight: 22, reps: 18, timeStamp: "2022-01-03 09:45 AM" },
  // // Add more objects here...
  // { _id: "4", weight: 10, reps: 8, timeStamp: "2022-01-02 10:00 AM" },
  // { _id: "12", weight: 10, reps: 8, timeStamp: "2022-01-02 10:00 AM" },
  // { _id: "13", weight: 15, reps: 12, timeStamp: "2022-01-02 11:30 AM" },
  // { _id: "14", weight: 12, reps: 10, timeStamp: "2022-01-02 09:45 AM" },
  // { _id: "8", weight: 10, reps: 8, timeStamp: "2022-01-01 10:00 AM" },
  // { _id: "9", weight: 15, reps: 12, timeStamp: "2022-01-01 11:30 AM" },
  // { _id: "10", weight: 12, reps: 10, timeStamp: "2022-01-01 09:45 AM" },
  // // Add 57 similar objects with unique _ids
  // { _id: "15", weight: 20, reps: 15, timeStamp: "2022-01-03 10:00 AM" },
  // { _id: "16", weight: 25, reps: 20, timeStamp: "2022-01-03 11:30 AM" },
  // { _id: "17", weight: 22, reps: 18, timeStamp: "2022-01-03 09:45 AM" },
  // // Add more objects here...
  // { _id: "11", weight: 10, reps: 8, timeStamp: "2022-01-02 10:00 AM" },
];

export const ExerciseLogScreen = ({ navigation }: any) => {
  const { colors } = useTheme();

  const route = useRoute();
  const listName = (route.params as { listName?: string })?.listName;
  const exercise = (route.params as { exercise?: any })?.exercise;

  useEffect(() => {
    navigation.setOptions({ title: exercise.name });
  }, []);

  const [exerciseLogs, setExerciseLogs] = React.useState<ExerciseLog[]>(
    exercise.logs
  );

  const groupedExerciseLogs = _.groupBy(
    exerciseLogs,
    // exercise.log,
    (log) => log.timeStamp.split(" ")[0]
  );

  return (
    <View>
      <ScrollView
        style={{
          ...styles.container,
          backgroundColor: colors.elevation.level1,
        }}
      >
        {Object.entries(groupedExerciseLogs).map(([date, logs]) => (
          <List.Section key={date}>
            <List.Subheader>{date}</List.Subheader>
            <Surface style={styles.listWrapper} elevation={2}>
              {logs.map((log) => (
                <TouchableRipple
                  onPress={() => {
                    console.log("pressed log");
                  }}
                >
                  <>
                    <List.Item
                      key={log._id}
                      style={styles.listItem}
                      title={
                        log.timeStamp.split(" ")[1] +
                        " " +
                        log.timeStamp.split(" ")[2]
                      }
                      // description={`Weight: ${log.weight} Reps: ${log.reps}`}
                      // left={() => <List.Icon icon="clock" />}
                      right={() => (
                        <View style={styles.listItemRight}>
                          <View style={styles.span}>
                            <Text style={styles.reps}>{log.reps}</Text>
                            <Text>reps</Text>
                          </View>
                          <View style={styles.span}>
                            <Text style={styles.weight}>{log.weight}</Text>
                            <Text>kg</Text>
                          </View>
                          <List.Icon icon="chevron-right" color="grey" />
                        </View>
                      )}
                    />
                    <Divider style={styles.divider} />
                  </>
                </TouchableRipple>
              ))}
              {/* <Divider /> */}
            </Surface>
          </List.Section>
        ))}
      </ScrollView>
      <Button
        icon="plus"
        style={{}}
        onPress={() => {
          console.log("Pressed");
          navigation.navigate("AddSet", {
            exerciseId: exercise._id,
            exerciseName: exercise.name,
            setExerciseLogs: setExerciseLogs,
          });
        }}
        // customSize={70}
        // variant="tertiary"
      >
        +
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    minHeight: "100%",
    gap: 16,
    position: "relative",
  },
  listWrapper: {
    borderRadius: 8,
  },
  listItem: {
    padding: 16,
  },
  listItemRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "40%",
  },

  divider: {
    marginLeft: 16,
    marginRight: 16,
  },

  span: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "40%",
  },

  reps: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
  },

  weight: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 4,
  },

  fab: {
    position: "absolute",
    // margin: 16,
    right: 16,
    bottom: 50,
    zIndex: 100,
  },
});
