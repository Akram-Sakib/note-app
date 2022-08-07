import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { auth } from '../../App'
import Button from '../components/button/button'
import Input from '../components/input/input'
import { showMessage } from "react-native-flash-message";

export default function SignIn({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  

  const login = () =>{
    setLoading(true)
    signInWithEmailAndPassword(auth,email,password).then(res => {
      console.log("Signed in successfully", res);
    }).catch((err) => {
      showMessage({
        message: "Username or Password did not matched!",
        type: "danger",
      });
    })
    setLoading(false)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("./../../assets/images/login-image.png")}
        style={{ alignSelf: "center" }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
        Never forget your notes
      </Text>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button
          title="Login"
          customStyles={{ alignSelf: "center", marginTop: 60 }}
          onPress={login}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text>
            Dont have an account?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input:{
    height:48,
    borderBottomWidth:1,
    color:"#ccc",
    marginBottom:25,
  }
})