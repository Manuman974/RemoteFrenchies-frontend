import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

export default function TchatScreen({ route }) {
  const { otherUserId } = route.params; // L'ID de l'utilisateur avec lequel on discute
  console.log("Other user ID:", otherUserId);
  const user = useSelector((state) => state.user.value);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    console.log("Fetching messages for user:", user.token);
    fetch(`http://192.168.154.186:3000/discussions/messages/${user.token}/${otherUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Journaliser la réponse
        if (data.result && data.discussions) {
          // Filtrer la discussion correspondant à l'autre utilisateur
          const foundDiscussion = data.discussions.find(
            (discussion) =>
              (discussion.user_1._id === user._id && discussion.user_2._id === otherUserId) ||
              (discussion.user_1._id === otherUserId && discussion.user_2._id === user._id)
          );
  
          if (foundDiscussion) {
            setMessages(foundDiscussion.message); // Assure-toi que c'est bien un tableau de messages
          } else {
            console.error("Discussion not found between the users.");
          }
        } else {
          console.error("No discussions found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return; // Empêche l'envoi de messages vides

    const messageData = {
      token: user.token,
      userId: otherUserId,
      text: newMessage,
    };

    fetch(`http://192.168.154.186:3000/discussions/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Message sent:", data);
        if (data.result) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: newMessage, author: user._id }, // Ajoute le message à la liste des messages
          ]);
          setNewMessage(""); // Réinitialiser le champ de message
        } else {
          console.error("Failed to send message:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
        placeholder="Type a message..."
      />
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
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
