import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CustomHeader from "../components/CustomHeader";
import DiscussionItem from '../components/DiscussionItem';
import { fetchDiscussions } from '../services/api';

export default function MessageScreen({ navigation }) {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.value);

  const loadDiscussions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchDiscussions(user.token);
      console.log('Réponse de loadDiscussions:', JSON.stringify(response, null, 2));
      if (response.result) {
        console.log('Discussions reçues:', JSON.stringify(response.data.discussions, null, 2));
        setDiscussions(response.data.discussions);
      } else {
        setError('Erreur lors du chargement des discussions');
      }
    } catch (error) {
      console.error('Erreur lors du chargement des discussions:', error);
      setError(error.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [user.token]);

  useFocusEffect(
    useCallback(() => {
      console.log('MessageScreen focused, loading discussions');
      loadDiscussions();
    }, [loadDiscussions])
  );

  const handleDiscussionPress = (discussion) => {
    navigation.navigate('TchatScreen', { 
      discussionId: discussion._id,
      otherUser: discussion.user_1._id === user._id ? discussion.user_2 : discussion.user_1,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Messages" icon="envelope-o" />
        <View style={styles.centerContainer}>
          <Text>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <CustomHeader title="Messages" icon="envelope-o" />
        <View style={styles.centerContainer}>
          <Text>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Messages" icon="envelope-o" />
      <View style={styles.container}>
        {discussions && discussions.length > 0 ? (
          <FlatList
            data={discussions}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <DiscussionItem 
                discussion={item} 
                onPress={() => handleDiscussionPress(item)}
                currentUserId={user.userId}
              />
            )}
          />
        ) : (
          <Text style={styles.noDiscussions}>Aucune discussion trouvée</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDiscussions: {
    textAlign: 'center',
    marginTop: 20,
  },
});