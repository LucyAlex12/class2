import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Courses() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Page Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Courses</Text>

        <Text style={styles.subtitle}>
          Continue learning and build your skills.
        </Text>
      </View>

      {/* Course 1 */}
      <Pressable style={styles.courseCard}>
        <View style={styles.courseImage}>
          <Text style={styles.imageText}>JS</Text>
        </View>

        <View style={styles.courseContent}>
          <Text style={styles.category}>PROGRAMMING</Text>

          <Text style={styles.courseTitle}>
            JavaScript Essentials
          </Text>

          <Text style={styles.courseInfo}>
            12 Lessons • Beginner
          </Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressText}>82% completed</Text>

            <Text style={styles.progressPercentage}>82%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: "82%" },
              ]}
            />
          </View>

          <Pressable style={styles.continueButton}>
            <Text style={styles.buttonText}>
              Continue Learning
            </Text>
          </Pressable>
        </View>
      </Pressable>

      {/* Course 2 */}
      <Pressable style={styles.courseCard}>
        <View style={styles.courseImage}>
          <Text style={styles.imageText}>RN</Text>
        </View>

        <View style={styles.courseContent}>
          <Text style={styles.category}>
            MOBILE DEVELOPMENT
          </Text>

          <Text style={styles.courseTitle}>
            React Native Development
          </Text>

          <Text style={styles.courseInfo}>
            15 Lessons • Intermediate
          </Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressText}>75% completed</Text>

            <Text style={styles.progressPercentage}>75%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: "75%" },
              ]}
            />
          </View>

          <Pressable style={styles.continueButton}>
            <Text style={styles.buttonText}>
              Continue Learning
            </Text>
          </Pressable>
        </View>
      </Pressable>

      {/* Course 3 */}
      <Pressable style={styles.courseCard}>
        <View style={styles.courseImage}>
          <Text style={styles.imageText}>UI</Text>
        </View>

        <View style={styles.courseContent}>
          <Text style={styles.category}>DESIGN</Text>

          <Text style={styles.courseTitle}>
            UI Design Basics
          </Text>

          <Text style={styles.courseInfo}>
            10 Lessons • Beginner
          </Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressText}>45% completed</Text>

            <Text style={styles.progressPercentage}>45%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: "45%" },
              ]}
            />
          </View>

          <Pressable style={styles.continueButton}>
            <Text style={styles.buttonText}>
              Continue Learning
            </Text>
          </Pressable>
        </View>
      </Pressable>

      {/* Course 4 */}
      <Pressable style={styles.courseCard}>
        <View style={styles.courseImage}>
          <Text style={styles.imageText}>UX</Text>
        </View>

        <View style={styles.courseContent}>
          <Text style={styles.category}>DESIGN</Text>

          <Text style={styles.courseTitle}>
            User Experience Design
          </Text>

          <Text style={styles.courseInfo}>
            8 Lessons • Beginner
          </Text>

          <View style={styles.progressRow}>
            <Text style={styles.progressText}>25% completed</Text>

            <Text style={styles.progressPercentage}>25%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: "25%" },
              ]}
            />
          </View>

          <Pressable style={styles.continueButton}>
            <Text style={styles.buttonText}>
              Start Course
            </Text>
          </Pressable>
        </View>
      </Pressable>

      <View style={styles.bottomSpace} />
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
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 6,
  },

  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 20,
  },

  courseImage: {
    height: 130,
    borderRadius: 14,
    backgroundColor: "#E9DDF0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  imageText: {
    fontSize: 36,
    fontWeight: "800",
    color: "#32063D",
  },

  courseContent: {
    paddingHorizontal: 4,
  },

  category: {
    fontSize: 10,
    fontWeight: "800",
    color: "#32063D",
    marginBottom: 6,
  },

  courseTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginBottom: 6,
  },

  courseInfo: {
    fontSize: 12,
    color: "#888",
    marginBottom: 15,
  },

  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  progressText: {
    fontSize: 11,
    color: "#777",
  },

  progressPercentage: {
    fontSize: 11,
    fontWeight: "700",
    color: "#32063D",
  },

  progressBackground: {
    height: 7,
    backgroundColor: "#E5DDE8",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#32063D",
    borderRadius: 10,
  },

  continueButton: {
    backgroundColor: "#32063D",
    paddingVertical: 11,
    borderRadius: 9,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 30,
  },
});