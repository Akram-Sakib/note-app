import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
  placeholder,
  secureTextEntry,
  onChangeText,
  autoCapitalize = "none",
  multiline,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    color: "#ccc",
    marginBottom: 25,
  },
});
