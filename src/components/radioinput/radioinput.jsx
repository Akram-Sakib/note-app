import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

export default function RadioInput({ label, value, setValue }) {
  const selected = value === label;

  return (
    <Pressable
      onPress={() => setValue(label)}
      style={styles.radioContainer}
    >
      <View
        style={[styles.outterCircle, selected && styles.selectedOutterCircle]}
      >
        <View
          style={[styles.innerCircle, selected && styles.selectedInnerCircle]}
        />
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
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
