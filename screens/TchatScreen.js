import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

export default function TchatScreen({ navigation }) {
    const user = useSelector((state) => state.user.value);
    const [messages, setMessages] = useState([
        { id: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan', isSentByUser: false },
        { id: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan', isSentByUser: true },
        { id: '3', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan', isSentByUser: false },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim().length > 0) {
            const newMessageObject = {
                id: (messages.length + 1).toString(),
                text: newMessage,
                isSentByUser: true,
            };
            setMessages([...messages, newMessageObject]);
            setNewMessage('');
        }
    };

    const MessageBubble = ({ text, isSentByUser }) => (
        <View style={[
            styles.messageBubble,
            isSentByUser ? styles.sentMessage : styles.receivedMessage
        ]}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name='arrow-left' size={20} color='#000' />
                    </TouchableOpacity>
                    <Image
                        source={{ uri: user.photoProfile }} // Remplacez par l'URL réelle de l'image
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>Remy Gaillard</Text>
                </View>
                <View style={styles.separator}></View>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <View style={[
                            styles.messageContainer,
                            item.isSentByUser ? styles.sentContainer : styles.receivedContainer
                        ]}>
                            {!item.isSentByUser && (
                                <Image
                                    source={{ uri: user.photoProfile }} // Remplacez par l'URL réelle de l'image
                                    style={styles.smallProfileImage}
                                />
                            )}
                            <MessageBubble text={item.text} isSentByUser={item.isSentByUser} />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholder="Tapez votre message..."
                    />
                    <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                        <Icon name="paper-plane" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginVertical: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    sentContainer: {
        justifyContent: 'flex-end',
    },
    receivedContainer: {
        justifyContent: 'flex-start',
    },
    smallProfileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    messageBubble: {
        maxWidth: '75%',
        borderRadius: 15,
        padding: 10,
    },
    sentMessage: {
        backgroundColor: '#4CAF50',
        alignSelf: 'flex-end',
    },
    receivedMessage: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    listSeparator: {
        height: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderColor: '#CCCCCC',
        backgroundColor: '#FFFFFF',
    },
    textInput: {
        flex: 1,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        padding: 10,
    },
});