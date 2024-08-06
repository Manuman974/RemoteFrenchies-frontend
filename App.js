import React from "react";
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
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Recherche') {
          iconName = 'search';
        } else if (route.name === 'Proposer') {
          iconName = 'hand-paper-o';
        } else if (route.name === 'Message') {
          iconName = 'envelope-o';
        } else if (route.name === 'Profil') {
          iconName = 'user-o';
        } else if (route.name === 'Blog') {
          iconName = 'newspaper-o';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="PublishScreen" component={PublishScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
