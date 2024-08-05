//@ts-nocheck

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { CheckBox, Button, ThemeProvider } from '@rneui/themed';
import React, { useState } from 'react';

export default function OnboardingScreen({ navigation }) {

  const globalStyle = require('../globalStyle');

  // Initialisez l'état avec un objet où les clés sont les identifiants des checkboxes
  const initialCheckboxes = {
    remote: false,
    hybrid: false,
    interested_in_teleworking: false,
    encounter: false,
    share_skills: false,
    share_hobbies: false,
    welcome_remoters: false,
    go_to_remoters: false,
    both: false,
  };

  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  // Mise à jour de l'état avec setCkeckboxes //
  const toggleCheckbox = (key) => {
    setCheckboxes(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };


  //   fetch('http://192.168.94.186:3000/users/on_boarding', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ acompleter })
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.result) {
  // dispatch(onboarding)({acompleter})
  //           navigation.navigate('Recherche')
  //         } else {
  //           setError('Cocher les cases qui vous correspond')
  //         }
  //       })
  //     });



  return (
    <ScrollView style={styles.scrollView} >
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={require('../assets/Logo 1.png')} />
          <View style={styles.title}>
            <Text style={globalStyle.h1} >Apprenons à se connaitre</Text>
          </View>
        </View>

        <View style={styles.containerInfos}>
          <Text style={globalStyle.h2}>Quel est ton mode de télétravail ?</Text>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.remote} // Identifiant unique dans initialCheckboxes
              onPress={() => toggleCheckbox('remote')} // Identifie la checkbox grâce à son argument 'remote'
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Remote</Text>
          </View>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.hybrid}
              onPress={() => toggleCheckbox('hybrid')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Hybride</Text>
          </View>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.interested_in_teleworking}
              onPress={() => toggleCheckbox('interested_in_teleworking')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Interréssé par le télétravail</Text>
          </View>

        </View>
        <View style={styles.containerInfos}>
          <Text style={globalStyle.h2}>Pourquoi utilise-tu Remote Frenchies ?</Text>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.encounter}
              onPress={() => toggleCheckbox('encounter')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Rencontrer d'autres télétravailleur</Text>
          </View>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.share_skills}
              onPress={() => toggleCheckbox('share_skills')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Partager ses compétences</Text>
          </View>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.share_hobbies}
              onPress={() => toggleCheckbox('share_hobbies')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Partager des hobbies</Text>
          </View>

        </View>
        <View style={styles.containerInfos}>
          <Text style={globalStyle.h2}>Quel type de Remote es-tu ?</Text>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.welcome_remoters}
              onPress={() => toggleCheckbox('welcome_remoters')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>J'aime accueillir des télétravailleurs</Text>
          </View>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.go_to_remoters}
              onPress={() => toggleCheckbox('go_to_remoters')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>J'aime aller chez d'autres télétravailleurs</Text>
          </View>
          <View style={styles.containerCheckBox}>
            <CheckBox
              checked={checkboxes.both}
              onPress={() => toggleCheckbox('both')}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#49B48C"
            />
            <Text style={globalStyle.h5}>Les deux</Text>
          </View>
        </View>
        <View style={styles.btn1}>
          <TouchableOpacity onPress={() => navigation.navigate('Recherche')} style={styles.button1} activeOpacity={0.8}>
            <Text style={styles.textButton}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerInfos: {
    marginTop: 20,
    width: '80%',
    marginBottom: 10,
    borderBottomWidth: 1,
  },

  containerCheckBox: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginLeft: -25,
  },

  image: {
    resizeMode: 'contain',
    width: 250,
    alignSelf: 'center',
    marginTop: 60,
  },

  title: {
    width: '80%',
    marginTop: 30,
    alignSelf: 'center',
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

});