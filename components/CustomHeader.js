import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomHeader = ({ title, icon, showLogoutButton, onLogoutPress, onPress }) => {
    return (
        <View style={styles.headerWrapper}>
            <View style={styles.header}>
                <View style={styles.iconTextContainer}>
                <TouchableOpacity onPress={onPress}>
                    <Icon name={icon} style={styles.icon} size={25} color="#49B48C" />
                    </TouchableOpacity>
                    <Text style={styles.h1}>{title}</Text>
                </View>

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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
        
    },

    header: {
        marginTop: 50,
        marginLeft:20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
    },

    iconTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
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
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    logoutText: {
        color: "#fff",
        fontFamily: "Poppins-SemiBold",
        fontSize: 12,
        textAlign: 'center'
    },

});

export default CustomHeader;