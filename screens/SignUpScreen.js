import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SignUpScreen({ navigation }) {
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
                <TextInput placeholder="Nom" style={styles.nom} />
                <TextInput placeholder="Prénom" style={styles.nom} />
                <TextInput placeholder="Métier" style={styles.nom} />
                <TextInput placeholder="Entreprise" style={styles.nom} />
                <TextInput placeholder="Ville" style={styles.nom} />
                <TextInput placeholder="Adresse email" style={styles.nom} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Pwd')} style={styles.button} activeOpacity={0.8}>
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
        
    }
});