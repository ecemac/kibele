import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "./config";

export const AuthContext = createContext(undefined);

export const AuthDispatchContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState("");

  const getLoginState = async () => {
    try {
      const value = await AsyncStorage.getItem(config.accessTokenKey);
      setIsLoggedIn(value ? true : false);
    } catch (e) {}
  };

  const getRoles = async () => {
    try {
      const value = await AsyncStorage.getItem(config.rolesKey);
      setRoles(value);
    } catch (e) {}
  };

  useEffect(() => {
    getLoginState();
    getRoles();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, roles }}>
      <AuthDispatchContext.Provider value={{ setIsLoggedIn, setRoles }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};
