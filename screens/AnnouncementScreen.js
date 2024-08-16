import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { removePhoto } from '../reducers/user';
import Icon from "react-native-vector-icons/FontAwesome";
//import Icon1 from "react-native-vector-icons/Evillcons";

export default function AnnouncementScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);

    const photos = user.photos.map((photoUrl, index) => {
        return (
            <View key={index} style={styles.annonceContainer}>
                <Image source={{ uri: photoUrl }} style={styles.photo} />
                <View style={styles.annonceFooter}>
                    <Text style={styles.locationText}>
                        <Icon name="map-marker" size={16} color="black" /> {user.city}
                    </Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Proposer")}
                            style={styles.modifyButton}
                        >
                            <Text style={styles.modifyButtonText}>Créer une autre annonce</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(removePhoto(photoUrl))}>
                            <Icon name="trash-o" size={24} color="#FF6F61" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    });
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("TabNavigator",{screen:"ProfilScreen"})}
                    activeOpacity={0.8}
                >
                    <Icon
                        name="arrow-left"
                        style={styles.reply}
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mes annonces</Text>
            </View>
            <View style={styles.separator}></View>
            <Text style={styles.annonceCount}>{photos.length} annonces</Text>
            <ScrollView>
                {photos}
            </ScrollView>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 60,
        marginRight: 90,
    },
    headerTitle: {
        fontSize: 24,
        // fontWeight: 400,
        marginLeft: 16,
    },
    separator: {
        width: '80%',
        height: 2,
        backgroundColor: '#8f8f8f',
        marginVertical: 20,
        alignSelf: 'center',
    },
    annonceCount: {
        textAlign: 'right',
        marginBottom: 10,
        marginLeft: 180,
        fontSize: 16,
        color: 'black',
    },
    annonceContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 16,
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    annonceFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    locationText: {
        fontSize: 16,
        color: '#333',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modifyButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginRight: 10,
    },
    modifyButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
})