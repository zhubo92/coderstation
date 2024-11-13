import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {updateUserByIdApi} from "../api/user";

export const updateUserInfoAsync = createAsyncThunk('user/updateUserInfoAsync', async (arg, thunkAPI) => {
    await updateUserByIdApi(arg.userId, arg.newInfo);
    thunkAPI.dispatch(updateUserInfo(arg.newInfo));
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        userInfo: {},
    },
    reducers: {
        // 初始化用户信息
        initUserInfo: (state, {payload}) => {
            state.userInfo = payload;
        },
        // 修改用户登录状态
        changeLoginStatus: (state, {payload}) => {
            state.isLogin = payload;
        },
        // 清除用户信息
        clearUserInfo: (state) => {
            state.userInfo = {};
        },
        updateUserInfo: (state, {payload}) => {
            state.userInfo = { ...state.userInfo, ...payload };
        }
    }
});

export const {initUserInfo, changeLoginStatus, clearUserInfo, updateUserInfo} = userSlice.actions;

export default userSlice.reducer;