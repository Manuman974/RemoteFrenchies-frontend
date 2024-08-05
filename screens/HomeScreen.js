import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerLogo}>
        <Image style={styles.image} source={require('../assets/Logo-Remote-Frenchies.png')} />
        <Image style={styles.image1} source={require('../assets/Logo.png')} />
      </View>
      <Text style={styles.title}>Remote Frenchies,</Text>
      <Text style={styles.title1}>c'est quoi ?</Text>
      <Text style={styles.title2}>Partage tes meilleurs pratiques de télétravail selon ta discipline métier. Rencontre tes pairs qui font partie de la communauté.</Text>
      <Text style={styles.title3}>Allons coworker les uns chez les autres en rencontrant des Remote Frenchies près de chez toi.</Text>
      {/* <TextInput style={styles.input} placeholder="Nickname" /> */}
      <View style={styles.btn}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btn1}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.button1} activeOpacity={0.8}>
          <Text style={styles.textButton}>Se connecter</Text>
        </TouchableOpacity>
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
    // borderColor: 'green',
    // borderWidth: '1',
    width: 230,
    height: 90,
  },
  image1: {
    // borderColor: 'red',
    // borderWidth: '1',
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
    fontWeight: '600',
    fontSize: 16,
    paddingTop: 5,

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
