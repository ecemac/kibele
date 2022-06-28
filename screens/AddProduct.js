import { useState, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { AuthContext } from "../AuthProvider";
import config from "../config";
import styles from "./styles";

export const AddProduct = ({ navigation }) => {
  const { value } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availableAfter, setAvailableAfter] = useState(new Date());

  const numberOfLines = 5;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setAvailableAfter(currentDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
    });
  };

  const handleSubmit = () => {
    let body = {
      title,
      description,
      availableAfter,
    };

    fetch(`${config.baseUrl}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${value}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((r) => {
        console.log("r: ", r);
        navigation.navigate("Ürün Görseli Ekle", {
          id: r.data.id,
        });
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Ürün Başlığı:</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text>Ürün Açıklaması:</Text>
      <View style={styles.descriptionInput}>
        <TextInput
          value={description}
          editable
          multiline
          numberOfLines={Platform.OS === "ios" ? null : numberOfLines}
          minHeight={
            Platform.OS === "ios" && numberOfLines ? 20 * numberOfLines : null
          }
          textAlignVertical="top"
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      {Platform.OS === "android" ? (
        <>
          <View style={styles.datePickerContainer}>
            <Text>Satışa Başlama Tarihi:</Text>
            <Text style={styles.selectedDate}>
              {availableAfter.getDate()}/{availableAfter.getMonth() + 1}/
              {availableAfter.getFullYear()}
            </Text>
          </View>
          <View style={styles.datePickerButtonContainer}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.datePickerButton}
            >
              <Text style={styles.buttonText}>Tarih Seç</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Text>Satışa Başlama Tarihi:</Text>
          <DateTimePicker
            value={availableAfter}
            onChange={onChange}
            style={styles.datePicker}
          />
        </>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ürün Ekle</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
