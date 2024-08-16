import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import CustomParagraph from "../components/CustomParagraph";
import CustomButton from "../components/CustomButton";
import CustomProfile, { CustomCity } from "../components/CustomProfile";
import Icon from "react-native-vector-icons/FontAwesome5";

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
  // Récupére la première URL du tableau des photos (en verifiant d'abord si c'est bien un tableau et si il contient un URL)
const homePhotoUri = Array.isArray(item.propositionData.home_photo) && item.propositionData.home_photo.length > 0
? item.propositionData.home_photo[0] : null;

  //Action click "se rencontrer"
  handleClick = () => {
    console.log("click activé sur bouton Se rencontrer");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("TabNavigator", { screen: "Recherche" })
          }
          activeOpacity={0.8}
        >
          <Icon
            name="arrow-left"
            style={styles.reply}
            size={30}
            color="#000000"
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.profileContainer}>
          <CustomProfile
            profile_picture={item.userData.profile_picture} 
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
        <View>
        <Image style={styles.photoCountainer} source={{ uri: homePhotoUri }} /> 
          <CustomCity
            style={styles.remoterCityStyle}
            city={item.propositionData.main_address.city}
          />
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
          onPress={() => navigation.navigate("TchatScreen", { item })} //MODIF K
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
  },

  icon: {
    marginTop: 60,
    width: "100%",
    paddingLeft: 20,
  },

  scrollView: {
    padding: 50,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },

  profileContainer: {
    width: 280,
    height: 80,
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

  remoterCityStyle: {
    fontSize: 18,
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
    borderColor: "black",
    borderWidth: 1,
    width: 280,
    marginTop: 20,
  },

  photoCountainer: {
    width: 300,
    height: 178, // à enlever car s'adaptera en fonction des infos reçues
    backgroundColor: "#DDDDDD",
    marginTop: 20,
    borderRadius: 20,
  },
});
