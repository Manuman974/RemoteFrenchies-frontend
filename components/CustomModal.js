import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomModal = ({ visible, onClose, onCameraPress, onGalleryPress }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Choisissez une option</Text>
                    <TouchableOpacity onPress={onCameraPress} style={styles.button}>
                        <Text style={styles.buttonText}>Prendre une photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onGalleryPress} style={styles.button}>
                        <Text style={styles.buttonText}>Choisir dans la galerie</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modalContainer: {
        width: 300,
        height: "45%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        marginTop: 30,
        marginBottom: 30,
        fontFamily: "Poppins-SemiBold",
    },
    button: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 30,
        backgroundColor: "#49B48C",
        width: "90%",
        alignItems: "center",
    },

cancelButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#F08372",
    width: "70%",
    alignItems: "center",
},

    buttonText: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "Poppins-SemiBold",
        alignItems: "center",
    },
});

export default CustomModal;