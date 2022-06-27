import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./AuthProvider";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { ProductList } from "./screens/ProductList";
import { AddProduct } from "./screens/AddProduct";

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { isLoggedIn, roles } = useContext(AuthContext);

  console.log("is login: ", isLoggedIn);

  console.log("roles: ", roles);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Giriş Yap" component={Login} />
            <Stack.Screen name="Hesap Oluştur" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Ürün Listesi" component={ProductList} />
            <Stack.Screen name="Ürün Ekle" component={AddProduct} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
