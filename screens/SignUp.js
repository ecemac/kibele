import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";
import config from "../config";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleSignUp = () => {
    if (email && password && password === confirmPassword && name && surname) {
      let body = {
        name,
        surname,
        email,
        password,
      };

      fetch(`${config.baseUrl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((data) => {
          Alert.alert(
            "Kullanıcı oluşturuldu!",
            "Giriş sayfasına yönlendiriliyorsunuz.",
            [
              {
                text: "Tamam",
                onPress: () => navigation.navigate("Giriş Yap"),
              },
            ]
          );
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      Alert.alert("Hata!", "Girdiğiniz bilgileri kontrol edin", [
        { text: "Tamam", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Text>Şifre:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text>Şifreyi doğrula:</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Text>İsim:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Soyisim:</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Hesap Oluştur</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
