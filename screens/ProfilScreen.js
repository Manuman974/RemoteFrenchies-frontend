import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
                    <View>
                        <CustomProfilButton
                            icon="pencil-alt"
                            onPress={() => navigation.navigate("ModifyProfilScreen")}
                            title="Modifier mon  profil"
                            style={{ borderTopWidth: 1, marginTop: 30 }}
                        />
                        <CustomProfilButton
                            icon="hand-paper"
                            onPress={() => navigation.navigate("AnnouncementScreen")}
                            title="Mes annonces"
                        />
                        <CustomProfilButton
                            icon="cog"
                            title="Paramètres et sécurité"
                        />
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
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },

    logoutButton: {
        width: 100,
        height: 40,
        backgroundColor: "#49B48C",
        padding: 10,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    logoutText: {
        color: "#fff",
        fontFamily: "Poppins-SemiBold",
        fontSize: 14,
        textAlign: 'center'
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
        marginBottom: 40,
    },

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

});
