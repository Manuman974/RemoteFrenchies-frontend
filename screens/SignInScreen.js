import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function SignInScreen({ navigation }) {
    const frontendAddress = process.env.EXPO_PUBLIC_FRONTEND_ADDRESS;
    const dispatch = useDispatch();

    const [signInE_mail, setSignInE_mail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return EMAIL_REGEX.test(email);
    };

    const handleConnection = () => {
        if (!validateEmail(signInE_mail)) {
            setError('Adresse email invalide');
            return;
        }

        fetch(`${frontendAddress}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ e_mail: signInE_mail, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ e_mail: signInE_mail, token: data.token }));
                    setSignInE_mail('');
                    setSignInPassword('');
                    setError('');
                    navigation.navigate('TabNavigator')
                } else {
                    setError('Email ou Mot de passe invalide')
                }
            });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.icon}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
                    <Icon name='arrow-left' style={styles.reply} size={30} color='black' />
                </TouchableOpacity>
                <Image style={styles.image} source={require('../assets/Logo-Remote-Frenchies.png')} />
            </View>
            <Text style={styles.text}>Renseigne tes identifiants</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder="Adresse email"
                    style={styles.nom}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                    onChangeText={(value) => setSignInE_mail(value)}
                    value={signInE_mail}
                />

                <TextInput
                    placeholder="Mot de passe"
                    style={styles.nom}
                    onChangeText={(value) => setSignInPassword(value)}
                    value={signInPassword}
                />
            </View>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={handleConnection} style={styles.button} activeOpacity={0.8}>
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
    button: {
        // borderColor: 'red',
        // borderWidth: '1',
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 50,
        backgroundColor: '#49B48C',
        borderRadius: 50,
        marginBottom: 150,
    },
    textButton: {
        color: 'white',
        paddingTop: 7,

    },
    text: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 190,
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
        height: 127,
        justifyContent: 'space-between',
        marginTop: 60,
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
    icon: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: '100%',
        height: 190,
        paddingLeft: 20,
    },
    image: {
        // borderWidth: 1,
        // borderColor: 'red',
        marginLeft: 40,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});