import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { AuthContext, AuthDispatchContext } from "../AuthProvider";
import config from "../config";
import styles from "./styles";

export const ProductList = ({ navigation }) => {
  const { value, roles } = useContext(AuthContext);
  const { setIsLoggedIn, setRoles, setValue } = useContext(AuthDispatchContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      fetch(`${config.baseUrl}/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        },
      })
        .then((response) => response.json())
        .then((r) => {
          setProducts(r.data);
          setLoading(false);
        });
    });

    return unsubscribe;
  }, [navigation]);

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

  const handleOrder = (id) => {
    fetch(`${config.baseUrl}/product/order/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
    })
      .then((response) => response.json())
      .then((r) => {
        Alert.alert("Sipariş Verildi!", "Ürünlere geri dönebilirsiniz", [
          {
            text: "Devam Et",
            onPress: () => {},
          },
        ]);
      });
  };

  let parsedRoles = typeof roles === "string" ? JSON.parse(roles) : roles;

  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        {!loading ? (
          <View>
            <View style={styles.flexView}>
              {parsedRoles?.length > 0 &&
              parsedRoles?.some((role) => role === "Seller") ? (
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
                    setValue("");
                    setRoles([]);
                    navigation.navigate("Giriş Yap");
                  });
                }}
              >
                <Text style={styles.buttonText}>Çıkış Yap</Text>
              </TouchableOpacity>
            </View>
            <View>
              {products.length > 0 &&
                products.map((p) => (
                  <View key={p.id} style={styles.productContainer}>
                    <View style={styles.infoContainer}>
                      <Image
                        style={{ width: 100, height: 100 }}
                        source={{
                          uri: `data:img/jpg;base64,${p?.pictures[0].content}`,
                        }}
                      />
                      <View style={styles.productTextContainer}>
                        <Text style={styles.productTitle}>{p.title}</Text>
                        <Text style={styles.productDescription}>
                          {p.description}
                        </Text>
                        <Text style={styles.availableDate}>
                          Teslimat tarihi: {""}
                          {new Date(p.availableAfter).getDate()}/
                          {new Date(p.availableAfter).getMonth() + 1}/
                          {new Date(p.availableAfter).getFullYear()}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleOrder(p?.id)}
                    >
                      <Text style={styles.buttonText}>Sipariş Ver</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              {products.length === 0 && (
                <Text style={styles.centeredText}>Ürün bulunamadı.</Text>
              )}
            </View>
          </View>
        ) : (
          <Text style={styles.centeredText}>Yükleniyor...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
