import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../components/CustomHeader";
import CustomTabBar from '../components/CustomTabBar';
import { useNavigation } from '@react-navigation/native';
//import Icon1 from "react-native-vector-icons/Evillcons";

export default function AnnouncementScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const [announcements, setAnnouncements] = useState([]);


    // Fonction pour charger les annonces depuis AsyncStorage
    const loadAnnouncements = async () => {
        try {
            const response = await fetch(`http://192.168.154.186:3000/proposition/${user.token}`);
            const data = await response.json();

            if (data.result) {
                setAnnouncements(data.propositionData);

                // Mettre à jour AsyncStorage
                await AsyncStorage.setItem('announcements', JSON.stringify(data.propositionData));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des annonces :", error);
        }
    };

    useEffect(() => {
        loadAnnouncements(); // Appel de la fonction pour charger les annonces lors du chargement du composant
    }, []);

    // Affichage des annonces sous forme de photo
    const photos = announcements.map((announcement, index) => {
        // Vérifie si home_photo contient des images
        const photoUrl = announcement.home_photo.length > 0 ? announcement.home_photo[0] : 'defaultImageUrl'; // Remplace 'defaultImageUrl' par une URL par défaut si aucune image n'est présente.


        // SUppirmer une annonce //
        const handleDelete = async (announcementId) => {
            try {
                const response = await fetch(`http://192.168.154.186:3000/proposition/${announcementId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`, // Ajouter le token si nécessaire
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (data.result) {
                    // Supprimer l'annonce de l'état local
                    setAnnouncements((prev) => {
                        const updatedAnnouncements = prev.filter((item) => item._id !== announcementId);

                        // Mettre à jour AsyncStorage
                        AsyncStorage.setItem('announcements', JSON.stringify(updatedAnnouncements));

                        return updatedAnnouncements;
                    });
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Erreur lors de la suppression de l'annonce :", error.message);
            }
        };
        const handleNavigate = (announcement) => {
            console.log("Naviguer avec item : ", announcement);
            navigation.navigate("RemoterSelectedScreen", { item: announcement });
        };

        return (
            <View key={index} style={styles.annonceContainer}>
                <Image source={{ uri: photoUrl }} style={styles.photo} />
                <View style={styles.annonceFooter}>
                    <Text style={styles.locationText}>
                        <Icon name="map-marker" size={16} color="black" /> {announcement.main_address.city}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => handleNavigate(announcement)}
                            style={styles.modifyButton}
                        >
                            <Text style={styles.modifyButtonText}>Voir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(item)}>
                            <Icon name="trash-o" size={24} color="#FF6F61" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    });
    return (
        <View style={styles.container}>
            <View>
                <CustomHeader
                    title="Mes Annonces"
                    icon="arrow-left"
                    onPress={() => navigation.goBack()}
                />
            </View>
            <Text style={styles.annonceCount}>{photos.length} annonces</Text>
            <ScrollView>
                {photos}
            </ScrollView>
            <CustomTabBar navigation={navigation} />
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 60,
        marginRight: 90,
    },
    headerTitle: {
        fontSize: 24,
        // fontWeight: 400,
        marginLeft: 16,
    },
    separator: {
        width: '80%',
        height: 2,
        backgroundColor: '#8f8f8f',
        marginVertical: 20,
        alignSelf: 'center',
    },
    annonceCount: {
        textAlign: 'right',
        marginTop: 30,
        marginBottom: 10,
        marginLeft: 180,
        fontSize: 16,
        color: 'black',
    },
    annonceContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    annonceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    locationText: {
        fontSize: 16,
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modifyButton: {
        backgroundColor: '#49B48C',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 40,
        marginRight: 10,
    },
    modifyButtonText: {
        color: '#FFF',
        fontFamily: "Poppins-Regular",
        fontSize: 12,
    },
})