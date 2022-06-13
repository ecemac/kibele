import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import styles from "./styles";
import config from "../config";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeRoles = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const storeAccessToken = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      Alert.alert("Giriş Başarılı!", "Ürün listesine yönlendiriliyorsunuz.", [
        {
          text: "Tamam",
          onPress: () => navigation.navigate("Ürün Listesi"),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogin = () => {
    if (email && password) {
      let body = {
        email,
        password,
      };

      fetch(`${config.baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 401) {
            Alert.alert("Hata!", "Girdiğiniz bilgileri kontrol edin", [
              { text: "Tamam", onPress: () => console.log("OK Pressed") },
            ]);
          } else {
            let decoded = jwt_decode(data.data.access_token);

            storeRoles(
              config.rolesKey,
              decoded[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
              ]
            );

            storeAccessToken(config.accessTokenKey, data.data.access_token);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Kibele Uygulamasına</Text>
      <Text style={styles.headerTitle}>Hoşgeldiniz</Text>
      <Text style={styles.headerSubTitle}>Devam etmek için giriş yap.</Text>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text>Şifre:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
      <Text>
        Hesabın yok mu?{" "}
        <Text
          onPress={() => navigation.navigate("Hesap Oluştur")}
          style={styles.navText}
        >
          Hemen oluştur.
        </Text>
      </Text>
    </SafeAreaView>
  );
};
