import { useEffect, useState, useLayoutEffect } from "react";
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
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RechercheScreen({ navigation }) {
  //SECTION HEADER

  //useLayoutEffect : hook pour configurer les options de navigation juste avant que le composant soit rendu.
  // Garantit que les options du <header> pour cette page s'appliquent correctement
  // navigation.setOptions : Méthode pour définir les options du header directement dans le composant.
  //useLayoutEffect + navigation.setOptions permet de centraliser la configuration du header directement dans chaque composant, ce qui peut être plus clair et plus facile à gérer, surtout si les options du header varient beaucoup d'un écran à l'autre.


  //SECTION MAP ET AFFICHAGE REMOTERS SUR CARTE

  // = > INITIALISATION DES ETATS
  const BACKEND_ADDRESS = "http://192.168.1.79:3000";
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
              firstname: user.user.firstname,
              lastname: user.user.lastname,
            };
          });
          console.log("ADDRESS COORDINATES :", coordinates);
          const remoters = data.propositionData.map((data, i) => {
            return {
              id: i,
              // firstname: user.user.firstname,
              // lastname: user.user.lastname,
              // job: user.user.job,
              // city: user.main_address.city,
              // latitude: user.main_address.addressLatitude,
              // longitude: user.main_address.adressLongitude,
              propositionData: data,
              userData: data.user,
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
    pinColor="#F08372"
  />
);
});
  
  // SECTION REMOTERS PROFILES

  //Cette fonction va de pair avec le composant <Flatlist> (qui permet de swiper vers la gauche)
  // Elle permet de récupérer les propriétés et les utiliser dans le composant.
  const renderItem = ({ item }) => (
    <View style={styles.remoterProfile}>
    <Image source={require("../assets/photoJerome.png")} style={styles.photoRemoter} />
      {/* <Image source={{ uri: user.photoProfile }} style={styles.photoRemoter} /> */}
      <View style={styles.remoterNameContainer}>
        <Text style={styles.remoterFirstname}>{item.userData.firstname}</Text>
        <Text style={styles.remoterLastname}>{item.userData.lastname}</Text>
      </View>

      <Text style={styles.remoterJob}>{item.userData.job}</Text>
      <View style={styles.remoterCityContainer}>
        <FontAwesome name="map-marker" style={styles.icon} size={18} />

        <Text style={styles.remoterCity}>
          {item.propositionData.main_address.city}
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
        <View style={styles.header}>
            <Icon name='search' style={styles.reply} size={30} color='#49B48C' />
            <Text style={styles.h1}>Recherche</Text>
        </View>
        <View style={styles.separator}></View>
        <ScrollView contentContainerStyle={styles.scrollView}>
        <View>
            <Text style={styles.h4}>Trouve le Remoter qui te ressemble à côté de chez toi</Text>
        </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Recherche par ville"
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
                    mapType="standard"
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
    </KeyboardAvoidingView >
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

    header: {
        marginTop: 60,
        marginLeft: 30,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    h1: {
        marginLeft: 10,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
    },

    customHeader: {
        marginTop: 300,
        backgroundColor: 'red',
    },
    scrollView: {
        paddingBottom: 20,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },

  separator: {
    width: "80%",
    height: 2,
    backgroundColor: "#8f8f8f",
    marginVertical: 20,
    alignSelf: "center",
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
        width: '80%',
        height: 270,
        borderRadius: 20,
        overflow: "hidden",
        marginTop: 20,
    },

  map: {
    flex: 1,
  },

  profilesContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },

  remoterProfile: {
    width: 180,
    height: 210,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },

  photoRemoter: {
    width: 80,
    height: 80,
    borderRadius: 150,
    marginBottom: 10,
    alignSelf: "center",
  },

  remoterNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  remoterFirstname: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 21,
    marginRight: 5,
    alignSelf: "center",
  },

  remoterLastname: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 21,
  },

  remoterJob: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 0,
    alignSelf: "center",
  },

  remoterCityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    height: 21,
    marginBottom: 10,
  },

  remoterCity: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    lineHeight: 21,
  },

  icon: {
    width: 15,
    height: 17,
  },

  button: {
    width: 103,
    height: 31,
    backgroundColor: "#49B48C",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 5,
  },

  textButton: {
    fontFamily: "Poppins-SemiBold",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 21,
    color: "#FFFFFF",
    alignSelf: "center",
  },
  noRemoterMessage: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: 8,
  },

    h2: {
        width: 250,
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 20,
    },

    h4: {
        width: 300,
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'center',
        marginBottom: 10,
    },
});
