import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import {StudentProvider} from '../context/StudentContext';

export default function RootLayout() {
    return (
        <Provider store={store}>
        
                <StudentProvider>
                    <Stack>
                        <Stack.Screen
                            name="index"
                            options={{
                                title: 'Welcome',
                            }}
                        />


                        <Stack.Screen
                            name="loginpage"
                            options={{
                                title: 'Login',
                            }}
                        />

                        <Stack.Screen
                            name="drawer"
                            options = {{
                                title: 'drawer'
                                }}/>

                        <Stack.Screen
                            name="learninggoal"
                            options = {{
                                title: 'Learning Goal'
                                }}/> 


                        <Stack.Screen
                            name="sqlite_lessons"
                            options = {{
                                title: 'SQLite Lessons'
                                }}/>                
                                


                    </Stack>
                </StudentProvider>  
        </Provider>  
    );
}