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
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import CustomTextInput from "../components/CustomTextInput";
import CustomCheckBox from "../components/CustomCheckbox";
import CustomButton from "../components/CustomButton";
import CustomHeader from "../components/CustomHeader";
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
    const [city, setCity] = useState(""); //MODIF K
    const [jourAccueil, setJourAccueil] = useState("");
    const [heureAccueil, setHeureAccueil] = useState("");
    const [autresAvantages, setAutresAvantages] = useState("");
    const [messageAnnonce, setMessageAnnonce] = useState("");
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

    const handleSubmit = () => {
        // Gérer l'envoi des données
        fetch("http://192.168.154.186:3000/proposition", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                street: adresse, //MODIF K
                city: city, //MODIF K
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
            // Préparer les données pour l'envoi
            const formData = new FormData();
            formData.append("photoFromFront", {
                uri: result.assets[0].uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });

            // Envoi de la photo au serveur
            fetch('http://192.168.154.186:3000/proposition/upload', {
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
            // Préparer les données pour l'envoi
            const formData = new FormData();
            formData.append("photoFromFront", {
                uri: result.assets[0].uri,
                name: "photo.jpg",
                type: "image/jpeg",
            });

            // Envoi de la photo au serveur
            fetch('http://192.168.154.186:3000/proposition/upload', {
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
                        Accueillir un télétravailleur
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

                    <CustomTextInput
                        placeholder="Jour d’accueil DD/MM/YYYY"
                        value={jourAccueil}
                        onChangeText={setJourAccueil}
                    />

                    <CustomTextInput
                        placeholder="Heure d’accueil hh:mm"
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

                    {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

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

    header: {
        marginTop: 40,
        marginLeft: 0,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        paddingLeft: 10,
    },
    separator: {
        width: "90%",
        height: 1,
        backgroundColor: "#8f8f8f",
        marginVertical: 20,
    },
    sectionTitle1: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 20,
        marginBottom: 10,
        paddingLeft: 30,
    },
    CustomTextInput: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 290,
    },
    sectionTitle2: {
        // borderWidth: 1,
        // borderColor: 'red',
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
        // borderWidth: 1,
        // borderColor: 'red',
        width: 330,
    },
});
