import {
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomProfilButton from "../components/CustomProfilButton";
import {  useSelector } from 'react-redux';



export default function ProfilScreen({ navigation }) {
    
    const user = useSelector((state) => state.user.value); 

    

    
    return (
        <KeyboardAvoidingView>
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <View style={styles.header}>
                        <Icon name='user-o' style={styles.reply} size={30} color='#49B48C' />
                        <Text style={styles.h1}>Mon profil</Text>
                    </View>
                    <View style={styles.separator}></View>
                    <View style={styles.profilContainer} >
                        <Icon name='user' style={styles.profilIcon} size={80} color='#49B48C' />
                        <Text style={styles.h2}> {user.firstname} {user.lastname}</Text>
                        <Text style={styles.h3}> {user.job} </Text>
                            <TouchableOpacity style={styles.modifyProfil}>
                                <Text style={styles.body2}> Modifier mon profil</Text><Icon name='pencil' style={styles.reply} size={20} color='#49B48C' />
                            </TouchableOpacity>

                        <View>
                            <CustomProfilButton title="Mes annonces">
                            </CustomProfilButton>
                            <CustomProfilButton title="Mon historique de rencontre">
                            </CustomProfilButton>
                            <CustomProfilButton title="Paramètres et sécurité">
                            </CustomProfilButton>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        marginTop: 50,
        marginLeft: 30,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    h1: {
        marginLeft: 10,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
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
        width: 150,
        height: 150,
        padding: 30,
        paddingHorizontal: 45,
        alignSelf: 'center',
        borderRadius: 100,
    },

    profilContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '80%',
    },

    buttonContainer: {

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