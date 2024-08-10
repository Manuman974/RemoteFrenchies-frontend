import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//useLayoutEffect : hook pour configurer les options de navigation juste avant que le composant soit rendu.
// Garantit que les options du <header> pour cette page s'appliquent correctement
// navigation.setOptions : Méthode pour définir les options du header directement dans le composant.
//useLayoutEffect + navigation.setOptions permet de centraliser la configuration du header directement dans chaque composant, ce qui peut être plus clair et plus facile à gérer, surtout si les options du header varient beaucoup d'un écran à l'autre.

const CustomHeader = ({
  navigation,
  title,
  textStyle,
  imageStyle,
  useIcon = false,
  clickableIcon,
  iconName = "arrow-left",
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          {useIcon ? (
            <TouchableOpacity
              onPress={clickableIcon}
              style={styles.iconButton}
              activeOpacity={0.8}
            >
              <FontAwesome name={iconName} size={25} />
            </TouchableOpacity>
          ) : imageStyle ? (
            <Image
              style={[styles.headerLogo, imageStyle]}
              source={require("../assets/Logo-RemoteFrenchies.png")}
            />
          ) : null}

          <Text style={[styles.headerTitleText, textStyle]}>{title}</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
      headerLeft: useIcon || imageStyle ? () => null : null,
    });
  }, [
    navigation,
    title,
    textStyle,
    imageStyle,
    clickableIcon,
    useIcon,
    iconName,
  ]);

  return null; // Ce composant n'affiche rien, il configure seulement le header.
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default CustomHeader;
