import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import FlashMessage from "react-native-flash-message";
// import initializeAuthentication from "./src/firebase/firebase.init";
import Create from "./src/screens/create";
import Edit from "./src/screens/edit";
import Home from "./src/screens/home";
import SignIn from "./src/screens/sign-in";
import SignUp from "./src/screens/sign-up";

// initializeAuthentication();

const firebaseConfig = {
  apiKey: "AIzaSyDtHwGuM-4QEw7fguQ_duCaeSJE1ukNCiY",
  authDomain: "acc-note-app-71637.firebaseapp.com",
  projectId: "acc-note-app-71637",
  storageBucket: "acc-note-app-71637.appspot.com",
  messagingSenderId: "786109759182",
  appId: "1:786109759182:web:b0880ea1f3a37febcc9a9f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   signOut(auth);
  // });

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
      return authSubscription;
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{headerShown:false}}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Edit">
              {(props) => <Edit {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
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
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
