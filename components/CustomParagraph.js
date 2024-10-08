import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//// Composant pour afficher les bullet points
const CustomBulletPoints = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletContainer}>
          <View style={styles.bulletInnerContainer}>
            <FontAwesome name="circle" size={10} color="#49B48C" />
            <Text style={styles.bulletText}>
              {item.bulletText} {item.detailsText}
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

// Composant pour afficher un paragraphe avec ou sans bullet points
export const CustomParagraph = ({ paragraphText, title, bulletPoints }) => {
  return (
    <View style={styles.paragraphContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.line}></View>

      {bulletPoints && bulletPoints.length > 0 ? (
        <CustomBulletPoints items={bulletPoints} />
      ) : (
        <Text style={styles.paragraphText}>{paragraphText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paragraphContainer: {
    width: 284,
    marginTop: 30,
  },

  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    lineHeight: 22.5,
  },

  line: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 280,
    marginTop: 5,
    marginBottom: 15,
  },

  paragraphText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 19.5,
  },

  //BULLETPOINT STYLE
  bulletContainer: {
    flexDirection: "column",

    marginBottom: 5,
  },

  bulletInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  bulletText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 20,
    marginLeft: 10,
  },

  detailsText: {
    fontFamily: "Poppins",
    fontSize: 13,
    lineHeight: 20,
    borderColor: "yellow",
    borderWidth: 1,
    marginLeft: 20,
  },
});

export default CustomParagraph;
