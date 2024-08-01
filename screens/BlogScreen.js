import { StyleSheet, View, Text } from "react-native";

export default function BlogScreen() {
    return (
        <View style= {styles.container}>
            <Text>Ecran de blog</Text>
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