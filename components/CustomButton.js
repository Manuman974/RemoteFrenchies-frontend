import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({
  onPress,
  title,
  style,
  textStyle,
  activeOpacity = 0.8,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      activeOpacity={activeOpacity}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#49B48C",
    padding: 10,
    borderRadius: 40,
    alignItems: "center",
    marginVertical: 10,
    height: 50,
    width: "60%",
  },
  text: {
    color: "#fff",
    fontSize: 13,
    paddingTop: 4,
    lineHeight: 21,
    fontFamily: "Poppins-SemiBold",
  },
});

export default CustomButton;
