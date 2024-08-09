import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomParagraph from "../components/CustomParagraph";

export default function RemoterSelectedScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader navigation={navigation} title="" useIcon="true" />
      <View style={styles.profileContainer}></View>
      <View style={styles.line}></View>
      <View style={styles.adCountainer}>
        <Image style></Image>
        <Text></Text>
      </View>
      <View style={styles.descriptionsContainer}>
        <CustomParagraph />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "purple",
    borderWidth: 2,
  },
  profileContainer: {
    width: 280,
    height: 80,
    borderColor: "yellow",
    borderWidth: 2,
  },

  line: {
    borderColor: "red",
    borderWidth: 1,
    width: 280,
    marginTop: 30,
  },

  adCountainer: {
    width: 280,
    height: 178, // à enlever car s'adaptera en fonction des infos reçues
    borderColor: "green",
    borderWidth: 2,
  },
});
