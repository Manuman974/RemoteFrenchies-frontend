import { useEffect, useState } from "react";
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
    ActivityIndicator
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import CustomHeader from "../components/CustomHeader";
import { API_URL } from '@env';

export default function RechercheScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);
  const [cityInput, setCityInput] = useState("");
  const [addressesCoordinates, setAddressesCoordinates] = useState([]);
  const [remoterProfiles, setRemoterProfiles] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync();
            const status = result?.status;

            if (status === "granted") {
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                setCurrentPosition({
                    latitude,
                    longitude,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                });
            }
        })();
    }, []);

  // Fonction pour récupérer les villes depuis l'API
  const handleCityInputChange = async (input) => {
    setCityInput(input);

    if (input.length > 2) { // Ne lancer la recherche que si l'utilisateur tape au moins 3 caractères
      setLoading(true);
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${input}&limit=5&type=municipality`
        );
        const data = await response.json();

        const citySuggestions = data.features.map((feature) => ({
          name: feature.properties.city, // nom de la ville
          postcode: feature.properties.postcode, // code postal
          id: feature.properties.id, // id unique pour chaque ville
        }));

        setFilteredCities(citySuggestions);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des suggestions :", error);
      }
      setLoading(false);
    } else {
      setFilteredCities([]);
      setShowSuggestions(false);
    }
  };

  // Gérer la sélection d'une ville dans la liste de suggestions
  const handleCitySelect = (city) => {
    setCityInput(`${city.name} (${city.postcode})`); // Afficher la ville et le code postal
    setShowSuggestions(false); // Masquer les suggestions après sélection
    handleSearch(city.name); // Appeler handleSearch avec le nom de la ville sélectionnée
  };

  // Gérer la soumission de la recherche (via le clavier "Enter")
  const handleSearchSubmit = () => {
    console.log("Recherche validée pour :", cityInput);
  };


    //Recherche par ville des utilisateurs proposant leur annonce
        // message d'erreur si aucune ville de noté
        const handleSearch = (cityName) => {
            if (!cityName) {
                setErrorMessage("Veuillez entrer un nom de ville.");
                return;
        }
        //1ère requête : Rechercher les données des utilisateurs d'une ville
        fetch(`${API_URL}/proposition/search/${cityInput}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("PROPOSITIONS data :", data.propositionData);
                if (data.result === true) {
                    // coordonnées des utilisateurs sont extraites de la réponse du serveur et stockées dans l'état addressesCoordinates
                    const coordinates = data.propositionData.map((user) => {
                        return {
                            latitude: user.main_address.addressLatitude,
                            longitude: user.main_address.addressLongitude,
                            firstname: user.user.firstname,
                            lastname: user.user.lastname,
                        };
                    });
                    console.log("ADDRESS COORDINATES :", coordinates);

                    //Récupération des données des propositions et des users
                    const remoters = data.propositionData.map((data, i) => {
                        return {
                            id: i,
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
// les coordonnées des remoters sont stockées (adressesCoordinates), Utilisation du composant Marker pour créer et afficher les markers sur la map
    const remoteMarkers = addressesCoordinates.map((remoter, i) => { // methode .map pour parcourir le tableau adresseCoordinates et créer un marker pour chaque remoter
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

    //Cette fonction va de pair avec le composant <Flatlist> (qui permet de swiper vers la gauche)
    // Elle permet de récupérer les propriétés et les utiliser dans le composant.
    const renderItem = ({ item }) => (
        <View style={styles.remoterProfile}>
            <Image source={{ uri: item.userData.profile_picture }} style={styles.photoRemoter} />
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
                onPress={() => navigation.navigate("RemoterSelectedScreen", { item })}
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
            <View>
                <CustomHeader
                title= "Recherche"
                icon="search"
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.inputContainer}>
                <FontAwesome name="search" size={23} color="#000000" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Recherche ton Remoter"
                        onChangeText={handleCityInputChange}
                        value={cityInput}
                        onSubmitEditing={handleSearchSubmit}
                    />
                </View>

                {loading && <ActivityIndicator size="small" color="#0000ff" />}

                {showSuggestions && (
                <View style={styles.suggestionsContainer}>
                    <FlatList
                        data={filteredCities}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleCitySelect(item)} style={styles.suggestionItem}>
                                <Text>{`${item.name} (${item.postcode})`}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

                {errorMessage ? (
                    <Text style={{ color: "red", margin: 10 }}>{errorMessage}</Text>
                ) : null}
                <View style={styles.mapContainer}>
                    <MapView
                        mapType="standard"
                        region={currentPosition}
                        style={styles.map}
                        MapView toolbarEnabled={false}

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
    },

    scrollView: {
        paddingTop: 20,
        paddingBottom: 20,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#8F8F8F',
        borderRadius: 10,
        backgroundColor: '#E7E7E7',
        paddingLeft: 10,
        marginLeft: 22,
        marginRight: 22,
        width: '80%',
    },

    searchIcon: {
        padding: 10,
      },

    input: {
        flex: 1,
        height: 50,
        paddingLeft: 10,
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        textAlignVertical: "center",
    },

    suggestionsContainer: {
        position: 'absolute',
        top: 70,
        width: "80%",
        backgroundColor: 'white',
        borderRadius: 0,
        elevation: 5,
        zIndex: 10,
      },
      suggestionItem: {
        padding: 10,
        borderBottomColor: "#ccc",

      },

    mapContainer: {
        width: "80%",
        height: 320,
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
        fontFamily: "Poppins-Regular",
        fontSize: 10,
        
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

    h4: {
        width: 300,
        alignSelf: "center",
        fontSize: 14,
        fontFamily: "Poppins-SemiBold",
        textAlign: "center",
        marginBottom: 10,
    },
});
