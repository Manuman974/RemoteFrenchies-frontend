import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const CustomBulletPoints = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <>
          <View key={index} style={styles.bulletContainer}>
            <View style={styles.bulletInnerContainer}>
              <FontAwesome name="circle" size={10} color="#49B48C" />
              <Text style={styles.bulletText}>{item.bulletText}</Text>
            </View>
            {items.detailsText && (
              <Text style={styles.detailsText}>{item.detailsText}</Text>
            )}
          </View>
        </>
      ))}
    </>
  );
};

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

    borderColor: "blue",
    borderWidth: 1,
    marginTop: 30,
  },

  title: {
    fontFamily: "poppins",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 22.5,
    borderColor: "pink",
    borderWidth: 1,
  },

  line: {
    borderColor: "#000000",
    borderWidth: 1,
    width: 280,
    marginTop: 5,
    marginBottom: 15,
  },

  paragraphText: {
    fontFamily: "poppins",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 19.5,
    borderColor: "grey",
    borderWidth: 1,
  },

  //BULLETPOINT STYLE
  bulletContainer: {
    flexDirection: "column",

    marginBottom: 5,
    borderColor: "green",
    borderWidth: 1,
  },

  bulletInnerContainer: {
    flexDirection: "row", // Pour aligner l'icône et le texte horizontalement
    alignItems: "center",
  },

  bulletText: {
    fontFamily: "Poppins",
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
