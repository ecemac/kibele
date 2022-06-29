import { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  AuthContext,
  AuthDispatchContext,
  getLoginState,
} from "./AuthProvider";
import { Login } from "./screens/Login";
import { SignUp } from "./screens/SignUp";
import { ProductList } from "./screens/ProductList";
import { AddProduct } from "./screens/AddProduct";
import { AddProductImage } from "./screens/AddProductImage";

export const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { isLoggedIn, value, roles } = useContext(AuthContext);
  const { setIsLoggedIn, setRoles, setValue } = useContext(AuthDispatchContext);

  useEffect(() => {
    if (!value || roles.length === 0) {
      getLoginState()
        .then((r) => {
          setValue(r.loginValue);
          setIsLoggedIn(r.loginValue ? true : false);
          setRoles(r.rolesValue);
        })
        .catch((e) => {
          console.log(error);
        });
    }
  }, []);

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
            <Stack.Screen
              name="Ürün Görseli Ekle"
              component={AddProductImage}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
