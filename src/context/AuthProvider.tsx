import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isSignedIn: true,
  setIsSignedIn: (value: boolean) => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
