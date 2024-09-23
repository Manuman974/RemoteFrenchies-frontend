import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, autoComplete, }) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoComplete={autoComplete}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: '#E7E7E7',
        width: 290,
        height: 50,
        borderColor: '#8f8f8f',
        borderRadius: 10,
        paddingLeft: 20,
        fontFamily: "Poppins-Regular",
        fontSize: 13,
    },
});

export default CustomTextInput;