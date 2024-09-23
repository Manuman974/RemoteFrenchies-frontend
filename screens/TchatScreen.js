import React, { useState, useEffect } from "react";
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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";

export default function TchatScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    fetch(`https://remote-frenchies-backend-delta.vercel.app/messages/${user.token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.discussion && data.data.discussion.length > 0) {
          setMessages(
            data.data.discussion[0].message.map((e) => ({
              id: e._id,
              author: e.author,
              message: e.message,
              date: e.date,
              isSentByUser: e.author === user._id, // Determine if the message was sent by the user
            }))
          );
        }
      });
  };

  // Fonction pour envoyer un message au serveur
  const sendMessageToServer = (message) => {
    return fetch("https://remote-frenchies-backend-delta.vercel.app/discussions/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        userId: user._id,
        text: message,
        timestamp: new Date().toISOString(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "Failed to send message");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent:", data);
        fetchMessages(); // Récupère les messages après l'envoi
      });
  };

  // Fonction pour gérer l'envoi d'un message
  const sendMessage = () => {
    // Vérifiez si le nouveau message n'est pas juste un espace
    if (newMessage.trim().length > 0) {
      // Efface le champ de saisie
      setNewMessage("");

      // Envoie un message au serveur
      sendMessageToServer(newMessage);
    }
  };

  // Composant fonctionnel pour afficher une bulle de message
  const MessageBubble = ({ text, isSentByUser }) => (
    // Afficher le conteneur avec des styles selon que le message est envoyé par l'utilisateur ou reçu
    <View
      style={[
        styles.messageBubble,
        isSentByUser ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );

  // Fonction pour restituer un élément de message individuel
  const renderItem = ({ item }) => (
    // Afficher le conteneur du message, stylisé selon qu'il a été envoyé par l'utilisateur ou reçu
    <View
      style={[
        styles.messageContainer,
        item.isSentByUser ? styles.sentContainer : styles.receivedContainer,
      ]}
    >
      {!item.isSentByUser && (
        <Image
          source={{ uri: user.photoProfile }}
          style={styles.smallProfileImage}
        />
      )}
      <MessageBubble text={item.message} isSentByUser={item.isSentByUser} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <Image
            source={{ uri: user.photoProfile }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {user.firstname} {user.lastname}
          </Text>
        </View>
        <View style={styles.separator}></View>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        />
        {/* <View style={styles.messageText}>
                    <Text> bonjour</Text>
                </View> */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
    marginVertical: 10,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  sentContainer: {
    justifyContent: "flex-end",
  },
  receivedContainer: {
    justifyContent: "flex-start",
  },
  smallProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  messageBubble: {
    maxWidth: "75%",
    borderRadius: 15,
    padding: 10,
  },
  sentMessage: {
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  listSeparator: {
    height: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    padding: 10,
  },
});
