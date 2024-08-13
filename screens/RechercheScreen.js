import { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

export default function RechercheScreen({ navigation }) {
  //SECTION HEADER

  //useLayoutEffect : hook pour configurer les options de navigation juste avant que le composant soit rendu.
  // Garantit que les options du <header> pour cette page s'appliquent correctement
  // navigation.setOptions : Méthode pour définir les options du header directement dans le composant.
  //useLayoutEffect + navigation.setOptions permet de centraliser la configuration du header directement dans chaque composant, ce qui peut être plus clair et plus facile à gérer, surtout si les options du header varient beaucoup d'un écran à l'autre.

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerTitleContainer}>
          <Image
            style={styles.headerLogo}
            source={require("../assets/Logo-RemoteFrenchies.png")}
          />
          <Text style={styles.headerTitleText}>Recherche</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
    });
  }, [navigation]);

  //SECTION MAP ET AFFICHAGE REMOTERS SUR CARTE

  // = > INITIALISATION DES ETATS
  const BACKEND_ADDRESS = "http://192.168.8.42:3000";
  const [currentPosition, setCurrentPosition] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [addressesCoordinates, setAddressesCoordinates] = useState([]);
  const [remoterProfiles, setRemoterProfiles] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // = > ACTIONS

  useEffect(() => {
    (async () => {
      const result = await Location.requestForegroundPermissionsAsync();
      const status = result?.status;

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // Pour zoomer automatiquement sur la carte
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          });
        });
      }
    })();
  }, []);

  //Recherche par ville des utilisateurs proposant leur annonce
  const handleSearch = () => {
    if (cityInput.length === 0) {
      setErrorMessage("Veuillez entrer un nom de ville.");
      return;
    }
    console.log("Icône cliquée!");
    //1ère requête : Rechercher les données des utilisateurs d'une ville
    fetch(`${BACKEND_ADDRESS}/proposition/search/${cityInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("PROPOSITIONS data :", data.propositionData);
        if (data.result === true) {
          const coordinates = data.propositionData.map((user) => {
            return {
              latitude: user.main_address.addressLatitude,
              longitude: user.main_address.adressLongitude,
            };
          });
          console.log("ADDRESS COORDINATES :", coordinates);
          const remoters = data.propositionData.map((user, i) => {
            return {
              id: i,
              // firstname: user.user.firstname,
              // lastname: user.user.lastname,
              // job: user.user.job,
              // city: user.main_address.city,
              // latitude: user.main_address.addressLatitude,
              // longitude: user.main_address.adressLongitude,
              proposition: user,
              user: user.user,
            };
          });

          // Déplacer la carte vers la première coordonnée trouvée
          if (coordinates.length > 0) {
            setCurrentPosition({
              latitude: coordinates[0].latitude,
              longitude: coordinates[0].longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            });
          }

          setAddressesCoordinates(coordinates);
          console.log("REMOTERS PROFILES", remoters);
          setRemoterProfiles(remoters);
          setErrorMessage("");
          setSearchDone(true);
        } else {
          setAddressesCoordinates([]);
          setRemoterProfiles([]);
          setErrorMessage("");
          setSearchDone(true);
        }
      });
  };

  const remoteMarkers = addressesCoordinates.map((remoter, i) => {
    return (
      <Marker
        key={i}
        coordinate={{
          latitude: remoter.latitude,
          longitude: remoter.longitude,
        }}
        title={`${remoter.firstname} ${remoter.lastname}`}
        pinColor="#49B48C"
      />
    );
  });

  //SECTION REMOTERS PROFILES

  //Cette fonction va de pair avec le composant <Flatlist> (qui permet de swiper vers la gauche)
  // Elle permet de récupérer les propriétés et les utiliser dans le composant.
  const renderItem = ({ item }) => (
    <View style={styles.remoterProfile}>
      <Image
        source={require("../assets/photoJerome.png")}
        style={styles.photoRemoter}
      />
      <View style={styles.remoterNameContainer}>
        <Text style={styles.remoterFirstname}>{item.user.firstname}</Text>
        <Text style={styles.remoterLastname}>{item.user.lastname}</Text>
      </View>

      <Text style={styles.remoterJob}>{item.user.job}</Text>
      <View style={styles.remoterCityContainer}>
        <FontAwesome name="map-marker" style={styles.icon} size={18} />

        <Text style={styles.remoterCity}>
          {item.proposition.main_address.city}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("RemoterSelected", { item })}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Voir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <CustomHeader
        title="Recherche"
        navigation={navigation}
        iconName={"arrow-left"}
      /> */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Autour de moi"
            onChangeText={(value) => setCityInput(value)}
            value={cityInput}
          />
          <TouchableOpacity
            style={styles.iconInput}
            onPress={() => handleSearch()}
          >
            <FontAwesome name="search" size={23} color="#c0c1c1" />
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <Text style={{ color: "red", margin: 10 }}>{errorMessage}</Text>
        ) : null}
        <View style={styles.mapContainer}>
          <MapView
            mapType="terrain"
            region={currentPosition}
            style={styles.map}
          >
            {currentPosition && (
              <Marker
                coordinate={currentPosition}
                title="My position"
                pinColor="#F08372"
              />
            )}
            {remoteMarkers}
          </MapView>
        </View>
        <View style={styles.profilesContainer}>
          {searchDone && remoterProfiles.length > 0 ? (
            <FlatList
              data={remoterProfiles}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          ) : (
            searchDone && (
              <>
                <Text style={styles.noRemoterMessage}>
                  😅 Oups ! Nous n'avons pas encore de Remoters dans cette
                  ville.
                </Text>
                <Text style={styles.noRemoterMessage}>
                  Essayez une autre ville !
                </Text>
              </>
            )
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    // alignItems: "center",
    // justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 3,
  },

  scrollView: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "green",
    borderWidth: 3,
  },

  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
  },

  headerLogo: {
    width: 51,
    height: 46,
    marginRight: 10,
  },

  headerTitleText: {
    color: "black",
    fontSize: 20,
    fontFamily: "poppins",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 36,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "orange",
    borderWidth: 3,
  },

  input: {
    width: 280,
    height: 50,
    borderRadius: 10,
    borderColor: "#8F8F8F",
    borderWidth: 1,
    backgroundColor: "#DDDDDD",
    paddingLeft: 20,
    marginLeft: 22,
  },

  iconInput: {
    marginLeft: 5,
  },

  mapContainer: {
    width: 290,
    height: 290,
    borderColor: "pink",
    borderWidth: 3,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
  },

  map: {
    flex: 1,
  },

  profilesContainer: {
    borderColor: "green",
    borderWidth: 3,
    width: 291,

    marginTop: 20,
  },

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
  noRemoterMessage: {
    fontFamily: "poppins",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 8,
  },
});
