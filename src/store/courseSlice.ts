import { createSlice} from '@reduxjs/toolkit';

const initialState = { completedLessons: 0,
    totalLessons: 4};

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: { 
        completeLesson: (state) => {
            if (state.completedLessons < state.totalLessons) {
                state.completedLessons += 1;
            }},
        },
});

export const { completeLesson } = courseSlice.actions;
export default courseSlice.reducer;
