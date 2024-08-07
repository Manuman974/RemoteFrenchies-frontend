import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, style, textStyle, activeOpacity = 0.8 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]} activeOpacity={activeOpacity}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CustomButton;