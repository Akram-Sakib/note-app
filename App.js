import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import initializeAuthentication from "./src/firebase/firebase.init";
import Create from "./src/screens/create";
import Edit from "./src/screens/edit";
import Home from "./src/screens/home";
import SignIn from "./src/screens/sign-in";
import SignUp from "./src/screens/sign-up";

initializeAuthentication();

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const user = false;

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Create" component={Create} />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signin"
              component={SignIn}
            />
            <Stack.Screen name="Signup" component={SignUp} />
          </>
        )}
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
