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
import { login } from "../reducers/user";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [signInE_mail, setSignInE_mail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false)

  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  // Fonction pour enregistrer l'URL de la photo de profil
  const saveProfilePicture = async (url) => {
    try {
      await AsyncStorage.setItem('profile_picture', url);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'URL de la photo de profil :", error);
    }
  };

  const handleConnection = () => {
    if (!validateEmail(signInE_mail)) {
      setError("Adresse email invalide");
      return;
    }

    fetch("http://192.168.154.186:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ e_mail: signInE_mail, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from sign-in:", data);
        if (data.result) {
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
              profile_picture: data.url,
            })
          );

      // Vérifiez si data.url est défini avant de l'enregistrer
      if (data.url) {
        saveProfilePicture(data.url); // Appel de la fonction uniquement si l'URL est valide
      } else {
        console.warn("Aucune URL de photo de profil fournie.");
      }

          setSignInE_mail("");
          setSignInPassword("");
          setError("");

          navigation.navigate("TabNavigator");
        } else {
          setError("Email ou Mot de passe invalide");
        }
      });
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
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40, // Espace pour l'icône
  },
  iconButton: {
    position: "absolute",
    right: 10, // Position de l'icône
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
