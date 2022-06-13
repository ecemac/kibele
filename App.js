import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { ProductList } from "./screens/ProductList";
import { AddProduct } from "./screens/AddProduct";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Giriş Yap" component={Login} />
        <Stack.Screen name="Hesap Oluştur" component={SignUp} />
        <Stack.Screen name="Ürün Listesi" component={ProductList} />
        <Stack.Screen name="Ürün Ekle" component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
