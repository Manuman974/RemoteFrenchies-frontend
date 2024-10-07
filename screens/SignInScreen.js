import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { login, setPropositions } from '../reducers/user'; // Assurez-vous d'avoir une action setPropositions dans votre reducer
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '@env';
import * as Location from 'expo-location';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signInE_mail, setSignInE_mail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleSearchInProximity = async (latitude, longitude) => {
    try {
      const response = await fetch(`${API_URL}/proposition/searchInProximity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude, radius: 10000 }), // 10km de rayon
      });
    
      const data = await response.json();
      if (data.result) {
        console.log("PROPOSITIONS data :", data.propositionData);
        dispatch(setPropositions(data.propositionData));
      } else {
        console.log("Aucune proposition trouvée à proximité");
        dispatch(setPropositions([]));
      }
    } catch (error) {
      console.error("Erreur lors de la recherche des propositions à proximité:", error);
      dispatch(setPropositions([]));
    }
  };

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  // Fonction pour enregistrer l'URL de la photo de profil
  const saveProfilePicture = async (url) => {
    try {
      await AsyncStorage.setItem('profile_picture', url);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'URL de la photo de profil :", error);
      console.log("Type de profile_picture:", typeof data.profile_picture);
      console.log("Contenu de profile_picture:", data.profile_picture);
    }
  };

  const handleConnection = async () => {
    if (!validateEmail(signInE_mail)) {
      setError("Adresse email invalide");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e_mail: signInE_mail, password: signInPassword }),
      });

      const data = await response.json();
      console.log("Data received from sign-in:", data);

      if (data.result) {
        // Vérification de la photo de profil
        if (data.profile_picture && data.profile_picture.trim() !== '') {
          console.log("URL de la photo de profil:", data.profile_picture);
          await saveProfilePicture(data.profile_picture);
        } else {
          console.warn("Aucune URL de photo de profil valide fournie.");
        }

        // Vérification des photos supplémentaires
        if (data.photos && data.photos.length > 0) {
          console.log("Photos de l'utilisateur:", data.photos);
        } else {
          console.log("Aucune photo supplémentaire pour l'utilisateur.");
        }

        // Dispatch des données utilisateur
        dispatch(
          login({
            userId: data.userId,
            firstname: data.firstname,
            lastname: data.lastname,
            job: data.job,
            business: data.business,
            main_adress: data.main_adress,
            e_mail: signInE_mail,
            token: data.token,
            profile_picture: data.profile_picture,
            photos: data.photos || [], // Ajout des photos supplémentaires
            on_boarding: data.on_boarding || {}, // Ajout des préférences d'onboarding
          })
        );

        // Obtenir la position actuelle de l'utilisateur
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Rechercher les propositions à proximité
            await handleSearchInProximity(latitude, longitude);
          } else {
            console.log("Permission de localisation non accordée");
          }
        } catch (error) {
          console.error("Erreur lors de l'obtention de la localisation:", error);
        }

        navigation.replace('WelcomeScreen');
      } else {
        // Gestion des erreurs de connexion
        console.error("Erreur de connexion:", data.error);
        setError("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Une erreur est survenue lors de la connexion");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.8}
        >
          <Icon
            name="arrow-left"
            style={styles.reply}
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <Image style={styles.image} source={require("../assets/Logo 1.png")} />
      </View>
      <Text style={styles.h1}>Renseigne tes identifiants</Text>
      <View style={styles.input}>
        <CustomTextInput
          placeholder="Adresse email"
          value={signInE_mail}
          onChangeText={setSignInE_mail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <View style={styles.passwordContainer}>
          <CustomTextInput
            placeholder="Mot de passe"
            value={signInPassword}
            onChangeText={setSignInPassword}
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.iconButton}>
            <Icon name={passwordVisible ? "eye-slash" : "eye"} size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.errorText}>{error}</Text>
      <CustomButton
        title="Continuer"
        onPress={handleConnection}
        style={styles.button}
        textStyle={styles.textButton}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40, // Espace pour l'icône
  },
  iconButton: {
    position: "absolute",
    right: 20, // Position de l'icône
  },

  button: {
    // borderColor: 'red',
    // borderWidth: '1',
    alignItems: "center",
    paddingTop: 8,
    height: 50,
    width: "70%",
    marginTop: 50,
    backgroundColor: "#49B48C",
    borderRadius: 50,
    marginBottom: 150,
  },

  h1: {
    marginTop: 30,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    alignSelf: "center",
    width: "80%",
  },

  textButton: {
    color: "#ffffff",
    height: 30,
    fontSize: 16,
    paddingTop: 5,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  text: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 190,
    height: 92,
    fontFamily: "Poppins-SemiBold",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    marginTop: 20,
  },
  input: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 290,
    height: 127,
    justifyContent: "space-between",
    marginTop: 60,
  },
  nom: {
    margin: 10,
    backgroundColor: "#DDD",
    borderWidth: 1,
    borderColor: "#8f8f8f",
    width: 290,
    height: 50,
    borderRadius: 10,
    padding: 6,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    alignSelf: "center",
  },
  icon: {
    marginTop: 50,
    width: "100%",
    height: 190,
    paddingLeft: 20,
  },

  image: {
    resizeMode: "contain",
    width: 250,
    alignSelf: "center",
  },

  errorText: {
    color: "red",
    marginTop: 10,
  },
});
