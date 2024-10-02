// CustomTabBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomTabBar = ({ navigation }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Recherche')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabLabel}>RECHERCHE</Text>
          <FontAwesome name="search" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Proposer')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabLabel}>PROPOSER</Text>
          <FontAwesome name="hand-paper-o" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Message')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabLabel}>MESSAGE</Text>
          <FontAwesome name="envelope-o" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabLabel}>PROFIL</Text>
          <FontAwesome name="user-o" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Blog')}>
        <View style={styles.tabItem}>
          <Text style={styles.tabLabel}>BLOG</Text>
          <FontAwesome name="newspaper-o" size={24} color="#FFFFFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F08372',
    height: 88,
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 15,
    marginBottom: 5,
  },
});

export default CustomTabBar;