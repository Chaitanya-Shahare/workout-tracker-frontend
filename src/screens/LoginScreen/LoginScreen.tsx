import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Surface,
  ActivityIndicator,
} from "react-native-paper";
import { AuthContext } from "../../context/AuthProvider";

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log("email", email);
    console.log("password", password);
    console.log("userName", userName);
  }, [email, password, userName]);

  const handleLogin = async () => {
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
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { setIsSignedIn, isSignedIn } = useContext(AuthContext);

  const toggleIsSignedInTrue = () => {
    setIsSignedIn(true);
  };
  const toggleIsSignedInFalse = () => {
    setIsSignedIn(false);
  };

  return (
    <Surface style={styles.container}>
      {/* <Header /> */}
      {/* <TextInput
        label="UserName"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      /> */}
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

      <ActivityIndicator animating={true} color="#000" />
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={toggleIsSignedInTrue}
        style={styles.button}
      >
        toggle isSignedIn true
      </Button>
      <Button
        mode="outlined"
        onPress={toggleIsSignedInFalse}
        style={styles.button}
      >
        toggle isSignedIn flase
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
  },
});
