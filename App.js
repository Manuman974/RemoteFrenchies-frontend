



import RemoterSelectedScreen from "./screens/RemoterSelectedScreen";
import { View, Text } from "react-native";
import PwdScreen from "./screens/PwdScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import RechercheScreen from './screens/RechercheScreen';
import ProposerScreen from './screens/ProposerScreen';
import MessageScreen from './screens/MessageScreen';
import ProfilScreen from './screens/ProfilScreen';
import BlogScreen from './screens/BlogScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import PublishScreen from './screens/PublishScreen';
import React, { useEffect, useState } from 'react';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore ({
  reducer: { user },
});

// Import des modules necessaires pour mporter une font
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Empêcher l'affichage de l'écran de chargement automatique au démarrage
SplashScreen.preventAutoHideAsync();

const fetchFonts = async () => {
  await Font.loadAsync({
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
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
                  borderColor: "blue",
                  borderWidth: 2,
                  color: "#FFFFFF",
                  fontSize: 10,
                  lineHeight: 15,
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
      <Tab.Screen
        name="Recherche"
        component={RechercheScreen}
        options={{
          headerShown: true,
        }}
      />
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
    <Provider store={store}>
      <NavigationContainer>
        
    
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Pwd" component={PwdScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Recherche" component={RechercheScreen} />
        <Stack.Screen
            name="RemoterSelected"
            component={RemoterSelectedScreen}
          />
        <Stack.Screen name="PublishScreen" component={PublishScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
