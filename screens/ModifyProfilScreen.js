import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";


export default function ModifyProfilScreen({ navigation }) {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch();

    const [signUpFirstname, setSignUpFirstname] = useState("");
    const [signUpLastname, setSignUpLastname] = useState("");
    const [signUpJob, setSignUpJob] = useState("");
    const [signUpBusiness, setSignUpBusiness] = useState("");
    const [signUpCity, setSignUpCity] = useState("");
    const [signUpE_mail, setSignUpE_mail] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [error, setError] = useState("");


    const validateEmail = (email) => {
        return EMAIL_REGEX.test(email);
    };

    const validatePassword = (password) => {
        return PASSWORD_REGEX.test(password);
    };

    const handleRegister = () => {
        console.log("test");
        if (!validateEmail(signUpE_mail)) {
            setError("Adresse email invalide");
            return;
        }

        if (!validatePassword(signUpPassword)) {
            setError(
                "Le mot de passe doit contenir au moins 8 caractères, dont 1 majuscule, 1 chiffre et 1 caractère spécial"
            );
            return;
        }

        fetch("http://192.168.33.186:3000/users/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstname: signUpFirstname,
                lastname: signUpLastname,
                job: signUpJob,
                business: signUpBusiness,
                main_address: signUpCity,
                e_mail: signUpE_mail,
                password: signUpPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.result) {
                    dispatch(
                        login({
                            firstname: signUpFirstname,
                            lastname: signUpLastname,
                            job: signUpJob,
                            business: signUpBusiness,
                            main_address: signUpCity,
                            e_mail: signUpE_mail,
                            token: data.token,
                        })
                    );
                    setSignUpFirstname("");
                    setSignUpLastname("");
                    setSignUpJob("");
                    setSignUpBusiness("");
                    setSignUpCity("");
                    setSignUpE_mail("");
                    setSignUpPassword("");
                    navigation.navigate("ProfilScreen");
                } else {
                    setError("Tous les champs doivent être remplis");
                }
            });
    };

    return (

        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.icon}
                        onPress={() => navigation.navigate("ProfilScreen")} activeOpacity={0.8}>
                        <Icon name="arrow-left" size={30} color="#000000" />
                        </TouchableOpacity>
                        <Text style={styles.h1}>Modifier mon profil</Text>
                </View>
                <View style={styles.profilContainer} >
                    <Icon name='user' style={styles.profilIcon} size={50} color='#49B48C' />
                    <View style={styles.infoProfil}>
                        <Text style={styles.h2}> {user.firstname} {user.lastname}</Text>
                        <TouchableOpacity style={styles.modifyProfil}>
                            <Text style={styles.body2}> Modifier ma photo</Text><Icon name='pencil' style={styles.reply} size={20} color='#49B48C' />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={styles.scrollView} >
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
                        title="Enregistrer"
                        onPress={handleRegister}
                        style={styles.button}
                        textStyle={styles.textButton}
                    />

                </ScrollView>

                <Text style={styles.errorText}>{error}</Text>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-start",
    },
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        backgroundColor: 'red',
        marginTop: 50,
        marginLeft: 30,
        width: '70%',
        flexDirection: 'row',
        alignSelf:'center',
    },

    infoProfil: {
        backgroundColor: 'blue',
        marginLeft: 20,
        width: '80%',

    },

    h1: {
        marginLeft: 10,
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
    },

    icon: {
        marginTop: 30,
        width: "100%",
        paddingLeft: 20,
    },

    separator: {
        width: '80%',
        height: 2,
        backgroundColor: '#8f8f8f',
        marginVertical: 20,
        alignSelf: 'center',
    },

    profilIcon: {

        marginTop: 50,
        backgroundColor: '#DDDDDD',
        width: 90,
        height: 90,
        padding: 20,
        paddingHorizontal: 25,
        alignSelf: 'center',
        borderRadius: 100,
    },

    profilContainer: {
        backgroundColor: 'green',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        flexDirection: 'row',
    },

    h2: {
        marginTop: 10,
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    },

    h3: {
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular'
    },

    body2: {
        alignSelf: 'center',
        fontSize: 12,
        fontFamily: 'Poppins-Regular'
    },

    modifyProfil: {
        width: '60%',
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});