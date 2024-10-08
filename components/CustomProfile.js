import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from "./CustomButton";

export const CustomProfile = ({
  profile_picture,
  photoStyle,
  remoterProfileStyle,
  remoterNameContainerStyle,
  remoterFirstnameStyle,
  firstname,
  remoterLastnameStyle,
  lastname,
  remoterJobStyle,
  job,
  showCity = true,
  cityName,
  showButton = true,
}) => {
  return (
    <View style={[styles.remoterProfile, remoterProfileStyle]}>
      <Image
        source={{uri: profile_picture}}
        style={[styles.photoRemoter, photoStyle]}
      />
      <View
        style={[
          styles.remoterNameAndJobContainerStyle,
        ]}
      >
        <View style={[styles.remoterNameContainer, remoterNameContainerStyle]}>
          <Text style={[styles.remoterFirstname, remoterFirstnameStyle]}>
            {firstname}
          </Text>
          <Text style={[styles.remoterLastname, remoterLastnameStyle]}>
            {lastname}
          </Text>
        </View>
        <Text style={[styles.remoterJob, remoterJobStyle]}>{job}</Text>
      </View>

      {/* Afficher CustomCity si showCity est true */}
      {showCity && <CustomCity city={cityName} />}
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
      <FontAwesome name="map-marker" style={styles.icon} size={25} />

      <Text style={styles.remoterCity}>{city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  remoterProfile: {
    height: 190,
    alignItems: "center",
    marginRight: 10,
  },

  photoRemoter: {
    width: 60,
    height: 60,
    borderRadius: 150,
  },

  remoterNameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },

  remoterFirstname: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    lineHeight: 21,
    marginRight: 5,
  },

  remoterLastname: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    lineHeight: 21,
  },

  remoterJob: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    lineHeight: 21,
    marginBottom: 5,
    marginLeft: 10,
  },

  remoterCityContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 10,
    alignItems: "center",
  },

  remoterCity: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'left',
  },

  icon: {
    width: 25,
    height: 25,
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
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 21,
    color: "#FFFFFF",
  },
});

export default CustomProfile;
