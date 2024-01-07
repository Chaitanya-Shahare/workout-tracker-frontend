import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

export const Routes = () => {
  const [token, setToken] = React.useState("");

  (async () => {
    const userToBeParsed = await AsyncStorage.getItem("user");
    if (userToBeParsed) setToken(JSON.parse(userToBeParsed).lists);
  })();
  if (token) {
    return null;
  } else {
    return null;
  }
};
