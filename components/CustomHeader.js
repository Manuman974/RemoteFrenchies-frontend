import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomHeader = ({ title, icon, showLogoutButton, onLogoutPress, onPress }) => {
    return (
        <View style={styles.headerWrapper}>
            <View style={styles.header}>
                {/* Container pour l'icône et le texte */}
                <View style={styles.iconTextContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Icon name={icon} style={styles.icon} size={25} color="#49B48C" />
                    </TouchableOpacity>
                    <Text style={styles.h1}>{title}</Text>
                </View>

                {/* Bouton Logout */}
                {showLogoutButton && (
                    <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
                        <Text style={styles.logoutText}>Déconnection</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    headerWrapper: {
        flexDirection: "column",
        marginBottom: 0,
        backgroundColor: '#F3FFFB',
        width: "100%",
        shadowColor: "#000",      // Couleur de l'ombre (noir très léger)
        shadowOffset: { width: 0, height: 4 }, // Décalage vertical de l'ombre
        shadowOpacity: 1,       // Opacité de l'ombre (faible pour une ombre légère)
        shadowRadius: 4,          // Rayon de l'ombre (contrôle la diffusion)
        elevation: 10,
        
    },

    header: {
        marginTop: 50,
        marginLeft:20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Espace entre l'icône-texte et le bouton Logout
        width: "100%", // Prend toute la largeur de l'écran
        paddingHorizontal: 20, // Ajoute un peu de marge sur les côtés
    },

    iconTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, // Permet à ce conteneur de prendre toute la place disponible
    },

    icon: {
        marginRight: 5,
    },

    h1: {
        marginTop: 5,
        marginLeft: 10,
        fontSize: 22,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
        alignSelf: "center",
    },

    logoutButton: {
        width: 130,
        height: 40,
        marginRight: 30,
        backgroundColor: "#49B48C",
        padding: 10,
        borderRadius: 40,
        justifyContent: 'center', // Centre le texte dans le bouton
        alignItems: 'center', // Centre le texte dans le bouton
    },

    logoutText: {
        color: "#fff",
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
        textAlign: 'center'
    },

});

export default CustomHeader;