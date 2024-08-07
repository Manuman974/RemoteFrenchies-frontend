import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { CheckBox, Button, ThemeProvider } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
//import CustomCheckBox from './components/CustomCheckBox';
//import { useDispatch } from 'react-redux';

const initialCheckboxes = {
    fiber_connection: false,
    coffee_tea: false,
    dedicated_office: false,
}

export default function ProposerScreen({ navigation }) {
    //const dispatch = useDispatch();

    const [adresse, setAdresse] = useState('');
    const [jourAccueil, setJourAccueil] = useState('');
    const [heureAccueil, setHeureAccueil] = useState('');
    const [autresAvantages, setAutresAvantages] = useState('');
    const [messageAnnonce, setMessageAnnonce] = useState('');
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
    const [image, setImage] = useState(null);


    const handleSubmit = () => {
        // Gérer l'envoi des données
        fetch('http://192.168.1.39:3000/users/proposition', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address: adresse, welcome_day: jourAccueil, reception_hours: heureAccueil, fiber_connection: checkboxes, coffee_tea: checkboxes, dedicated_office: checkboxes, other: autresAvantages, description: messageAnnonce }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    //dispatch({ address: adresse, welcome_day: jourAccueil, reception_hours: heureAccueil, fiber_connection: checkboxes, coffee_tea: checkboxes, dedicated_office: checkboxes, other: autresAvantages, description: messageAnnonce });
                    setAdresse('');
                    setJourAccueil('');
                    setHeureAccueil('');
                    setCheckboxes(initialCheckboxes);
                    setAutresAvantages('');
                    setMessageAnnonce('');
                    setImage(null);
                    navigation.navigate('TabNavigator')
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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
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

        if (!result.cancelled) {
            setImage(result.uri);
        }
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

                    <TextInput
                        placeholder="Adresse"
                        style={styles.input1}
                        onChangeText={(value) => setAdresse(value)}
                        value={adresse}
                    />
                    <TextInput
                        placeholder="Jour d’accueil"
                        style={styles.input1}
                        onChangeText={(value) => setJourAccueil(value)}
                        value={jourAccueil}
                    />
                    <TextInput
                        placeholder="Heure d’accueil"
                        style={styles.input1}
                        onChangeText={(value) => setHeureAccueil(value)}
                        value={heureAccueil}
                    />

                    <View style={styles.separator} />

                    <View style={styles.checkboxes}>
                        <Text style={styles.sectionTitle2}>Mes avantages</Text>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={checkboxes.fiber_connection} // Identifiant unique dans initialCheckboxes
                                onPress={() => toggleCheckbox('fiber_connection')} // Identifie la checkbox grâce à son argument 'remote'
                                // Use ThemeProvider to make change for all checkbox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#49B48C"
                            />
                            <Text style={styles.label}>Connection Fibre</Text>
                        </View>
                        {/* <CustomCheckBox
                            checked={checkboxes.fiber_connection}
                            onPress={() => toggleCheckbox('fiber_connection')}
                            label="Connection Fibre"
                        /> */}

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={checkboxes.coffee_tea} // Identifiant unique dans initialCheckboxes
                                onPress={() => toggleCheckbox('coffee_tea')} // Identifie la checkbox grâce à son argument 'remote'
                                // Use ThemeProvider to make change for all checkbox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#49B48C"
                            />
                            <Text style={styles.label}>Café / Thé</Text>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                checked={checkboxes.dedicated_office} // Identifiant unique dans initialCheckboxes
                                onPress={() => toggleCheckbox('dedicated_office')} // Identifie la checkbox grâce à son argument 'remote'
                                // Use ThemeProvider to make change for all checkbox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#49B48C"
                            />
                            <Text style={styles.label}>Bureau dédié</Text>
                        </View>
                    </View>
                    <TextInput
                        placeholder="Autres : exemples (Vues, matériels sup...)"
                        style={styles.input1}
                        onChangeText={(value) => setAutresAvantages(value)}
                        value={autresAvantages}
                    />

                    <View style={styles.separator} />

                    <View style={styles.photoButtonsContainer}>
                        <TouchableOpacity onPress={openImagePickerAsync} style={styles.photoButton} activeOpacity={0.8}>
                            <Text style={styles.photoButtonText}>Choisir une photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openCameraAsync} style={styles.photoButton} activeOpacity={0.8}>
                            <Text style={styles.photoButtonText}>Prendre une photo</Text>
                        </TouchableOpacity>
                    </View>

                    {image && <Image source={{ uri: image }} style={styles.image} />}

                    <TextInput
                        placeholder="Message de l’annonce"
                        style={styles.input2}
                        onChangeText={(value) => setMessageAnnonce(value)}
                        value={messageAnnonce}
                    />

                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} activeOpacity={0.8}>
                        <Text style={styles.submitButtonText}>Publier</Text>
                    </TouchableOpacity>
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
    sectionTitle2: {
        // borderWidth: 1,
        // borderColor: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 10,
    },
    input1: {
        backgroundColor: '#DDD',
        borderWidth: 1,
        borderColor: '#8f8f8f',
        width: 290,
        height: 50,
        borderRadius: 10,
        padding: 10,
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
        marginBottom: 10,
    },
    checkboxes: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 330,
    },
    checkboxContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    photoButton: {
        // borderWidth: 1,
        // borderColor: 'red',
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '100%',
        marginTop: 20,
        marginBottom: 30,

        backgroundColor: '#49B48C',
        borderRadius: 40,
    },
    photoButtonText: {
        color: 'white',
        paddingTop: 7,
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 10,
    },
    submitButton: {
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 40,
        backgroundColor: '#49B48C',
        borderRadius: 40,
    },
    submitButtonText: {
        color: 'white',
        paddingTop: 7,
    },
    photoButtonsContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: '70%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});
