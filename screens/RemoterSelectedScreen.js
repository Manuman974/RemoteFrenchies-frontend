import { StyleSheet, View, Text } from "react-native";

export default function RemoterSelectedScreen() {
  return (
    <View style={styles.container}>
      <Text>Ecran Remoter sélectionné</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
