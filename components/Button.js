import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function Button({ onPress, style, Text }) {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={style}
                activeOpacity={0.8}>
                <Text style={styles.textButton}></Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    button: {
        // borderColor: 'red',
        // borderWidth: '1',
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 40,
        backgroundColor: '#49B48C',
        borderRadius: 40,
    },
    textButton: {
        color: 'white',
        paddingTop: 7,

    },
})