import { StyleSheet, View, Text } from "react-native";

export default function AnnouncementScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Mes annonces</Text>
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