import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useStudent } from "../../../context/StudentContext";

export default function Profile() {

  const { student , setStudent } = useStudent();

  const changeName = () => {
    setStudent( { ...student, name: 'Lucy'});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Profile Header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>

        <Text style={styles.name}> {student.name} </Text>

        <Text style={styles.email}>
          {student.email}
        </Text>

        <Pressable style={styles.editButton} onPress={changeName}>
          <Text style={styles.editButtonText}>
            Edit Profile
          </Text>
        </Pressable>
      </View>

      {/* Statistics */}
      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>6</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Lessons</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>
      </View>

      {/* Personal Information */}
      <Text style={styles.sectionTitle}>
        Personal Information
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.icon}>👤</Text>

          <View>
            <Text style={styles.infoLabel}>
              Full Name
            </Text>

            <Text style={styles.infoValue}>
              Chioma Arinze
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.icon}>📧</Text>

          <View>
            <Text style={styles.infoLabel}>
              Email Address
            </Text>

            <Text style={styles.infoValue}>
              chioma@example.com
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.icon}>📱</Text>

          <View>
            <Text style={styles.infoLabel}>
              Phone Number
            </Text>

            <Text style={styles.infoValue}>
              +234 800 000 0000
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.infoRow}>
          <Text style={styles.icon}>🎓</Text>

          <View>
            <Text style={styles.infoLabel}>
              Learning Track
            </Text>

            <Text style={styles.infoValue}>
              Mobile Development
            </Text>
          </View>
        </View>
      </View>

      {/* Learning Information */}
      <Text style={styles.sectionTitle}>
        Learning Information
      </Text>

      <View style={styles.learningCard}>
        <Text style={styles.learningTitle}>
          Overall Progress
        </Text>

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>
            72% completed
          </Text>

          <Text style={styles.progressPercentage}>
            72%
          </Text>
        </View>

        <View style={styles.progressBackground}>
          <View style={styles.progressFill} />
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

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    padding: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#32063D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
  },

  name: {
    fontSize: 23,
    fontWeight: "800",
    color: "#222",
  },

  email: {
    fontSize: 13,
    color: "#888",
    marginTop: 5,
  },

  editButton: {
    backgroundColor: "#E9DDF0",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 9,
    marginTop: 18,
  },

  editButtonText: {
    color: "#32063D",
    fontWeight: "700",
    fontSize: 13,
  },

  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    marginTop: 18,
  },

  stat: {
    flex: 1,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "800",
    color: "#32063D",
  },

  statLabel: {
    fontSize: 11,
    color: "#888",
    marginTop: 4,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#E5E1E8",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#222",
    marginTop: 28,
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 18,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },

  icon: {
    fontSize: 22,
    marginRight: 15,
  },

  infoLabel: {
    fontSize: 11,
    color: "#999",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginTop: 4,
  },

  line: {
    height: 1,
    backgroundColor: "#F0EDF1",
  },

  learningCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
  },

  learningTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 15,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  progressText: {
    fontSize: 12,
    color: "#777",
  },

  progressPercentage: {
    fontSize: 12,
    fontWeight: "700",
    color: "#32063D",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#E5DDE8",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    width: "72%",
    height: "100%",
    backgroundColor: "#32063D",
    borderRadius: 10,
  },
});