import { StyleSheet, View, Text } from "react-native";

export default function ProfilScreen() {
    return (
        <View style= {styles.container}>
            <Text>Ecran de profil</Text>
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