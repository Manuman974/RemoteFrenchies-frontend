import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector, } from "react-redux";
import { addPhotoProfile, logout } from "../reducers/user";
import CustomProfilButton from "../components/CustomProfilButton";
import CustomHeader from "../components/CustomHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    console.log("User data:", user);
    const dispatch = useDispatch();

        // Fonction pour charger la photo de profil depuis AsyncStorage
        const loadProfilePicture = async () => {
            const profilePicture = await AsyncStorage.getItem("profile_picture");
            if (profilePicture) {
                dispatch(addPhotoProfile(profilePicture)); // Met à jour l'état Redux
            }
        };
    
        useEffect(() => {
            loadProfilePicture(); // Charge la photo de profil lorsque le composant est monté
        }, []);

    const openCameraAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert(
                "Autorisez-vous Remote frenchies à accéder à votre appareil photo"
            );
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // Si l'utilisateur n'a pas annulé la prise de photo
        if (!result.canceled) {
            // Préparer les données pour l'envoi
            const formData = new FormData();
            formData.append("photoFromFront", {
                uri: result.assets[0].uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });
            //MES MODIFS
            formData.append("Token", user.token);

            // Envoi de la photo au serveur
            fetch("http://192.168.154.186:3000/profile", {
                method: "PUT",
                body: formData,
            })
                .then((response) => response.json())
                .then(async(data) => {
                    console.log(data)
                    if (data && data.result) {
                        // Ajouter au magasin Redux si le téléchargement a réussi
                        dispatch(addPhotoProfile(data.url));
// Persister la photo dans AsyncStorage
await AsyncStorage.setItem("profile_picture", data.url);
} else {
    console.error("Échec du téléchargement de la photo");
}
})
.catch((error) => console.error("Erreur de fetch :", error));
}
};

    const handlelogout = () => {
        dispatch(logout());
        console.log("test")
        navigation.navigate("Home");
    }

    return (
            <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <CustomHeader
                    title="Profil"
                    icon="user-o"
                    showLogoutButton={true} // Affiche le bouton logout sur cette page
                    onLogoutPress={handlelogout} // Fonction à appeler lors de l'appui
                />
            </View>
                    <View style={styles.profilContainer}>
                        {user.profile_picture ? (
                            <Image
                                source={{ uri: user.profile_picture }}
                                style={styles.profilImage}
                            />
                        ) : (
                            <Icon
                                name="user"
                                style={styles.profilIcon}
                                size={80}
                                color="#49B48C"
                            />
                        )}
                        <Text style={styles.h2}>
                            {" "}
                            {user.firstname} {user.lastname}
                        </Text>
                        <Text style={styles.h3}> {user.job} </Text>
                        <TouchableOpacity style={styles.modifyProfil}>
                            <Text style={styles.body2}> Modifier mon profil</Text>
                            <Icon
                                name="pencil"
                                style={styles.reply}
                                size={20}
                                color="#49B48C"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={openCameraAsync}
                            style={styles.modifyProfil}
                        >
                            <Text style={styles.body2}> Modifier ma photo</Text>
                            <Icon
                                name="pencil"
                                style={styles.reply}
                                size={20}
                                color="#49B48C"
                            />
                        </TouchableOpacity>

                        <View>
                            <CustomProfilButton
                                onPress={() => navigation.navigate("AnnouncementScreen")}
                                title="Mes annonces"
                            ></CustomProfilButton>
                            <CustomProfilButton title="Mon historique de rencontre"></CustomProfilButton>
                            <CustomProfilButton title="Paramètres et sécurité"></CustomProfilButton>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center", // Centre les éléments verticalement
        justifyContent: "space-between", // Espace entre CustomHeader et Logout
        width: "100%",
    },

    logoutButton: {
        width: 100,
        height: 40,
        backgroundColor: "#49B48C",
        padding: 10,
        borderRadius: 40,
        justifyContent: 'center', // Centre le texte dans le bouton
        alignItems: 'center', // Centre le texte dans le bouton
    },
    logoutText: {
        color: "#fff",
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        textAlign: 'center'
    },
    header: {
        marginTop: 5,
        marginLeft: 30,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
    },

    h1: {
        marginLeft: 10,
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
        alignSelf: "center",
    },

    separator: {
        width: "80%",
        height: 2,
        backgroundColor: "#8f8f8f",
        marginVertical: 20,
        alignSelf: "center",
    },

    profilIcon: {
        marginTop: 50,
        backgroundColor: "#DDDDDD",
        width: 150,
        height: 150,
        padding: 30,
        paddingHorizontal: 45,
        alignSelf: "center",
        borderRadius: 100,
    },

    profilImage: {
        marginTop: 50,
        //backgroundColor: '#DDDDDD',
        width: 150,
        height: 150,
        padding: 30,
        paddingHorizontal: 45,
        alignSelf: "center",
        borderRadius: 100,
    },

    profilContainer: {
        alignSelf: "center",
        justifyContent: "center",
        width: "80%",
    },

    buttonContainer: {},

    h2: {
        marginTop: 10,
        alignSelf: "center",
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },

    h3: {
        alignSelf: "center",
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        marginBottom: 10,
    },

    body2: {
        alignSelf: "center",
        fontSize: 12,
        fontFamily: "Poppins-Regular",
    },

    modifyProfil: {
        width: "60%",
        alignSelf: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,

    },
});
