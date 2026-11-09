import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';


const goal1 = 'student_learning_goal1';
const goal2 = 'student_learning_goal2';

export default function LearningGoal() {
    const [goal, setGoal] = useState('');
    
    useEffect(() => {
        async function loadGoal(){
            try{
                const value = await AsyncStorage.getItem(goal1);
                if (value !== null) {
                    setGoal(value);
                }
            } catch { Alert.alert('Error could not find the goal.');}

            }

            loadGoal();
        }, []);

        async function saveGoal(){
            if (!goal.trim()) {
                Alert.alert('Please enter the goal first.');
                return;
        }

        try{
            await AsyncStorage.setItem(goal1, goal);
            setGoal(goal);
            Alert.alert('Goal saved successfully!');
        } catch {
            Alert.alert('Error saving the goal.');
        }
    
        }

        async function deleteGoal(){
            try { 
                await AsyncStorage.removeItem(goal1);
                setGoal('');
                Alert.alert('Goal deleted successfully!');
            } catch {
                Alert.alert('Error deleting the goal.');
            }
        }

        async function checkStorage(){
            const keys = await AsyncStorage.getAllKeys();
            const entries = await AsyncStorage.multiGet(keys);
            console.log('ASYNC STORAGE: ');
            console.log(JSON.stringify(entries));

        }

        return(
            <View>
                <Text>
                    Learning Goal
                </Text>
                <TextInput
                    placeholder="Enter your learning goal?"
                    value={goal}
                    onChangeText={setGoal}
                    />
                    <Pressable 
                    onPress={saveGoal}>
                        <Text>
                            Save
                        </Text>
                    </Pressable>

                    <Text>
                        goal: {goal}
                    </Text>

                    <Pressable
                    onPress={deleteGoal}>
                        <Text>
                            Delete
                        </Text>
                    </Pressable>

                    <Pressable
                    onPress={checkStorage}>
                        <Text>
                            Check Storage
                        </Text>
                    </Pressable>
            </View>

        )


        

        
    }