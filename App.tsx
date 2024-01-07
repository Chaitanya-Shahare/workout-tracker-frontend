import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import {
  Button,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  AddListScreen,
  ExerciseListScreen,
  HomeScreen,
  LoginScreen,
  SignupScreen,
  userState,
} from "./src/screens";
import { CustomHeader } from "./src/components";
import { AuthProvider, AuthContext } from "./src/context/AuthProvider";

const Stack = createNativeStackNavigator();
export default function App() {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <RecoilRoot>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              header: (props) => <CustomHeader {...props} />,
            }}
          >
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddList" component={AddListScreen} />
            <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
          </Stack.Navigator>

          {/* // colorscheme toggle button */}
          <Button
            mode={"contained"}
            onPress={() =>
              setColorScheme(colorScheme === "dark" ? "light" : "dark")
            }
            style={{ margin: 16, position: "absolute", bottom: 100 }}
          >
            Toggle Theme
          </Button>
        </NavigationContainer>
      </PaperProvider>
    </RecoilRoot>
  );
}
