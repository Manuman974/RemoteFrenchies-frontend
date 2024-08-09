import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default function PublishScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={require('../assets/Image-annonce-publiee.png')} />
        <View style={styles.title}>
          <Text style={styles.h1} >Votre annonce a bien été publiée</Text>
        </View>
        <View style={styles.btn1}>
          <TouchableOpacity onPress={() => navigation.navigate('Announcement')} style={styles.button1} activeOpacity={0.8}>
            <Text style={styles.textButton}>Voir mes annonces</Text>
          </TouchableOpacity>
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

  },

  image: {
    resizeMode: 'contain',
    width: 300,
    alignSelf: 'center',
    marginTop: 100,
  },

  title: {
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
    textAlign: 'center',
  },

  h1: {
    fontSize: 24,
    textAlign: 'center',
},
  btn1: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    marginBottom: 50,
  },

  button1: {
    alignItems: 'center',
    paddingTop: 8,
    height: 50,
    width: '60%',
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

});