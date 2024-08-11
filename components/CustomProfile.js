import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from "./CustomButton";

export const CustomProfile = ({
  photoStyle,
  remoterNameContainerStyle,
  remoterFirstnameStyle,
  firstname,
  remoterLastnameStyle,
  lastname,
  remoterJobStyle,
  job,
  showCity = true, // prop pour afficher ou non la ville
  cityName, //Prop pour la ville à afficher
  showButton = true,
}) => {
  return (
    <View style={styles.remoterProfile}>
      <Image
        source={require("../assets/photoJerome.png")}
        style={[styles.photoRemoter, photoStyle]}
      />
      <View style={[styles.remoterNameContainer, remoterNameContainerStyle]}>
        <Text style={[styles.remoterFirstname, remoterFirstnameStyle]}>
          {firstname}
        </Text>
        <Text style={[styles.remoterLastname, remoterLastnameStyle]}>
          {lastname}
        </Text>
      </View>
      <Text style={[styles.remoterJob, remoterJobStyle]}>{job}</Text>
      {/* Afficher CustomCity si showCity est true */}
      {showCity && cityName && <CustomCity city={cityName} />}
      {showButton && (
        <CustomButton
          style={styles.button}
          activeOpacity={0.8}
          title="Voir"
          textStyle={styles.textButton}
        />
      )}
    </View>
  );
};

export const CustomCity = ({ city }) => {
  return (
    <View style={styles.remoterCityContainer}>
      <FontAwesome name="map-marker" style={styles.icon} size={18} />

      <Text style={styles.remoterCity}>{city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  remoterProfile: {
    borderColor: "yellow",
    borderWidth: 3,
    height: 190,
    alignItems: "center",
    marginRight: 10,
  },

  photoRemoter: {
    width: 80,
    height: 80,
    borderRadius: 150,
  },

  remoterNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "pink",
    borderWidth: 2,
  },

  remoterFirstname: {
    fontFamily: "poppins",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
    marginRight: 5,
  },

  remoterLastname: {
    fontFamily: "poppins",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "bold",
  },

  remoterJob: {
    fontFamily: "poppins",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 5,
  },

  remoterCityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "blue",
    borderWidth: 2,

    height: 21,
  },

  remoterCity: {
    fontFamily: "poppins",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 21,
    borderColor: "purple",
    borderWidth: 3,
  },

  icon: {
    width: 15,
    height: 17,
    borderColor: "grey",
    borderWidth: 2,
  },

  button: {
    width: 103,
    height: 31,
    backgroundColor: "#49B48C",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 5,
  },

  textButton: {
    fontFamily: "poppins",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 21,
    color: "#FFFFFF",
  },
});

export default CustomProfile;
