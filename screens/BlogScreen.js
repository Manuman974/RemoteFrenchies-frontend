import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TextInput,
    Dimensions,
    Platform,
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useState } from "react";
import CustomHeader from "../components/CustomHeader";
//Composant react permettant d'ajuster les tailles pour s'adapter à tous les écrans
const { width, height } = Dimensions.get('window');
// Texte de l'article avec un affichage limité à 250 caractéres
export default function BlogScreen({ navigation }) {
    const [textCut1, setTextCut1] = useState(false);
    const [textCut2, setTextCut2] = useState(false);
    const [textCut3, setTextCut3] = useState(false);
    const text1 = "Le télétravail offre une flexibilité inégalée aux employés, permettant un meilleur équilibre entre vie professionnelle et vie personnelle. En travaillant depuis chez eux, les employés évitent les trajets quotidiens, réduisant ainsi le stress et économisant du temps. Cette autonomie accrue favorise également une meilleure concentration et une productivité accrue. De plus, les télétravailleurs peuvent personnaliser leur espace de travail selon leurs préférences, contribuant à une atmosphère plus agréable et motivante.";
    const text2 = "Maintenir une collaboration efficace en télétravail peut être un défi, mais avec les bons outils, c'est tout à fait faisable. Les plateformes de communication comme Slack ou Microsoft Teams facilitent les échanges instantanés et le partage de documents. Les réunions virtuelles via Zoom ou Google Meet permettent de garder un contact visuel et de discuter en temps réel. Il est crucial d’établir des routines régulières pour garantir que tous les membres de l’équipe restent connectés et engagés.";
    const text3 = "Bien que le télétravail présente de nombreux avantages, il n’est pas exempt de défis. L’isolement social et la difficulté à séparer le travail de la vie personnelle peuvent affecter le moral des employés. Pour surmonter ces obstacles, il est essentiel de maintenir des interactions régulières avec les collègues et de définir des limites claires entre les heures de travail et de détente. La mise en place d’un espace de travail dédié et la prise de pauses régulières peuvent également aider à maintenir une bonne santé mentale et une productivité optimale.";
    //variable permettant de limiter l'affichage à 250 caractéres.
    const maxLength = 250;
    const truncatedText1 = text1.length > maxLength ? text1.substring(0, maxLength) + '...' : text1;
    const truncatedText2 = text1.length > maxLength ? text2.substring(0, maxLength) + '...' : text2;
    const truncatedText3 = text1.length > maxLength ? text3.substring(0, maxLength) + '...' : text3;

    return (
        // jsx des articles
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                    <View>
                        <CustomHeader
                            title="Blog"
                            icon="newspaper-o"
                        />
                    </View>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Les Avantages du Télétravail pour les Employés</Text>
                            <View>
                                <Text style={styles.h3}>13 Janvier 2024</Text>
                            </View>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../assets/teletravail1.jpeg")}
                                style={styles.photoRemoter}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.body}>{textCut1 ? text1 : truncatedText1}</Text>
                            <TouchableOpacity onPress={() => setTextCut1(!textCut1)}>
                                <Text style={styles.buttonText}>
                                    {textCut1 ? 'Voir moins' : 'Voir plus'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.titleContainer2}>
                            <Text style={styles.title}>Comment Maintenir la Collaboration en Télétravail</Text>
                            <View>
                                <Text style={styles.h3}>18 Mai 2024</Text>
                            </View>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../assets/teletravaill2.jpeg")}
                                style={styles.photoRemoter}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.body}>{textCut2 ? text2 : truncatedText2}</Text>
                            <TouchableOpacity onPress={() => setTextCut2(!textCut2)}>
                                <Text style={styles.buttonText}>
                                    {textCut2 ? 'Voir moins' : 'Voir plus'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleContainer3}>
                            <Text style={styles.title}>Les Défis du Télétravail et Comment les Surmonter</Text>
                            <View>
                                <Text style={styles.h3}>23 Septembre 2024</Text>
                            </View>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require("../assets/teletravaill3.jpeg")}
                                style={styles.photoRemoter}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.body}>{textCut3 ? text3 : truncatedText3}</Text>
                            <TouchableOpacity onPress={() => setTextCut3(!textCut3)}>
                                <Text style={styles.buttonText}>
                                    {textCut3 ? 'Voir moins' : 'Voir plus'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView >


    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },

    keyboardAvoidingView: {
        flex: 1,
    },

    separator: {
        width: width * 0.9,
        height: 2,
        backgroundColor: '#8f8f8f',
        marginVertical: 20,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        marginTop: 50,
        width: width * 0.9,
        flexDirection: 'row',
        marginRight: 170,
    },

    h1: {
        marginRight: 140,
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        alignSelf: 'center',
        width: "70%",
    },

    input: {
        backgroundColor: '#DDD',
        width: 250,
        height: 50,
        borderColor: '#8f8f8f',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,

    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginRight: 10,
        width: width * 0.8,

    },
    titleContainer: {
        height: 80,
        width: width * 0.9,
        marginTop: 15,
        marginBottom: 20,

    },
    titleContainer2: {
        height: 80,
        width: width * 0.9,
        marginBottom: 20,
        marginTop: 20,

    },
    titleContainer3: {
        height: 80,
        width: width * 0.9,
        marginBottom: 20,
        marginTop: 20,
    },

    title: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        marginTop: 10,
    },
    photoRemoter: {
        width: "100%",
        height: 150,
        borderRadius: 5,
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: width * 0.90,
    },

    h3: {
        fontSize: 15,
        fontFamily: 'Poppins-Regular',
        marginBottom: 30,
        alignItems: "center",
    },

    textContainer: {
        paddingLeft: 5,
        marginTop: 10,
        borderBottomWidth: 1,
        paddingBottom: 10,
        width: width * 0.90,
    },

    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
    },
    icon1: {
        marginLeft: 100,
        marginTop: 5,
    },
    icon2: {
        marginLeft: 10,
    },
    buttonText: {
        color: "#49B48C",
        fontFamily: 'Poppins-SemiBold',
    },
});