import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomParagraph = ({ text, textStyle, titleStyle, title }) => {
  return (
    <View style={styles.paragraphContainer}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <View style={styles.line}></View>

      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraphContainer: {
    width: 284,

    borderColor: "blue",
    borderWidth: 1,
    marginTop: 30,
  },

  title: {
    fontFamily: "poppins",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 22.5,
    borderColor: "pink",
    borderWidth: 1,
  },

  line: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 280,
    marginTop: 15,
    marginBottom: 20,
  },

  text: {
    fontFamily: "poppins",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 19.5,
    borderColor: "grey",
    borderWidth: 1,
  },
});

export default CustomParagraph;
