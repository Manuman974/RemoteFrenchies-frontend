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
          <Text style={styles.headerTitleText}>Rechercher</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "white",
      },
    });
  }, [navigation]);

  //SECTION MAP

  // = > INITIALISATION DES ETATS
  const BACKEND_ADDRESS = "http://192.168.8.42:3000";
  const [currentPosition, setCurrentPosition] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [markers, setMarkers] = useState([]);

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
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        });
      }
    })();
  }, []);

  const handleSearch = () => {
    if (cityInput.length === 0) {
      return;
    }
    console.log("Icône cliquée!");
    //1ère requête : Rechercher les données des utilisateurs d'une ville
    fetch(`${BACKEND_ADDRESS}/users/search/${cityInput}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          // Nettoyer les noms de ville pour enlever les accolades
          const cities = data.userCity.map((data) =>
            data.main_address.city.replace(/[\{\}]/g, "").trim()
          );
          console.log("CITIES : ", cities);

          setCityInput("");

          //2ème requête : Rechercher les coordonnées géo de la ville
          // A modifier après modification du back côté signup
          //   const markersData = cities.map((city) => {
          //     fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
          //       .then((response) => response.json())
          //       .then((data) => {
          //         // Aucune action n'est réalisée si aucune ville trouvée par l'API
          //         if (data.features.length === 0) {
          //           return;
          //         }
          //         const cityData = {
          //           latitude: data.features[0].geometry.coordinates[1],
          //           longitude: data.features[0].geometry.coordinates[0],
          //         };

          //         let tableau = [...cityData];
          //         // tableau.push(cityData);
          //         console.log("TABLEAU: ", tableau);

          //         console.log("INFOS FETCH API :", cityData);

          // return cityData;

          // return setMarkers({
          //   latitude: cityData.latitude,
          //   longitude: cityData.longitude,
          // });
          //       });
          //   });
          //   console.log("MARKERSDATA : ", markersData);
          //   setMarkers(markers.push(markersData));
          //   console.log("MARKERS : ", markers);
        }
      });
  };

  //   const renderMarkers = () => {
  //     return markers.map((marker, i) => (
  //       <Marker
  //         key={i}
  //         coordinate={{
  //           latitude: marker.latitude,
  //           longitude: marker.longitude,
  //         }}
  //         title={cityInput}
  //         pinColor="green"
  //       />
  //     ));
  //   };

  //SECTION REMOTERS

  //Données Remoters en dur et les afficher style ScrollView avec Flatlist :
  const dataRemoter = [
    {
      id: "1",
      image: require("../assets/photoJerome.png"),
      remoterName: "Remy Gaillard",
      remoterJob: "Développeur web",
      remoterCity: "Lyon 8",
    },
    {
      id: "2",
      image: require("../assets/photoJerome.png"),
      remoterName: "Remy Gaillard",
      remoterJob: "Développeur web",
      remoterCity: "Lyon 8",
    },
    {
      id: "3",
      image: require("../assets/photoJerome.png"),
      remoterName: "Remy Gaillard",
      remoterJob: "Développeur web",
      remoterCity: "Lyon 8",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.remoterProfile}>
      <Image source={item.image} style={styles.photoRemoter} />
      <Text style={styles.remoterName}>{item.remoterName}</Text>
      <Text style={styles.remoterJob}>{item.remoterJob}</Text>
      <View style={styles.remoterCityContainer}>
        <FontAwesome name="map-marker" style={styles.icon} size={18} />

        <Text style={styles.remoterCity}>{item.remoterCity}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("RemoterSelected")}
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
            {/* {markers} */}
          </MapView>
        </View>
        <View style={styles.profilesContainer}>
          <FlatList
            data={dataRemoter}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
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
    borderColor: "red",
    borderWidth: 3,
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
    marginTop: 10,
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

  remoterName: {
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
    width: 65,
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
