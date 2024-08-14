import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import RechercheScreen from "./screens/RechercheScreen";
import RemoterSelectedScreen from "./screens/RemoterSelectedScreen";
import ProposerScreen from "./screens/ProposerScreen";
import MessageScreen from "./screens/MessageScreen";
import ProfilScreen from "./screens/ProfilScreen";
import BlogScreen from "./screens/BlogScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import PublishScreen from "./screens/PublishScreen";
import AnnouncementScreen from "./screens/AnnouncementScreen";
import PwdScreen from "./screens/PwdScreen";
import React, { useEffect, useState } from "react";

// redux imports
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import user from "./reducers/user";

// redux-persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducers = combineReducers({ user });
const persistConfig = {
  key: "RemoteFrenchies",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

// Import des modules necessaires pour mporter une font
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Empêcher l'affichage de l'écran de chargement automatique au démarrage
SplashScreen.preventAutoHideAsync();

const fetchFonts = async () => {
  await Font.loadAsync({
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          let label = "";

          if (route.name === "Recherche") {
            iconName = "search";
            label = "RECHERCHE";
          } else if (route.name === "Proposer") {
            iconName = "hand-paper-o";
            label = "PROPOSER";
          } else if (route.name === "Message") {
            iconName = "envelope-o";
            label = "MESSAGE";
          } else if (route.name === "Profil") {
            iconName = "user-o";
            label = "PROFIL";
          } else if (route.name === "Blog") {
            iconName = "newspaper-o";
            label = "BLOG";
          }

          return (
            <View>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  lineHeight: 15,
                  marginBottom: 5,
                }}
              >
                {label}
              </Text>
              <FontAwesome
                name={iconName}
                size={size}
                color={color}
                style={{ alignSelf: "center" }}
              />
            </View>
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#88172A",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#F08372",
          height: 88,
          paddingTop: 20,
          paddingBottom: 20,
        },

        headerShown: false,
      })}
    >
      <Tab.Screen name="Recherche" component={RechercheScreen} />
      <Tab.Screen name="Proposer" component={ProposerScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Profil" component={ProfilScreen} />
      <Tab.Screen name="Blog" component={BlogScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  // Préparer et charger les fonts
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await fetchFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return null; // ou un écran de chargement personnalisé
  }

  return (
    // REMETTRE ECRAN REMOTER SELECTED AU BON ENDROIT
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Recherche" component={RechercheScreen} />
            <Stack.Screen name="RemoterSelected" component={RemoterSelectedScreen} options={{ tabBarButton: (props) => {} }} />
            <Stack.Screen name="Pwd" component={PwdScreen} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
            <Stack.Screen name="ProposerScreen" component={ProposerScreen}  />
            <Stack.Screen name="PublishScreen" component={PublishScreen}  />
            <Stack.Screen name="AnnouncementScreen" component={AnnouncementScreen} />
            <Stack.Screen name="BlogScreen" component={BlogScreen} />
          </Stack.Navigator>
          
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

