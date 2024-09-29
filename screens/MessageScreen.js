import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import CustomHeader from "../components/CustomHeader";
import Pusher from 'pusher-js/react-native';
import { KEY, CLUSTER } from '@env';

export default function MessageScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
      // Appeler fetchMessages lors du chargement du composant
  fetchMessages();

    const pusher = new Pusher(KEY, {
      cluster: CLUSTER,
      encrypted: true,
    });
  
    const channel = pusher.subscribe(`discussion-${user.userId}`);
  
    channel.bind('message-event', function(data) {
      console.log('Message reçu:', data.message);
      // Mettez à jour l'état des messages ici
      setMessages(prevMessages => [...prevMessages, data.message]);
    });
  
    // Nettoyer à la fin de l'utilisation
    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`discussion-${user.userId}`);
    };
  }, [user.userId]);


  const fetchMessages = () => {
    // Faire une requête GET au serveur pour récupérer les messages de l'utilisateur actuel
    fetch(`http://192.168.154.186:3000/users/messages/${user.token}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }, // Indique que la requête et la réponse doivent être au format JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        if (data && data.length > 0) {
            setMessages(
                data.map((discussion) => {
        const lastMessage = discussion.message[discussion.message.length - 1]; // Le dernier message de la discussion
        return {
          id: discussion._id,
          lastMessage: lastMessage ? lastMessage.message : "No messages yet",
          messageCount: discussion.message.length,
        };
      })
            );
        } else {
            console.log('No discussions found.');
        }
    })
    .catch((error) => {
        console.error('Error fetching messages:', error);
    });
  }

  // Composant fonctionnel pour restituer un élément de message individuel
  const MessageItem = ({ name, job, messagesCount }) => (
    <TouchableOpacity onPress={() => navigation.navigate("TchatScreen", { otherUserId: utilisateurId })}>
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
            <Text style={styles.messageCount}>
              {messagesCount.toString().padStart(2, "0")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

    // Fonction pour récupérer les messages du serveur
    // const fetchMessages = () => {
    //   const userId = user ? user.userId : null;; // Assurez-vous que user et userId existent
    //   console.log('Token used for fetching messages:', user.token);
    //   console.log('UserId:', userId);

    //   if (!userId) {
    //     console.error('userId is undefined, cannot fetch messages.');
    //     return;
    //   }

    //   // Ajoute user.id pour passer l'ID utilisateur dans l'URL
    //   fetch(`http://192.168.154.186:3000/discussions/${user.token}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     }
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //       }
    //       return response.json();
    //     })
    //     .then((data) => {
    //       console.log('Received data:', data)
    //       console.log(data.discussion);
    //       if (data.result && data.discussions.length > 0) {
    //         // Mettez à jour l'état des discussions
    //         setMessages(
    //           data.discussions.map((discussion) => {
    //             console.log('Discussion:', discussion); // Ajouté pour afficher la discussion complète
    //             const otherUser = discussion.user_2._id
    //             console.log('Other User:', otherUser); // Vérifiez la valeur de otherUser

    //             return {
    //                 id: discussion._id,
    //                 lastMessage: discussion.message[discussion.message.length - 1]?.message || 'No messages yet',
    //                 otherUser: otherUser, // Assurez-vous que cela n'est pas undefined
    //                 messageCount: discussion.message.length,
    //             };
    //           })
    //         );
    //       } else {
    //         console.log('No discussions found.');
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error fetching discussions:', error);
    //     });
    // };


  // // Composant fonctionnel pour restituer un élément de message individuel
  // const MessageItem = ({ lastMessage, otherUser, messageCount }) => (
  //   <View style={styles.messageContainer}>
  //   <Text style={styles.messageText}>{lastMessage}</Text>
  //   <Text style={styles.authorText}>
  //   {otherUser ? `${otherUser.firstname} ${otherUser.lastname}` : 'Utilisateur non trouvé'}
  //   </Text>
  //   <Text style={styles.countText}>{messageCount}</Text>
  // </View>
  // );

    return (
        <SafeAreaView style={styles.safeArea}>
                     <View>
                <CustomHeader
                    title="Message"
                    icon="envelope-o"
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <MessageItem       
                        id={item.id}  // Assurez-vous de passer l'ID
                        message={item.message}
                        author={item.author}
                        messagesCount={item.messageCount} />
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
        backgroundColor: "#ffffff",
        marginTop:50,
        borderBottomWidth:2,
        borderColor:'#DDDDDD',
      },

    header: {
        marginTop: 60,
        marginLeft: 30,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
      },

reply: {
marginBottom:5,
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

