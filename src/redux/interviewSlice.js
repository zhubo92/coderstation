import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getInterviewTitleApi} from "../api/interview";
import {message} from "antd";

export const getInterviewTitleAsync = createAsyncThunk(
    'interview/getInterviewTitleAsync',
    async (_, thunkAPI) => {
        const {data, msg, code} = await getInterviewTitleApi();
        if (code === 0) {
            return data;
        } else {
            message.warning(msg);
        }
    }
)

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        interviewTitleList: []
    },
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getInterviewTitleAsync.fulfilled, (state, {payload}) => {
            state.interviewTitleList = payload;
        })
    }
});

export default interviewSlice.reducer;