import { useState } from "react";
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
import styles from "./styles";

export const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
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
          numberOfLines={7}
          textAlignVertical="top"
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      {Platform.OS === "android" ? (
        <>
          <View style={styles.datePickerContainer}>
            <Text>Satışa Başlama Tarihi:</Text>
            <Text style={styles.selectedDate}>
              {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
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
            value={date}
            onChange={onChange}
            style={styles.datePicker}
          />
        </>
      )}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ürün Ekle</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
