import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import CustomParagraph from "../components/CustomParagraph";
import CustomButton from "../components/CustomButton";

export default function RemoterSelectedScreen({ navigation }) {
  //Ajout action click sur le bouton
  handleClick = () => {
    console.log("click activé sur bouton Se rencontrer");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader
        navigation={navigation}
        title=""
        useIcon={false}
        clickableIcon={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileContainer}></View>
        <View style={styles.line}></View>
        <View style={styles.adCountainer}>
          <Image style></Image>
          <Text></Text>
        </View>
        <View style={styles.descriptionsContainer}>
          <CustomParagraph
            title="Descriptif"
            paragraphText="Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus."
          />
          <CustomParagraph
            title="Disponibilités"
            bulletPoints={[
              { bulletText: "Jour", detailsText: "Lundi - Mardi - Mercredi" },
              { bulletText: "Horaires", detailsText: "9h-12h" },
            ]}
          />
          <CustomParagraph
            title="Avantages"
            bulletPoints={[
              { bulletText: "iscing elit. Etiam eu turpis molestie." },
              { bulletText: "iscing elit. Etiam eu turpis molestie." },
              { bulletText: "iscing elit. Etiam eu turpis molestie." },
            ]}
          />
        </View>
        <CustomButton
          title="Se rencontrer"
          style={{ marginTop: 40 }}
          onPress={() => navigation.navigate("Chat")}
        />
      </ScrollView>
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

  scrollView: {
    padding: 50,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 3,
    paddingTop: 30,
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
    marginTop: 20,
  },

  adCountainer: {
    width: 280,
    height: 178, // à enlever car s'adaptera en fonction des infos reçues
    borderColor: "green",
    borderWidth: 2,
    marginTop: 20,
  },
});
