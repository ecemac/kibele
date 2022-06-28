import { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../AuthProvider";
import config from "../config";
import styles from "./styles";

export const AddProductImage = ({ route, navigation }) => {
  const { id } = route.params;
  const { value } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage(pickerResult);
  };

  const handleSubmit = () => {
    let body = {
      productId: id,
      order: 0,
      file: selectedImage.base64,
    };

    fetch(`${config.baseUrl}/product/picture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((r) => {
        console.log("success");
        Alert.alert(
          "Görsel Yüklendi!",
          "Ürün listeleme ekranına gitmek için devam edin",
          [
            {
              text: "Devam Et",
              onPress: () => navigation.navigate("Ürün Listesi"),
            },
          ]
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openImagePickerAsync}>
        <Text style={styles.buttonText}>Ürün görseli ekle</Text>
      </TouchableOpacity>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ürün Eklemeyi Tamamla</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
