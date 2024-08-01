import { StyleSheet, View, Text, TouchableOpacity, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../screens/HomeScreen';

export default function SignInScreen({ navigation }) {
    return (
        <View style= {styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.8}>
                <Icon name='arrow-left' style={styles.reply} size={30} color='black' />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TabNavigator')} style={styles.button} activeOpacity={0.8}>
                <Text style={styles.textButton}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: '1',
        flex: 1,
        backgroundColor: '#E1E1E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        // borderColor: 'red',
        // borderWidth: '1',
        alignItems: 'center',
        paddingTop: 8,
        height: 50,
        width: '70%',
        marginTop: 30,
        backgroundColor: '#49B48C',
        borderRadius: 50,
        marginBottom: 80,
    },
    reply: {
        borderColor: 'red',
        borderWidth: '1',
        marginBottom: 350,
        marginrigth: 150,
    },
});