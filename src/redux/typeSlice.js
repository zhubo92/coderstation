import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTypeApi} from "../api/type";
import {message} from "antd";

export const getTypeListAsync =
    createAsyncThunk(
        "type/getTypeListAsync",
        async (_, thunkAPI) => {
            const {data, code, msg} = await getTypeApi();
            if (code === 0) {
                return data;
            } else {
                message.warning(msg);
            }
        }
    )

const typeSlice = createSlice({
    name: 'type',
    initialState: {
        typeList: [], // 存储所有的类型
        issueTypeId: 'all',
        bookTypeId: 'all'
    },
    reducers: {
        updateIssueTypeId: (state, {payload}) => {
            state.issueTypeId = payload;
        },
        updateBookTypeId: (state, {payload}) => {
            state.bookTypeId = payload;
        },
    },
    // 专门处理异步结果的
    extraReducers(builder) {
        builder
            .addCase(getTypeListAsync.fulfilled, (state, {payload}) => {
                state.typeList = payload;
            })
    }
});

export const {updateIssueTypeId, updateBookTypeId} = typeSlice.actions;

export default typeSlice.reducer;