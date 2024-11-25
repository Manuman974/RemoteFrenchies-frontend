import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Alert,
    Image,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import CustomTextInput from "../components/CustomTextInput";
import CustomCheckBox from "../components/CustomCheckbox";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
import { API_URL } from '@env';
import { useDispatch, useSelector } from "react-redux";
import { addPhoto } from "../reducers/user";

const initialCheckboxes = {
    fiber_connection: false,
    coffee_tea: false,
    dedicated_office: false,
};

export default function ProposerScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    const [adresse, setAdresse] = useState("");
    const [city, setCity] = useState("");
    const [jourAccueil, setJourAccueil] = useState("");
    const [heureAccueil, setHeureAccueil] = useState("");
    const [autresAvantages, setAutresAvantages] = useState("");
    const [messageAnnonce, setMessageAnnonce] = useState("");
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
    const [imageUri, setImageUri] = useState(null);

    const handleSubmit = () => {
        // Gérer l'envoi des données
        fetch(`${API_URL}/proposition`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                street: adresse,
                city: city,
                welcome_day: jourAccueil,
                reception_hours: heureAccueil,
                fiber_connection: checkboxes.fiber_connection,
                coffee_tea: checkboxes.coffee_tea,
                dedicated_office: checkboxes.dedicated_office,
                other: autresAvantages,
                description: messageAnnonce,
                token: user.token,
                home_photo: user.photos[0],
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    setAdresse("");
                    setCity("");
                    setJourAccueil("");
                    setHeureAccueil("");
                    setCheckboxes(initialCheckboxes);
                    setAutresAvantages("");
                    setMessageAnnonce("");
                    setImageUri(null);
                    navigation.navigate("PublishScreen");
                }
            });
    };

    // Mise à jour de l'état avec setCkeckboxes
    const toggleCheckbox = (key) => {
        setCheckboxes((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Autorisez-vous Remote frenchies á acceder a vos photos");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Filtre pour les images uniquement
            allowsEditing: true, // Permet de modifier l'image avant de la sélectionner
            aspect: [4, 3], // Définit le rapport d'aspect pour la modification
            quality: 1, // Définit la qualité de l'image (1 pour la qualité maximale)
        });
        // Vérifie si l'utilisateur n'a pas annulé la sélection
        if (!result.canceled) {
            // Mettre à jour l'état de l'URI de l'image
            setImageUri(result.assets[0].uri);

            // Préparer les données pour l'envoi
            const formData = new FormData();
            formData.append("photoFromFront", {
                uri: result.assets[0].uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });

            // Envoi de la photo au serveur
            fetch(`${API_URL}/proposition/upload`, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.result) {
                        // Ajouter au magasin Redux si le téléchargement a réussi
                        dispatch(addPhoto(data.url));
                    } else {
                        Alert.alert("Échec du téléchargement de la photo");
                    }
                });
        }
    };

    const openCameraAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert(
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
            // Mettre à jour l'état de l'URI de l'image
            setImageUri(result.assets[0].uri);

            // Préparer les données pour l'envoi
            const formData = new FormData();
            formData.append("photoFromFront", {
                uri: result.assets[0].uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });

            // Envoi de la photo au serveur
            fetch(`${API_URL}/proposition/upload`, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.result) {
                        // Ajouter au magasin Redux si le téléchargement a réussi
                        dispatch(addPhoto(data.url));
                    } else {
                        Alert.alert("Échec du téléchargement de la photo");
                    }
                });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
            >

                <View>
                    <CustomHeader
                        title="Proposer"
                        icon="hand-paper-o"
                    />
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    style={styles.scrollView}
                >

                    <Text style={styles.sectionTitle1}>
                        Mon lieu de travail
                    </Text>

                    <CustomTextInput
                        placeholder="Adresse"
                        value={adresse}
                        onChangeText={setAdresse}
                    />

                    <CustomTextInput
                        placeholder="Ville"
                        value={city}
                        onChangeText={setCity}
                    />
                    <View style={styles.separator} />
                    <Text style={styles.sectionTitle1}>
                        Mes disponibilités
                    </Text>
                    <CustomTextInput
                        placeholder="Exemple : Lundi 27 Janvier 2024"
                        value={jourAccueil}
                        onChangeText={setJourAccueil}
                    />

                    <CustomTextInput
                        placeholder="Exemple : De 9h à 18h"
                        value={heureAccueil}
                        onChangeText={setHeureAccueil}
                    />
                    <View style={styles.separator} />

                    <View style={styles.checkboxes}>
                        <Text style={styles.sectionTitle2}>Mes avantages</Text>

                        <CustomCheckBox
                            checked={checkboxes.fiber_connection}
                            onPress={() => toggleCheckbox("fiber_connection")}
                            label="Connection Fibre"
                        />

                        <CustomCheckBox
                            checked={checkboxes.coffee_tea}
                            onPress={() => toggleCheckbox("coffee_tea")}
                            label="Café / Thé"
                        />

                        <CustomCheckBox
                            checked={checkboxes.dedicated_office}
                            onPress={() => toggleCheckbox("dedicated_office")}
                            label="Bureau dédié"
                        />
                    </View>
                    <CustomTextInput
                        placeholder="Autres (Vue, matériel...)"
                        value={autresAvantages}
                        onChangeText={setAutresAvantages}
                    />
                    <View style={styles.separator} />

                    <CustomButton
                        title="Choisir une photo"
                        onPress={openImagePickerAsync}
                        style={styles.button}
                        textStyle={styles.textButton}
                    />

                    <CustomButton
                        title="Prendre une photo"
                        onPress={openCameraAsync}
                        style={styles.button}
                        textStyle={styles.textButton}
                    />

                    {imageUri && (
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.imagePreview}
                        />
                    )}

                    <TextInput
                        placeholder="Message de l’annonce"
                        style={styles.input2}
                        onChangeText={(value) => setMessageAnnonce(value)}
                        value={messageAnnonce}
                        multiline={true}
                        onSubmitEditing={handleSubmit}
                        returnKeyType="send"
                        blurOnSubmit={false}
                    />

                    <CustomButton
                        title="Publier"
                        onPress={handleSubmit}
                        style={styles.button}
                        textStyle={styles.textButton}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    scrollView: {
        flex: 1,
        width: "100%",
    },
    scrollViewContent: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    separator: {
        width: "90%",
        height: 1,
        backgroundColor: "#8f8f8f",
        marginVertical: 20,
    },
    sectionTitle1: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 20,
        marginBottom: 10,
        paddingLeft: 30,
    },
    sectionTitle2: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 20,
        marginBottom: 10,
    },
    input2: {
        backgroundColor: "#E7E7E7",
        width: 290,
        height: 150,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginTop: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 13,
        textAlignVertical: "top",
    },
    checkboxes: {
        width: 330,
    },
    imagePreview: {
        width: 290,
        height: 200,
        borderRadius: 10,
        marginVertical: 20,
        alignSelf: "center",
    },
});
