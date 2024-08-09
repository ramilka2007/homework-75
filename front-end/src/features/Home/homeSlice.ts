import {DecodedMsg, EncodedMsg} from "../../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {decodingMsg, encodingMsg} from "./homeThunk.ts";

export interface HomeState {
    encode: EncodedMsg | null;
    decode: DecodedMsg | null;
    isFetching: boolean;
}

const initialState: HomeState = {
    encode: null,
    decode: null,
    isFetching: false,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(encodingMsg.fulfilled, (state: HomeState, {payload: encoded}) => {
            state.encode = encoded;
        });
    },
    selectors: {
        selectEncodeMsg: (state) => state.encode,
        selectIsFetching: (state) => state.isFetching,
    }
});

export const homeReducer = homeSlice.reducer;

export const {selectEncodeMsg} = homeSlice.selectors;