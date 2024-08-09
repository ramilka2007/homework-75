import {DecodedMsg, EncodedMsg} from "../../types.ts";
import {createSlice} from "@reduxjs/toolkit";
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
            state.decode = null;
        });

        builder.addCase(decodingMsg.fulfilled, (state: HomeState, {payload: decoded}) => {
            state.decode = decoded
            state.encode = null;
        })
    },
    selectors: {
        selectEncodeMsg: (state) => state.encode,
        selectDecodeMsg: (state) => state.decode,
        selectIsFetching: (state) => state.isFetching,
    }
});

export const homeReducer = homeSlice.reducer;

export const {selectEncodeMsg, selectDecodeMsg} = homeSlice.selectors;