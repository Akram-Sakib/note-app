import { View, Text, SafeAreaView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../App";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // create the query
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    
    // create listener to listen to the query that we just made
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setNotes(list);
    });
    return notesListenerSubscription;
  }, []);

  console.log("Notes", notes);

  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
