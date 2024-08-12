import React from 'react';
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




export default function MessagingScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const messages = [
        { id: '1', name: 'Rémy Gaillard', job: 'Développeur web', messagesCount: 5 },
        { id: '2', name: 'Rémy Gaillard', job: 'Développeur web', messagesCount: 5 },
        { id: '3', name: 'Rémy Gaillard', job: 'Développeur web', messagesCount: 5 },
        { id: '4', name: 'Rémy Gaillard', job: 'Développeur web', messagesCount: 5 },
    ];

    const MessageItem = ({ name, job, messagesCount }) => (
        <TouchableOpacity onPress={navigation.navigate("TchatScreen")}>
            <View style={styles.messageContainer}>
                <Image
                    source={{ uri: user.photoProfile }} // Remplacez par le chemin réel de l'image
                    style={styles.profileImage}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.job}>{job}</Text>
                </View>
                <View style={styles.messageCountContainer}>
                    <Text style={styles.messageCount}>{messagesCount.toString().padStart(2, '0')}</Text>
                </View>
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
    },
    name: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
    job: {
        fontSize: 14,
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