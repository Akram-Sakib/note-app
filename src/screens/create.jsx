import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { db } from "../../App";
import Button from "../components/button/button";
import Input from "../components/input/input";
import RadioInput from "../components/radioinput/radioinput";

const noteColorOptions = ["red", "green", "blue"];

export default function Create({ navigation, route, user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);

    try {
      docRef = await addDoc(collection(db, "notes"), {
        user: user.uid,
        title: title,
        description: description,
        color: noteColor,
      });
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        autoCapitalize="Capitalize"
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        autoCapitalize="Capitalize"
      />
      <View style={{ marginTop: 25, marginBottom: 15 }}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOptions.map((option, index) => (
        <RadioInput
          ket={index}
          label={option}
          value={noteColor}
          setValue={setNoteColor}
        />
      ))}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          onPress={onPressCreate}
          title="Submit"
          customStyles={{ marginTop: 60, alignSelf: "center", width: "100%" }}
        />
      )}
    </SafeAreaView>
  );
}
