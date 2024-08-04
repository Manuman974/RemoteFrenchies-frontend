import { StyleSheet, View, Text } from "react-native";

export default function PwdScreen() {
    return (
        <View style={styles.container}>
            <Text>Pwd</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})