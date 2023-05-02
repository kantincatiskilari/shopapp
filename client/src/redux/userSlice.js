import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isPending: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isPending = true
        },
        loginSuccess: (state,action) => ({
            isPending : false,
            user : action.payload,
        }),
        loginFailure: (state) => ({
            isPending : false,
            error : true
        }),
        updateStart: (state) => ({
            ...state,
            isPending: true,
        }),
        updateSuccess: (state,action) => ({
            ...state,
            user: action.payload,
            isPending: false
        }),
        updateFailure: (action) => ({
            error: true,
            isPending: false
        }),
        logout: (state) => ({
            user : null
        })    
}
});

export const {loginStart,loginSuccess,loginFailure, logout, updateStart, updateSuccess, updateFailure } = userSlice.actions;

export default userSlice.reducer;