import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const DiscussionItem = ({ discussion, onPress, currentUserId }) => {
  const user1 = discussion.user_1 || {};
  const user2 = discussion.user_2 || {};
  
  const otherUser = user1._id === currentUserId ? user2 : user1;
  
  const userName = otherUser ? `${otherUser.firstname || ''} ${otherUser.lastname || ''}`.trim() : 'Utilisateur inconnu';
  const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
  const profilePicture = otherUser.profile_picture;

  const lastMessage = discussion.message && discussion.message.length > 0
    ? discussion.message[discussion.message.length - 1].message
    : 'Aucun message';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#49B48C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 5,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
});

export default DiscussionItem;