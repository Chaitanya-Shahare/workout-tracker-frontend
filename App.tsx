import React, { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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
import { LoginScreen, SignupScreen } from "./src/screens";
import { CustomHeader } from "./src/components";
import { AuthProvider, AuthContext } from "./src/context/AuthProvider";

const Stack = createNativeStackNavigator();
export default function App() {
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  const { isSignedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log("isSignedIn", isSignedIn);
  }, [isSignedIn]);

  return (
    <AuthProvider>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              header: (props) => <CustomHeader {...props} />,
            }}
          >
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
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
    </AuthProvider>
  );
}
