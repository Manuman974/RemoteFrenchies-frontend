import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomHeader from "../components/CustomHeader";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";
import CustomTabBar from "../components/CustomTabBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../components/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, addPhotoProfile } from "../reducers/user";
import { API_URL } from "@env";

const ModifyProfilScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [firstname, setFirstname] = useState(user.firstname || "");
  const [lastname, setLastname] = useState(user.lastname || "");
  const [job, setJob] = useState(user.job || "");
  const [email, setEmail] = useState(user.e_mail || "");
  const [business, setBusiness] = useState(user.business || "");
  const [city, setCity] = useState(user.city || "");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fonction pour charger la photo de profil depuis AsyncStorage
  const loadProfilePicture = async () => {
    const profilePicture = await AsyncStorage.getItem("profile_picture");
    if (profilePicture) {
      dispatch(addPhotoProfile(profilePicture)); // Met à jour l'état Redux
    }
  };

  useEffect(() => {
    loadProfilePicture();
  }, []);

  const handleCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Autorisez-vous Remote frenchies à accéder à votre appareil photo");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.7,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const handleGallery = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Autorisez-vous Remote frenchies à accéder à votre galerie");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.7,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };

  const uploadImage = async (uri) => {
    setLoading(true); // Démarre le chargement
    const formData = new FormData();
    formData.append("photoFromFront", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    formData.append("Token", user.token);

    fetch(`${API_URL}/profile`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then(async (data) => {
        setLoading(false); // Arrête le chargement
        if (data && data.result) {
          dispatch(addPhotoProfile(data.url));
          await AsyncStorage.setItem("profile_picture", data.url);
        } else {
          console.error("Échec du téléchargement de la photo");
        }
      })
      .catch((error) => {
        setLoading(false); // Arrête le chargement en cas d'erreur
        console.error("Erreur de fetch :", error);
      });
  };

  const handleUpdateProfile = () => {
    const updatedUser = {
      firstname,
      lastname,
      job,
      e_mail: email,
      business,
      city,
    };

    fetch(`${API_URL}/users/update/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(updateProfile(updatedUser));
          navigation.goBack();
        } else {
          alert("Erreur lors de la mise à jour");
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <View>
          <CustomHeader
            title="Modifier mon profil"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <View style={styles.profilContainer}>
            {user.profile_picture ? (
              <Image
                source={{ uri: user.profile_picture }}
                style={styles.profilImage}
              />
            ) : (
              <Icon
                name="user"
                style={styles.profilIcon}
                size={80}
                color="#49B48C"
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.modifyProfil}
          >
            <Text style={styles.body2}> Modifier ma photo</Text>
            <Icon
              name="pencil"
              style={styles.reply}
              size={20}
              color="#49B48C"
            />
          </TouchableOpacity>
          {loading ? <ActivityIndicator size="large" color="#49B48C" /> : null}
          <Text style={styles.sectionTitle1}>Mes informations</Text>
          <CustomTextInput
            placeholder="Prénom"
            value={firstname}
            onChangeText={setFirstname}
          />

          <CustomTextInput
            placeholder="Nom"
            value={lastname}
            onChangeText={setLastname}
          />
          <CustomTextInput
            placeholder="Métier"
            value={job}
            onChangeText={setJob}
          />
          <CustomTextInput
            placeholder="Entreprise"
            value={business}
            onChangeText={setBusiness}
          />
          <CustomTextInput
            placeholder="Ville"
            value={city}
            onChangeText={setCity}
          />
          <CustomButton
            title="Sauvegarder"
            onPress={handleUpdateProfile}
            style={styles.button}
            textStyle={styles.textButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCameraPress={handleCamera}
        onGalleryPress={handleGallery}
      />
      <CustomTabBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  profilIcon: {
    marginTop: 50,
    backgroundColor: "#DDDDDD",
    width: 150,
    height: 150,
    padding: 30,
    paddingHorizontal: 45,
    alignSelf: "center",
    borderRadius: 100,
  },

  profilImage: {
    marginTop: 50,
    width: 150,
    height: 150,
    padding: 30,
    paddingHorizontal: 45,
    alignSelf: "center",
    borderRadius: 100,
  },

  profilContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "80%",
  },

  body2: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },

  modifyProfil: {
    width: "45%",
    alignSelf: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 50,
  },

  sectionTitle1: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default ModifyProfilScreen;
