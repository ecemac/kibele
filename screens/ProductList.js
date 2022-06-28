import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { AuthContext, AuthDispatchContext } from "../AuthProvider";
import config from "../config";
import styles from "./styles";

export const ProductList = ({ navigation }) => {
  const { value, roles } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthDispatchContext);

  useEffect(() => {
    fetch(`${config.baseUrl}/product`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
    })
      .then((response) => response.json())
      .then((r) => {
        console.log("res: ", r);
      });
  }, []);

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem(config.accessTokenKey);
      await AsyncStorage.removeItem(config.rolesKey);
      Promise.all();
    } catch (exception) {
      return false;
    }
  };

  const handleApplication = () => {
    fetch(`${config.baseUrl}/users/seller/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
    })
      .then((response) => response.json())
      .then((r) => {
        console.log("r: ", r);
        removeUser().then((r) => {
          setIsLoggedIn(false);
          navigation.navigate("Giriş Yap");
        });
      });
  };

  const handleSeller = () => {
    Alert.alert(
      "Satıcı Olma Başvurusu",
      "Başvuruya devam etmek istediğinize emin misiniz?",
      [
        {
          text: "İptal",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Devam Et",
          onPress: () => handleApplication(),
        },
      ]
    );
  };

  console.log("roels: ", roles);

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.flexView}>
        {roles?.length > 0 && roles.some((role) => role === "Seller") ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Ürün Ekle")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ürün Ekle</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleSeller} style={styles.button}>
            <Text style={styles.buttonText}>Satıcı Ol</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            removeUser().then((r) => {
              setIsLoggedIn(false);
              navigation.navigate("Giriş Yap");
            });
          }}
        >
          <Text style={styles.buttonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
