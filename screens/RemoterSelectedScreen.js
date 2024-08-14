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
import CustomProfile, { CustomCity } from "../components/CustomProfile";

export default function RemoterSelectedScreen({
  navigation,
  route: {
    params: { item },
  },
}) {
  console.log("ITEM: ", item);

  // Condition pour les bulletPoints des avantages
  const remoterAdvantages = [];
  if (item.propositionData.fiber_connection) {
    remoterAdvantages.push({ bulletText: "Fibre optique" });
  }
  if (item.propositionData.coffee_tea) {
    remoterAdvantages.push({ bulletText: "Café/Thé " });
  }
  if (item.propositionData.dedicated_office) {
    remoterAdvantages.push({ bulletText: "Bureau dédié" });
  }
  if (item.propositionData.other) {
    remoterAdvantages.push({ bulletText: item.propositionData.other });
  }

  //Action click "se rencontrer"
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
        <View style={styles.profileContainer}>
          <CustomProfile
            firstname={item.userData.firstname}
            lastname={item.userData.lastname}
            showCity={false}
            showButton={false}
            job={item.userData.job}
            remoterProfileStyle={styles.remoterProfileStyle}
            photoStyle={styles.photoStyle}
            remoterNameAndJobContainerStyle={
              styles.remoterNameAndJobContainerStyle
            }
            remoterFirstnameStyle={styles.remoterFirstnameStyle}
            remoterLastnameStyle={styles.remoterLastnameStyle}
            remoterJobStyle={styles.remoterJobStyle}
          />
        </View>
        <View style={styles.line}></View>
        <View style={styles.adCountainer}>
          <Image style></Image>
          <CustomCity city={item.propositionData.main_address.city} />
        </View>
        <View style={styles.descriptionsContainer}>
          <CustomParagraph
            title="Descriptif"
            paragraphText={item.propositionData.description}
          />
          <CustomParagraph
            title="Disponibilités"
            bulletPoints={[
              {
                bulletText: "Jour : ",
                detailsText: item.propositionData.welcome_day || "Non spécifié",
              },
              {
                bulletText: "Horaires : ",
                detailsText:
                  item.propositionData.reception_hours || "Non spécifié",
              },
            ]}
          />
          <CustomParagraph title="Avantages" bulletPoints={remoterAdvantages} />
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
    borderColor: "green",
    borderWidth: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  remoterProfileStyle: {
    flexDirection: "row",
    height: 80,
    width: 280,
  },

  photoStyle: {
    marginLeft: 5,
  },

  remoterNameAndJobContainerStyle: {
    marginLeft: 5,
  },

  remoterFirstnameStyle: {
    fontSize: 18,
    lineHeight: 27,
  },

  remoterLastnameStyle: {
    fontSize: 18,
    lineHeight: 27,
  },

  remoterJobStyle: {
    fontSize: 18,
    lineHeight: 27,
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
