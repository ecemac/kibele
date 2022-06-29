import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "./config";

export const AuthContext = createContext(undefined);

export const AuthDispatchContext = createContext(undefined);

export const getLoginState = async () => {
  try {
    const loginValue = await AsyncStorage.getItem(config.accessTokenKey);
    const rolesValue = await AsyncStorage.getItem(config.rolesKey);
    let value = {
      loginValue: loginValue ? loginValue : "",
      rolesValue: rolesValue ? JSON.parse(rolesValue) : [],
    };
    return value;
  } catch (e) {}
};

export const AuthProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [roles, setRoles] = useState([]);

  /* useEffect(() => {
    getLoginState().then((r) => {
      setValue(r.loginValue);
      setIsLoggedIn(r.loginValue ? true : false);
      setRoles(r.rolesValue);
    });
  }, []); */

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
