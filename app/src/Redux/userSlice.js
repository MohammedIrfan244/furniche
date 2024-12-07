import {createSlice} from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const userCookie=Cookies.get('user')
const currentUser=userCookie?JSON.parse(userCookie):null

const INITIAL_STATE = {
    currentUser: currentUser,
};

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;