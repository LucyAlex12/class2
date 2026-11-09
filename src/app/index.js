import { View, Text, Image, Pressable, StyleSheet,} from "react-native";
import { router } from "expo-router";
import { Redirect } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/pageimages/Welcome.jpeg")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>
        Grow Your Soft Skill
      </Text>

      <Text style={styles.title}>
        And
      </Text>

      <Text style={styles.title}>
        Be More Creative
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('./loginpage')}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32063D",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  image: {
    width: 260,
    height: 260,
    marginBottom: 30,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 5,
  },

  button: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 4,
    marginTop: 25,
  },

  buttonText: {
    color: "#32063D",
    fontWeight: "700",
  },
});