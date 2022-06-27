import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "./config";

export const AuthContext = createContext(undefined);

export const AuthDispatchContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState("");

  const getLoginState = async () => {
    try {
      const value = await AsyncStorage.getItem(config.accessTokenKey);
      setValue(value);
      setIsLoggedIn(value ? true : false);
    } catch (e) {}
  };

  const getRoles = async () => {
    try {
      const value = await AsyncStorage.getItem(config.rolesKey);
      console.log("value: ", value);
      setRoles(JSON.parse(roles));
    } catch (e) {}
  };

  useEffect(() => {
    getLoginState();
    getRoles();
  }, []);

  return (
    <AuthContext.Provider value={{ value, isLoggedIn, roles }}>
      <AuthDispatchContext.Provider
        value={{ setValue, setIsLoggedIn, setRoles }}
      >
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
