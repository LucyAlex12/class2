import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

export default function Settings() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Manage your account and app preferences
      </Text>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.settingCard}>
          <View>
            <Text style={styles.settingTitle}>Profile</Text>
            <Text style={styles.settingDescription}>
              Manage your personal information
            </Text>
          </View>
        </View>

        <View style={styles.settingCard}>
          <View>
            <Text style={styles.settingTitle}>Change Password</Text>
            <Text style={styles.settingDescription}>
              Update your account password
            </Text>
          </View>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.settingCard}>
          <View style={styles.settingText}>
            <Text style={styles.settingTitle}>Notifications</Text>
            <Text style={styles.settingDescription}>
              Receive notifications about your courses
            </Text>
          </View>

          <Switch
            value={true}
            trackColor={{
              false: "#D9D4DC",
              true: "#E9DDF0",
            }}
            thumbColor="#32063D"
          />
        </View>
      </View>

      {/* App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>

        <View style={styles.settingCard}>
          <View>
            <Text style={styles.settingTitle}>About LMS</Text>
            <Text style={styles.settingDescription}>
              Version 1.0.0
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F4F8",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#32063D",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 28,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#32063D",
    marginBottom: 10,
  },

  settingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  settingText: {
    flex: 1,
    marginRight: 12,
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2D2430",
    marginBottom: 4,
  },

  settingDescription: {
    fontSize: 13,
    color: "#888888",
    lineHeight: 19,
  },
});