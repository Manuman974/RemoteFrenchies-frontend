import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import CustomTextInput from '../components/CustomTextInput';
import CustomCheckBox from '../components/CustomCheckbox';
import CustomButton from '../components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto } from '../reducers/user';


const initialCheckboxes = {
    fiber_connection: false,
    coffee_tea: false,
    dedicated_office: false,
}

export default function ProposerScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch(); 

    const [adresse, setAdresse] = useState('');
    const [jourAccueil, setJourAccueil] = useState('');
    const [heureAccueil, setHeureAccueil] = useState('');
    const [autresAvantages, setAutresAvantages] = useState('');
    const [messageAnnonce, setMessageAnnonce] = useState('');
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
    const [image, setImage] = useState(null);


    const handleSubmit = () => {
        // Gérer l'envoi des données
        fetch('http://192.168.94.186:3000/proposition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                main_address: adresse, 
                welcome_day: jourAccueil, 
                reception_hours: heureAccueil, 
                fiber_connection: checkboxes.fiber_connection, 
                coffee_tea: checkboxes.coffee_tea, 
                dedicated_office: checkboxes.dedicated_office, 
                other: autresAvantages, 
                description: messageAnnonce,
                token: user.token, 
                }),

        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    setAdresse('');
                    setJourAccueil('');
                    setHeureAccueil('');
                    setCheckboxes(initialCheckboxes);
                    setAutresAvantages('');
                    setMessageAnnonce('');
                    setImage(null);
                    navigation.navigate('PublishScreen')
                }
            });
    };



    // Mise à jour de l'état avec setCkeckboxes  
    const toggleCheckbox = (key) => {
        setCheckboxes(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
            setImage(result.uri); // Met à jour l'état avec l'URI de l'image sélectionnée
        }
    };

    const openCameraAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Autorisez-vous Remote frenchies á acceder a votre appareil photo");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.uri);
        
            const formData = new FormData();
            const uri = result.uri;

            
        
            formData.append("photoFromFront", { 
                uri: `${uri}`,
                name: "photo.jpg",
                type: "image/jpeg",
            });
        
            fetch('192.168.94.186:3000/upload', {
                method: "POST",
                body: formData,
                
            })
            .then((response) => response.json())
            .then((data) => { 
                if (data) {
                    console.log(data)
                    data.result && dispatch(addPhoto(data.url));
                } else {
                    alert("Échec du téléchargement de la photo");
                }
            })
            };
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
                    <View style={styles.header}>
                        <Icon name='hand-paper-o' style={styles.reply} size={30} color='#49B48C' />
                        <Text style={styles.title}>Proposer</Text>
                    </View>
                    <View style={styles.separator} />

                    <Text style={styles.sectionTitle1}>Accueillir un télétravailleur</Text>

                    <CustomTextInput
                        placeholder="Adresse"
                        value={adresse}
                        onChangeText={setAdresse}
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
                            onPress={() => toggleCheckbox('fiber_connection')}
                            label="Connection Fibre"
                        />

                        <CustomCheckBox
                            checked={checkboxes.coffee_tea}
                            onPress={() => toggleCheckbox('coffee_tea')}
                            label="Café / Thé"
                        />

                        <CustomCheckBox
                            checked={checkboxes.dedicated_office}
                            onPress={() => toggleCheckbox('dedicated_office')}
                            label="Bureau dédié"
                        />
                    </View>
                    <CustomTextInput
                        placeholder="Autres : exemples (Vues, matériels sup...)"
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

                    {image && <Image source={{ uri: image }} style={styles.image} />}

                    <TextInput
                        placeholder="Message de l’annonce"
                        style={styles.input2}
                        onChangeText={(value) => setMessageAnnonce(value)}
                        value={messageAnnonce}
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
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    header: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 300,
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingLeft: 10,
    },
    separator: {
        width: '90%',
        height: 1,
        backgroundColor: '#8f8f8f',
        marginVertical: 20,
    },
    sectionTitle1: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
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
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 10,
    },
    input2: {
        backgroundColor: '#DDD',
        borderWidth: 1,
        borderColor: '#8f8f8f',
        width: 290,
        height: 150,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        marginTop: 20,
    },
    checkboxes: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 330,
    },
});
