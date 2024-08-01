import { StyleSheet, View, Text } from "react-native";

export default function MessageScreen() {
    return (
        <View style= {styles.container}>
            <Text>Ecran de messages</Text>
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
});