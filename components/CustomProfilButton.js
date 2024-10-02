import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";

const CustomProfilButton = ({ onPress, icon, style, title, activeOpacity = 0.8 }) => {
    return (
        <View>
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={activeOpacity}>
            <Icon name={icon} style={styles.icon} size={22} color="#49B48C" />
            <Text style={[styles.h4]}>{title}</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "#DDDDDD",

    },

    button: {
alignItems: "center",
        padding: 10,
        flexDirection: "row",
        width: "90%",
        alignSelf: 'center',
        height: 60,
        borderBottomWidth : 1,
    },
    h4: {
        marginLeft: 20,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold'
      },
});

export default CustomProfilButton;