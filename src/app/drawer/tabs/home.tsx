import { View, Text, StyleSheet, Pressable, ScrollView, TextInput,} from 'react-native';
import { useStudent } from '../../../context/StudentContext';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState , AppDispatch } from '../../../store/store';
import { completeLesson} from '../../../store/courseSlice';

export default function Home() {

    // Get the name sent from the login page and convert it to a string
const { student } = useStudent();

const dispatch = useDispatch<AppDispatch>();

const { completedLessons, totalLessons } = useSelector((state: RootState) => state.course);

const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return (
        <ScrollView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>

                <View>
                    <Text style={styles.greeting}>
                        Hi {student.name} 👋
                    </Text>

                    <Text style={styles.subtitle}>
                        Ready to continue learning?
                    </Text>
                </View>

                <View style={styles.profileCircle}>
                    <Text style={styles.profileText}>
                        luck
                    </Text>
                </View>

            </View>


            {/* Search */}
            <TextInput
                style={styles.search}
                placeholder="Search for a course..."
                placeholderTextColor="#999"
            />


            {/* Continue Learning */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    Continue Learning
                </Text>

                <Pressable>
                    <Text style={styles.seeAll}>
                        See All
                    </Text>
                </Pressable>
            </View>


            <View style={styles.continueCard}>

                <View style={styles.courseIcon}>
                    <Text style={styles.courseIconText}>
                        RN
                    </Text>
                </View>

                <View style={styles.continueContent}>

                    <Text style={styles.continueTitle}>
                        React Native Fundamentals
                    </Text>

                    <Text style={styles.lessonText}>
                        Lesson {completedLessons} of {totalLessons}
                    </Text>

                    {/* Progress */}
                    <View style={styles.progressBackground}>
                        <View style={[styles.progressFill, {width: `${progressPercentage}%`},]} />
                    </View>

                    <Text style={styles.progressText}>
                        {Math.round(progressPercentage)}% completed
                    </Text>

                </View>

                <Pressable
                    style={styles.continueButton}
                    onPress={() => { dispatch(completeLesson())}} 
                    disabled = { completedLessons === totalLessons}
                >
                    <Text style={styles.continueButtonText}>
                        {completedLessons === totalLessons ? "Completed" : "Continue"}
                    </Text>
                </Pressable>

            </View>


            {/* My Courses */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    My Courses
                </Text>

                <Pressable>
                    <Text style={styles.seeAll}>
                        See All
                    </Text>
                </Pressable>
            </View>


            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >

                {/* Course 1 */}
                <Pressable style={styles.courseCard}>

                    <View style={styles.courseImage}>
                        <Text style={styles.imageText}>
                            JS
                        </Text>
                    </View>

                    <Text style={styles.courseTitle}>
                        JavaScript Essentials
                    </Text>

                    <Text style={styles.courseInfo}>
                        12 Lessons
                    </Text>

                </Pressable>


                {/* Course 2 */}
                <Pressable style={styles.courseCard}>

                    <View style={styles.courseImage}>
                        <Text style={styles.imageText}>
                            RN
                        </Text>
                    </View>

                    <Text style={styles.courseTitle}>
                        React Native
                    </Text>

                    <Text style={styles.courseInfo}>
                        15 Lessons
                    </Text>

                </Pressable>


                {/* Course 3 */}
                <Pressable style={styles.courseCard}>

                    <View style={styles.courseImage}>
                        <Text style={styles.imageText}>
                            UI
                        </Text>
                    </View>

                    <Text style={styles.courseTitle}>
                        UI Design Basics
                    </Text>

                    <Text style={styles.courseInfo}>
                        10 Lessons
                    </Text>

                </Pressable>

            </ScrollView>


            {/* Recommended */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    Recommended For You
                </Text>
            </View>


            <View style={styles.recommendedCard}>

                <View style={styles.recommendedIcon}>
                    <Text style={styles.imageText}>
                        UX
                    </Text>
                </View>

                <View style={styles.recommendedContent}>

                    <Text style={styles.courseTitle}>
                        User Experience Design
                    </Text>

                    <Text style={styles.courseInfo}>
                        8 Lessons • Beginner
                    </Text>

                    <Pressable style={styles.viewButton}>
                        <Text style={styles.viewButtonText}>
                            View Course
                        </Text>
                    </Pressable>

                </View>

            </View>


            {/* Bottom spacing */}
            <View style={styles.bottomSpace} />

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F6F4F8',
        paddingHorizontal: 20,
    },


    /* Header */

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 55,
        marginBottom: 25,
    },

    greeting: {
        fontSize: 24,
        fontWeight: '800',
        color: '#222',
    },

    subtitle: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },

    profileCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#32063D',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profileText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },


    /* Search */

    search: {
        height: 50,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#E5E1E8',
        marginBottom: 28,
    },


    /* Sections */

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#222',
    },

    seeAll: {
        color: '#32063D',
        fontSize: 13,
        fontWeight: '600',
    },


    /* Continue Learning */

    continueCard: {
        backgroundColor: '#32063D',
        borderRadius: 18,
        padding: 18,
        marginBottom: 30,
    },

    courseIcon: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    courseIconText: {
        color: '#32063D',
        fontWeight: '800',
        fontSize: 16,
    },

    continueContent: {
        marginBottom: 15,
    },

    continueTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 5,
    },

    lessonText: {
        color: '#D9CFE0',
        fontSize: 13,
        marginBottom: 12,
    },

    progressBackground: {
        height: 7,
        backgroundColor: '#694875',
        borderRadius: 10,
        overflow: 'hidden',
    },

    progressFill: {
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },

    progressText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 7,
    },

    continueButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 11,
        borderRadius: 9,
        alignItems: 'center',
    },

    continueButtonText: {
        color: '#32063D',
        fontWeight: '700',
        fontSize: 14,
    },


    /* Course Cards */

    courseCard: {
        width: 190,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        marginRight: 15,
        marginBottom: 30,
    },

    courseImage: {
        height: 110,
        borderRadius: 12,
        backgroundColor: '#E9DDF0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    imageText: {
        fontSize: 28,
        fontWeight: '800',
        color: '#32063D',
    },

    courseTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#222',
        marginBottom: 5,
    },

    courseInfo: {
        fontSize: 12,
        color: '#888',
    },


    /* Recommended */

    recommendedCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        marginBottom: 20,
    },

    recommendedIcon: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#E9DDF0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },

    recommendedContent: {
        flex: 1,
        justifyContent: 'center',
    },

    viewButton: {
        backgroundColor: '#32063D',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 7,
        alignSelf: 'flex-start',
        marginTop: 10,
    },

    viewButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },


    bottomSpace: {
        height: 40,
    },

});