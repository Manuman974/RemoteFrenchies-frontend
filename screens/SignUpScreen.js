import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';


export default function SignUpScreen({ navigation }) {
    const dispatch = useDispatch();

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpLastname, setSignUpLastname] = useState('');
    const [signUpJob, setSignUpJob] = useState('');
    const [signUpBusiness, setSignUpBusiness] = useState('');
    const [signUpCity, setSignUpCity] = useState('');
    const [signUpE_mail, setSignUpE_mail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const handleRegister = () => {
        fetch('http://192.168.1.39:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: signUpFirstname, lastname: signUpLastname, job: signUpJob, business: signUpBusiness, main_address: signUpCity, e_mail: signUpE_mail, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.result) {
                    dispatch(login({ firstname: signUpFirstname, lastname: signUpLastname, job: signUpJob, business: signUpBusiness, main_address: signUpCity, e_mail: signUpE_mail, token: data.token }));
                    setSignUpFirstname('');
                    setSignUpLastname('');
                    setSignUpJob('');
                    setSignUpBusiness('');
                    setSignUpCity('');
                    setSignUpE_mail('');
                    setSignUpPassword('');
                    navigation.navigate('TabNavigator')
                }
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
                    <Icon name='arrow-left' style={styles.reply} size='30' color='black' />
                </TouchableOpacity>
            </View>
            <Image style={styles.image} source={require('../assets/Logo-Remote-Frenchies.png')} />
            <Text style={styles.text}>Créer ton profil Remote Frenchies</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder="Nom"
                    style={styles.nom}
                    onChangeText={(value) => setSignUpFirstname(value)}
                    value={signUpFirstname}
                />

                <TextInput
                    placeholder="Prénom"
                    style={styles.nom}
                    onChangeText={(value) => setSignUpLastname(value)}
                    value={signUpLastname}
                />

                <TextInput
                    placeholder="Métier"
                    style={styles.nom}
                    onChangeText={(value) => setSignUpJob(value)}
                    value={signUpJob}
                />

                <TextInput
                    placeholder="Entreprise"
                    style={styles.nom}
                    onChangeText={(value) => setSignUpBusiness(value)}
                    value={signUpBusiness}
                />

                <TextInput
                    placeholder="Ville"
                    style={styles.nom}
                    onChangeText={(value) => setSignUpCity(value)}
                    value={signUpCity}
                />

                <TextInput
                    placeholder="Adresse email"
                    style={styles.nom}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={(value) => setSignUpE_mail(value)}
                    value={signUpE_mail}
                />

                <TextInput
                    placeholder="Mot de passe"
                    style={styles.nom}
                    onChangeText={(value) => setSignUpPassword(value)}
                    value={signUpPassword}
                />
            </View>
            <TouchableOpacity onPress={handleRegister} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Continuer</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: '100%',
        paddingLeft: 20,

    },
    image: {
        width: 218,
        height: 66,
        marginTop: 10,

    },
    text: {
        width: 300,
        height: 92,
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 36,
        textAlign: 'center',
        marginTop: 20,
    },
    input: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 290,
        height: 385,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    nom: {
        backgroundColor: '#DDD',
        borderWidth: 1,
        borderColor: '#8f8f8f',
        width: 290,
        height: 50,
        BorderRadius: 10,
        padding: 6,
    },
    button: {
        // borderColor: 'red',
        // borderWidth: '1',
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 40,
        backgroundColor: '#49B48C',
        borderRadius: 40,
    },
    textButton: {
        color: 'white',
        paddingTop: 7,

    },
});