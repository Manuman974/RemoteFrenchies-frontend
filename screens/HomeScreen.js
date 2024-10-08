import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import * as Google from 'expo-auth-session/providers/google';
import Icon from "react-native-vector-icons/FontAwesome5";

export default function HomeScreen({ navigation }) {
  const [ response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '869503492853-6einm694em7llj1j0haos7ed6iiapv1u.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/manuelmanriquecobos/remote-frenchies'
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log(id_token);
    }
  }, [response]);


  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <Image style={styles.image} source={require('../assets/Logo 1.png')} />
        <Image style={styles.image1} source={require('../assets/Logo.png')} />
      </View>
      <Text style={styles.h1}>Remote Frenchies, c'est quoi ?</Text>
      <Text style={styles.body}>Partage tes meilleurs pratiques de télétravail selon ta discipline métier. Rencontre tes pairs qui font partie de la communauté. Allons coworker les uns chez les autres en rencontrant des Remote Frenchies près de chez toi.</Text>
      <View style={styles.btn}>
        <CustomButton
          title="S'inscrire"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
      <View style={styles.btn1}>
        <CustomButton
          title="Se connecter"
          onPress={() => navigation.navigate('SignIn')}
        />
<TouchableOpacity
          style={styles.buttonGoogle}
          onPress={() => {
            promptAsync();
          }}
        >
          <Icon name="google" size={20} color="#000000" style={styles.icon} />
          <Text style={styles.textButton}>Se connecter avec Google</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  
  image: {
    resizeMode: 'contain',
    width: 200,
    alignSelf: 'center',

  },
  image1: {
    resizeMode: 'contain',
    width: 200,
    alignSelf: 'center',
  },

  h1: {
    width: '80%',
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    alignSelf: 'center',
  },

  body: {
    width: '80%',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center'
  },

  btn1: {
    width: '100%',
    height: 80,
    alignItems: 'center',

  },
  btn: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    marginBottom: -10,
  },

  buttonGoogle: {
    alignItems: 'center',
    paddingVertical: 5,
    width: '70%',
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',

  },
  textButton: {
    color: 'black',
    fontSize: 11,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    
  },
  icon: {
    marginRight: 10,
  },



});
