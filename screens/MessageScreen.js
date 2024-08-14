import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';




export default function MessageScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fonction pour récupérer les messages toutes les 1 secondes
        const interval = setInterval(() => {
            fetchMessages();
        }, 1000); // 1000 milliseconds = 1 seconds

        // Efface l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    // Fonction pour récupérer les messages du serveur
    const fetchMessages = () => {
        // Faire une requête GET au serveur pour récupérer les messages de l'utilisateur actuel
        fetch(`http://192.168.33.186:3000/users/messages/${user.token}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }, // Indique que la requête et la réponse doivent être au format JSON
        })
            .then((response) => response.json()) 
            .then(data => {
                console.log(data.data.discussion)
                // Vérifiez si le tableau des discussions existe et n'est pas vide
                if (data.data.discussion && data.data.discussion.length > 0) {
                    // Mappez le tableau de discussions à un nouveau tableau d'objets de message
                    setMessages(data.data.discussion.map((discussion) => ({
                        id: discussion._id, // ID unique de la discussion
                        name: `${data.data.firstname} ${data.data.lastname}`,
                        job: data.data.job,
                        messagesCount: discussion.message.length // Nombre de messages dans la discussion
                    })));
                }
            })
    };

    // Composant fonctionnel pour restituer un élément de message individuel
    const MessageItem = ({ name, job, messagesCount }) => (
        <TouchableOpacity onPress={() => navigation.navigate("TchatScreen")}>
            <View style={styles.messageContainer}>
                <Image
                    source={{ uri: user.photoProfile }} // URL de la photo de profil de l'objet utilisateur
                    style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.job}>{job}</Text>
                </View>
                {messagesCount > 0 && (
                    <View style={styles.messageCountContainer}>
                        <Text style={styles.messageCount}>{messagesCount.toString().padStart(2, '0')}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name='envelope' style={styles.icon} size={30} color='#49B48C' />
                    <Text style={styles.h1}>Messagerie</Text>
                </View>
                <View style={styles.separator}></View>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <MessageItem name={item.name} job={item.job} messagesCount={item.messagesCount} />
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        marginLeft: 30,
    },
    icon: {
        marginRight: 10,
    },
    h1: {
        fontSize: 24,
        fontFamily: 'Poppins-SemiBold',
    },
    separator: {
        width: '80%',
        height: 2,
        backgroundColor: '#8f8f8f',
        marginVertical: 20,
        alignSelf: 'center',
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9',
        padding: 10,
        borderRadius: 8,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        // flexDirection: 'row',
    },
    name: {
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    // lastname: {
    //     fontSize: 16,
    //     marginLeft: 10,
    //     fontFamily: 'Poppins-SemiBold',
    // },
    job: {
        fontSize: 14,
        marginLeft: 10,
        color: '#888',
        fontFamily: 'Poppins-Regular',
    },
    messageCountContainer: {
        backgroundColor: '#66BB6A',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    messageCount: {
        color: '#FFF',
        fontFamily: 'Poppins-SemiBold',
    },
    listSeparator: {
        height: 10,
    },
});