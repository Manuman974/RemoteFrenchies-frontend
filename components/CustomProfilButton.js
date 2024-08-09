import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomProfilButton = ({ onPress, title, style, textStyle, activeOpacity = 0.8 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={activeOpacity}>
            <Text style={[styles.h4]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        alignSelf: 'center',
        height: 50,
        width: '90%',
        borderTopWidth: 1,
    },
    h4: {
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold'
      },
});

export default CustomProfilButton;