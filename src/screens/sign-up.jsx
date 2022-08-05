import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "../components/button/button";
import Input from "../components/input/input";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const genderOptions = ["Male", "Female"];

export default function SignUp({ navigation }) {
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const signUp = () => {
    console.log("Clicked");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input placeholder="Full Name" onChangeText={(text) => setName(text)} />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        {genderOptions.map((option) => {
          const selected = option === gender;

          return (
            <Pressable
              onPress={() => setGender(option)}
              key={option}
              style={styles.redioContainer}
            >
              <View
                style={[
                  styles.outterCircle,
                  selected && styles.selectedOutterCircle,
                ]}
              >
                <View
                  style={[
                    styles.innerCircle,
                    selected && styles.selectedInnerCircle,
                  ]}
                />
              </View>
              <Text style={styles.radioText}>{option}</Text>
            </Pressable>
          );
        })}

        {/* <Pressable style={styles.redioContainer}>
          <View style={[styles.outterCircle, selected && styles.selectedOutterCircle]}>
            <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]}/>
          </View>
          <Text style={styles.radioText}>Female</Text>
        </Pressable> */}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          title="Signup"
          customStyles={{ alignSelf: "center", marginBottom: 60 }}
          onPress={signUp}
        />
        <Pressable onPress={() => navigation.navigate("Signin")}>
          <Text>
            Already have an account?{" "}
            <Text style={{ color: "green", fontWeight: "bold" }}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    color: "#ccc",
    marginBottom: 25,
  },
  redioContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  outterCircle: {
    height: 25,
    width: 25,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },
  selectedOutterCircle: {
    borderColor: "orange",
  },
  selectedInnerCircle: {
    backgroundColor: "orange",
    borderColor: "orange",
  },
});
