import { StyleSheet, View, Text } from "react-native";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text>Ecran du Chat</Text>
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
