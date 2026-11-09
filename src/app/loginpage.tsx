
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useStudent } from '../context/StudentContext';

export default function Form2() {
    const [newname, setName] = useState('');
    const [newemail, setEmail] = useState('');

    const { student, setStudent } = useStudent();

    function hello() {
        setStudent({
            ...student,
            name: newname,
            email: newemail
        });

        router.push('/drawer/tabs/home');
    }

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>
                    TechLearn
                </Text>

                <Text style={styles.title}>
                    Welcome Back 👋
                </Text>

                <Text style={styles.subtitle}>
                    Enter your details to continue learning
                </Text>
            </View>

            {/* Login Card */}
            <View style={styles.card}>

                {/* Name Input */}
                <Text style={styles.label}>
                    Your Name
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#999"
                    value={newname}
                    onChangeText={setName}
                    autoCapitalize="words"
                    returnKeyType="next"
                />

                {/* Email Input */}
                <Text style={styles.label}>
                    Email Address
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#999"
                    value={newemail}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                />

                {/* Login Button */}
                <Pressable
                    style={styles.loginButton}
                    onPress={hello}
                >
                    <Text style={styles.loginButtonText}>
                        Login
                    </Text>
                </Pressable>

                {/* Back Button */}
                <Pressable
                    onPress={() => router.push('./second')}
                >
                    <Text style={styles.backText}>
                        ← Go Back
                    </Text>
                </Pressable>

            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                Learn. Build. Grow.
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F3F7',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    header: {
        alignItems: 'center',
        marginBottom: 26,
    },

    logo: {
        fontSize: 18,
        fontWeight: '800',
        color: '#32063D',
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#222',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        lineHeight: 21,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 4,
    },

    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },

    input: {
        height: 50,
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderColor: '#E5E1E8',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 15,
        marginBottom: 18,
        color: '#222',
    },

    loginButton: {
        height: 52,
        backgroundColor: '#32063D',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },

    backText: {
        textAlign: 'center',
        color: '#32063D',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 20,
    },

    footer: {
        textAlign: 'center',
        color: '#999',
        fontSize: 12,
        marginTop: 24,
    },
});
