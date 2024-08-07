import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

const CustomTextInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, autoComplete }) => {
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
        backgroundColor: '#DDD',
        height: 50,
        borderColor: '#8f8f8f',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
    },
});

export default CustomTextInput;