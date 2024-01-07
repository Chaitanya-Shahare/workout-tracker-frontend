import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
import * as Keychain from "react-native-keychain";
import { AuthContext } from "../../context/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("email", email);
    console.log("password", password);
    console.log("userName", userName);
  }, [email, password, userName]);

  // const { setIsSignedIn } = useContext(AuthContext);

  const handleSignup = async () => {
    const payload = { userName, email, password };

    try {
      const response = await fetch("http://localhost:5001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);
      if (data.success) {
        console.log("signup", data);
        // const { token } = data;
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, token: data.token })
        );
        console.log(data);
        // setIsSignedIn(true);
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Surface style={styles.container}>
      {/* <Header /> */}
      <TextInput
        label="UserName"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Signup
      </Button>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 8,
  },
});
