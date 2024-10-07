import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';


  export default function WelcomeScreen({ navigation }) {
    const user = useSelector((state) => state.user);
    
    useEffect(() => {
        // Redirection après 3 secondes
        const timer = setTimeout(() => {
          navigation.replace('TabNavigator');
        }, 2000);
    
        return () => clearTimeout(timer); // Nettoie le timer quand le composant est démonté
      }, [navigation]);

    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={require('../assets/Logo-Remote-Frenchies-WP.png')} />
          <View>
          <Text style={[styles.h1, { marginBottom: -5, marginTop: -50 }]}>Bienvenue</Text>
          <Text style={styles.h2}>{user.value.firstname} {user.value.lastname}</Text>
          </View>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#FFFFFF',
      justifyContent: "center",
  
    },
  
    image: {
      resizeMode: 'contain',
      width: 220,
      alignSelf: 'center',
      marginTop: -100,
    },
  
    h1: {
        fontSize: 28,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
        alignSelf: "center",
    },

    h2: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Poppins-Regular",
        alignSelf: "center",
    },
  
  });