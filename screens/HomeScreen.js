import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerLogo}>
        <Image style={styles.image} source={require('../assets/Logo 1.png')} />
        <Image style={styles.image1} source={require('../assets/Logo.png')} />
      </View>
      <Text style={styles.h1}>Remote Frenchies, c'est quoi ?</Text>
      <Text style={styles.body}>Partage tes meilleurs pratiques de télétravail selon ta discipline métier. Rencontre tes pairs qui font partie de la communauté.</Text>
      <Text style={styles.body}>Allons coworker les uns chez les autres en rencontrant des Remote Frenchies près de chez toi.</Text>
      <View style={styles.btn}>
      <CustomButton
        title="S'inscrire"
        onPress={() => navigation.navigate('SignUp')}
        style={styles.button}
        textStyle={styles.textButton}
      />
      </View>
      <View style={styles.btn1}>
      <CustomButton
        title="Se connecter"
        onPress={() => navigation.navigate('SignIn')}
        style={styles.button}
        textStyle={styles.textButton}
      />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogo: {
    // borderColor: 'green',
    // borderWidth: '1',

  },
  image: {
    resizeMode: 'contain',
    width: 250,
    alignSelf: 'center',
    marginTop: 30,
  },
  image1: {
    marginTop: 20,
    width: 210,
    height: 150,
  },
  title: {
    // borderColor: 'red',
    // borderWidth: '1',
    width: '100%',
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  title1: {
    // borderColor: 'green',
    // borderWidth: '1',
    width: '100%',
    height: 50,
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  },

  h1: {
    marginTop: 10,
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

  title2: {
    // borderColor: 'red',
    // borderWidth: '1',
    width: '70%',
    height: 100,
    textAlign: 'center',
  },
  title3: {
    // borderColor: 'red',
    // borderWidth: '1',
    width: '60%',
    textAlign: 'center',
  },
  // input: {
  //   width: '80%',
  //   marginTop: 25,
  //   borderBottomColor: '#ec6e5b',
  //   borderBottomWidth: 1,
  //   fontSize: 18,
  // },
  button: {
    // borderColor: 'red',
    // borderWidth: '1',
    alignItems: 'center',
    paddingTop: 8,
    height: 50,
    width: '70%',
    marginTop: 30,
    backgroundColor: '#49B48C',
    borderRadius: 50,
    marginBottom: 80,
  },
  button1: {
    // borderColor: 'red',
    // borderWidth: '1',
    alignItems: 'center',
    paddingTop: 8,
    height: 50,
    width: '70%',
    marginTop: 30,
    backgroundColor: '#49B48C',
    borderRadius: 50,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontSize: 16,
    paddingTop: 5,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',

  },
  btn1: {
    // borderColor: 'red',
    // borderWidth: '1',
    width: '100%',
    height: 80,
    alignItems: 'center',
  },
  btn: {
    // borderColor: 'red',
    // borderWidth: '1',
    width: '100%',
    height: 80,
    alignItems: 'center',
  },
});
