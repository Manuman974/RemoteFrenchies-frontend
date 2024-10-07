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
import CustomHeader from "../components/CustomHeader";
import CustomTabBar from '../components/CustomTabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

export default function RemoterSelectedScreen({ navigation, route }) {
  const { item } = route.params; // Accès correct à item

  console.log("Item reçu:", item); // Affiche l'objet item
  console.log("Proposition Data:", item?.propositionData); // Affiche propositionData

  // Condition pour les bulletPoints des avantages
  const remoterAdvantages = [];
  if (item.propositionData) { // Vérifiez si propositionData est défini
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
}
// Vérifiez si home_photo est défini avant d'y accéder
const homePhotoUri = 
  item.propositionData.home_photo && 
  Array.isArray(item.propositionData.home_photo) && 
  item.propositionData.home_photo.length > 0 
    ? item.propositionData.home_photo[0] 
    : null;



  //Action click "se rencontrer"
  const userToken = useSelector((state) => state.user.value.token);
  const handleMeeting = async () => {
    if (item.userData && item.userData._id) {
      console.log("ID de l'utilisateur à contacter:", item.userData._id);
      try {
        if (!userToken) {
          throw new Error('Token d\'authentification non trouvé');
        }

        const response = await fetch(`http://192.168.154.186:3000/discussions/create/${item.userData._id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token: userToken })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la création de la discussion');
        }

        const data = await response.json();
        console.log('Réponse de la création/récupération de la discussion:', data);
        
        if (data.result && data.discussionId) {
          navigation.navigate("TchatScreen", { 
            otherUserId: item.userData._id,
            discussionId: data.discussionId,
            otherUser: {
              username: item.userData.firstname, // ou utilisez une autre propriété appropriée
              // Ajoutez d'autres propriétés utiles ici
            }
          });
        } else {
          throw new Error('ID de discussion non reçu');
        }
      } catch (error) {
        console.error('Erreur lors de la création/récupération de la discussion:', error.message);
        Alert.alert("Erreur", "Impossible de créer une discussion pour le moment. Veuillez réessayer.");
      }
    } else {
      console.error("L'ID de l'utilisateur n'est pas disponible", item.userData);
      Alert.alert("Erreur", "Impossible de contacter cet utilisateur pour le moment.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
        <CustomHeader
          title="Annonce"
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
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
          onPress={handleMeeting}
        />
 
      </ScrollView>
      <CustomTabBar navigation={navigation} />
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
