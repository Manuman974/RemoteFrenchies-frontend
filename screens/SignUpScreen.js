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
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[%#@$!^&*])[A-Za-z\d%#@$!^&*]{8,}$/;

export default function SignUpScreen({ navigation }) {
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

    const validatePassword = (password) => {
        return PASSWORD_REGEX.test(password);
    };

    const handleRegister = () => {
        if (!validateEmail(signUpE_mail)) {
            setError('Adresse email invalide');
            return;
        }

        if (!validatePassword(signUpPassword)) {
            setError('Le mot de passe doit contenir au moins 8 caractères, dont 1 majuscule, 1 chiffre et 1 caractère spécial');
            return;
        }

        fetch('http://192.168.1.39:3000/users/signup', {
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
                    navigation.navigate('TabNavigator')
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
                        <Icon name='arrow-left' style={styles.reply} size={30} color='black' />
                    </TouchableOpacity>
                </View>
                <Image style={styles.image} source={require('../assets/Logo-Remote-Frenchies.png')} />
                <Text style={styles.text}>Créer ton profil Remote Frenchies</Text>
                <Text style={styles.errorText}>{error}</Text>
                <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
                    <View style={styles.input}>

                        <CustomTextInput
                            placeholder="Nom"
                            value={signUpFirstname}
                            onChangeText={setSignUpFirstname}
                        />

                        <CustomTextInput
                            placeholder="Prénom"
                            value={signUpLastname}
                            onChangeText={setSignUpLastname}
                        />

                        <CustomTextInput
                            placeholder="Métier"
                            value={signUpJob}
                            onChangeText={setSignUpJob}
                        />

                        <CustomTextInput
                            placeholder="Entreprise"
                            value={signUpBusiness}
                            onChangeText={setSignUpBusiness}
                        />

                        <CustomTextInput
                            placeholder="Ville"
                            value={signUpCity}
                            onChangeText={setSignUpCity}
                        />

                        <CustomTextInput
                            placeholder="Adresse email"
                            value={signUpE_mail}
                            onChangeText={setSignUpE_mail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                        />

                        <CustomTextInput
                            placeholder="Mot de passe"
                            value={signUpPassword}
                            onChangeText={setSignUpPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <CustomButton
                        title="Continuer"
                        onPress={handleRegister}
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
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    input: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 290,
        height: 400,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        // borderColor: 'red',
        // borderWidth: '1',
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 100,
        backgroundColor: '#49B48C',
        borderRadius: 40,
    },
    textButton: {
        color: 'white',
        paddingTop: 7,

    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});