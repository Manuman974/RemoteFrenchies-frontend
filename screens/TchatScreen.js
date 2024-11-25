import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSelector } from "react-redux";
import CustomHeader from "../components/CustomHeader";
import MessageBubble from "../components/MessageBubble";
import { fetchMessages, sendMessage } from '../services/api';
import Pusher from 'pusher-js/react-native';


export default function TchatScreen({ route, navigation }) {
  const { discussionId, otherUser } = route.params;
  const user = useSelector((state) => state.user.value);
  const userId = user.userId;
  console.log('User ID:', userId);

  const otherUserName = otherUser?.firstname || "l'utilisateur";

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchMessages(discussionId);
      if (response.result) {
        console.log('Messages reçus:', JSON.stringify(response.discussion.message, null, 2));
        setMessages(response.discussion.message.reverse());
      } else {
        setError('Erreur lors du chargement des messages');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des messages:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [discussionId]);

  useEffect(() => {
    loadMessages();

    // Initialiser Pusher
    const pusher = new Pusher('VOTRE_CLE_PUSHER', {
      cluster: 'VOTRE_CLUSTER',
      encrypted: true
    });

    // S'abonner au canal de la discussion
    const channel = pusher.subscribe(`discussion-${discussionId}`);

    // Écouter les nouveaux messages
    channel.bind('new-message', function(data) {
      console.log('Nouvel événement Pusher reçu:', data);
      setMessages(prevMessages => {
        return prevMessages.map(msg => {
          if (msg._id === data.message._id) {
            // Si le message existe déjà, mettez à jour son statut et ses autres propriétés
            return {...msg, ...data.message, status: 'sent'};
          } else if (data.message.author === userId) {
            // Si c'est un nouveau message de l'utilisateur actuel, mettez le statut à 'sent'
            return {...data.message, status: 'sent'};
          } else {
            // Si c'est un nouveau message d'un autre utilisateur, ajoutez-le tel quel
            return msg;
          }
        });
      });
      // Ajoutez le nouveau message s'il n'existe pas déjà
      setMessages(prevMessages => {
        if (!prevMessages.some(msg => msg._id === data.message._id)) {
          return [data.message, ...prevMessages];
        }
        return prevMessages;
      });
    });

    // Nettoyage lors du démontage du composant
    return () => {
      pusher.unsubscribe(`discussion-${discussionId}`);
    };
  }, [loadMessages, discussionId]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      _id: Date.now().toString(),
      author: userId,
      message: inputMessage,
      date: new Date(),
      status: 'sending'
    };
    console.log('Nouveau message créé:', newMessage);

    setMessages(prevMessages => [newMessage, ...prevMessages]);
    setInputMessage('');

    try {
      const response = await sendMessage(user.token, discussionId, inputMessage, newMessage._id);
      if (response.result) {
        console.log('Message envoyé avec succès');
        // Mise à jour du statut à 'sent' localement
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg._id === newMessage._id ? {...msg, status: 'sent'} : msg
          )
        );
      } else {
        throw new Error('Échec de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      // Mettre à jour le statut du message à 'failed'
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg._id === newMessage._id ? {...msg, status: 'failed'} : msg
        )
      );
    }
  };

  const renderItem = ({ item }) => {
    console.log('Message:', item);
    console.log('Current user ID:', userId);
    const isSentByUser = item.author._id === userId || item.author === userId;
    console.log('Is sent by user:', isSentByUser);
    
    return (
      <MessageBubble
        text={item.message}
        isSentByUser={isSentByUser}
        date={new Date(item.date)}
        status={item.status}
      />
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader
          title={`Chat avec ${otherUserName}`}
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <Text>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader
          title={`Chat avec ${otherUserName}`}
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <Text>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title={`Chat avec ${otherUserName}`}
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <FlatList
          inverted
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContent}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Tapez votre message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },

  container: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CCCCCC",
    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    paddingHorizontal: 15,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: "#F08372",
    borderRadius: 20,
    padding: 10,
  },

  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  
});