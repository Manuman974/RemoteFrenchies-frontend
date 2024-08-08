import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
    // const frontendAddress = process.env.EXPO_PUBLIC_FRONTEND_ADDRESS;
    const dispatch = useDispatch();

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpLastname, setSignUpLastname] = useState('');
    const [signUpJob, setSignUpJob] = useState('');
    const [signUpBusiness, setSignUpBusiness] = useState('');
    const [signUpCity, setSignUpCity] = useState('');
    const [signUpE_mail, setSignUpE_mail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return EMAIL_REGEX.test(email);
    };

    const handleRegister = () => {
        if (!validateEmail(signUpE_mail)) {
           
            setError('Adresse email invalide');
            return;
        }


        fetch('http://192.168.94.186:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: signUpFirstname, lastname: signUpLastname, job: signUpJob, business: signUpBusiness, main_address: signUpCity, e_mail: signUpE_mail, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                
                if (data.result) {
                    dispatch(login({ firstname: signUpFirstname, lastname: signUpLastname, job: signUpJob, business: signUpBusiness, main_address: signUpCity, e_mail: signUpE_mail, token: data.token }));
                    setSignUpFirstname('');
                    setSignUpLastname('');
                    setSignUpJob('');
                    setSignUpBusiness('');
                    setSignUpCity('');
                    setSignUpE_mail('');
                    setSignUpPassword('');
                    navigation.navigate('Onboarding')
                } else {
                    setError('Tous les champs doivent être remplis')
                }
            });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={styles.icon}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
                        <Icon name='arrow-left' style={styles.reply} size={30} color='#000000' />
                    </TouchableOpacity>
                </View>
                <Image style={styles.image} source={require('../assets/Logo 1.png')} />
                <Text style={styles.h1}>Créer ton profil Remote Frenchies</Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}> 
           
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
                    <TouchableOpacity onPress={handleRegister} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Continuer</Text>
                    </TouchableOpacity>
                    </View>
                    
                </ScrollView>
                <Text style={styles.errorText}>{error}</Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
    },
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
marginTop: 30,
        width: '100%',
        paddingLeft: 20,

    },
    image: {
        resizeMode: 'contain',
        width: 250,
        alignSelf: 'center',
      },
    text: {
        width: 300,
        height: 92,
        // fontFamily: 'Poppins',
        // fontWeight: '600',
        // fontSize: 24,
        lineHeight: 36,
        textAlign: 'center',
        marginTop: 20,
    },

    h1: {
        marginTop: 10,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
      },

    scrollView: {
        marginTop: 0,
    },
    scrollViewContent: {
        alignSelf: 'center',
        paddingVertical: 200,
        paddingTop: 0,
    },
    input: {
        width: 290,
        height: 400,
        marginTop: 20,
    },
    nom: {
        margin: 10,
        backgroundColor: '#DDD',
        borderWidth: 1,
        borderColor: '#8f8f8f',
        width: 290,
        height: 50,
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        alignSelf: 'center',
    },
    button: {
        // borderColor: 'red',
        // borderWidth: '1',
        alignSelf: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 40,
        backgroundColor: '#49B48C',
        borderRadius: 40,
    },
    textButton: {
        color: '#ffffff',
        height: 30,
        fontSize: 16,
        paddingTop: 5,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',

    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
});