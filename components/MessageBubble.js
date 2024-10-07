import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ text, isSentByUser, date, status }) => {
  return (
    <View style={[
      styles.messageContainer,
      isSentByUser ? styles.sentContainer : styles.receivedContainer
    ]}>
      <View style={[
        styles.messageBubble,
        isSentByUser ? styles.sentBubble : styles.receivedBubble
      ]}>
        <Text style={[
          styles.messageText,
          isSentByUser ? styles.sentMessageText : styles.receivedMessageText
        ]}>{text}</Text>
      </View>
      <View style={styles.messageInfo}>
        <Text style={styles.dateText}>
          {new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </Text>
        {isSentByUser && status && status !== 'sent' && (
          <Text style={styles.statusText}>
            {status === 'sending' ? 'Envoi...' : 'Échec'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  sentContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  receivedContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 10,
    maxWidth: '100%',
  },
  sentBubble: {
    backgroundColor: "#49B48C",
    borderBottomRightRadius: 0,
  },
  receivedBubble: {
    backgroundColor: "#E4E6EB",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  sentMessageText: {
    color: "#FFFFFF",
  },
  receivedMessageText: {
    color: "#000000",
  },
  messageInfo: {
    flexDirection: 'row',
    marginTop: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  statusText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
});

export default MessageBubble;