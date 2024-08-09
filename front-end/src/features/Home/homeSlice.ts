import { DecodedMsg, EncodedMsg } from '../../types.ts';
import { createSlice } from '@reduxjs/toolkit';
import { decodingMsg, encodingMsg } from './homeThunk.ts';

export interface HomeState {
  encode: EncodedMsg | null;
  decode: DecodedMsg | null;
  isEncoding: boolean;
  isDecoding: boolean;
  isError: boolean;
}

const initialState: HomeState = {
  encode: null,
  decode: null,
  isEncoding: false,
  isDecoding: false,
  isError: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(encodingMsg.pending, (state: HomeState) => {
        state.isEncoding = true;
      })
      .addCase(
        encodingMsg.fulfilled,
        (state: HomeState, { payload: encoded }) => {
          state.encode = encoded;
          state.decode = null;
          state.isEncoding = false;
        },
      )
      .addCase(encodingMsg.rejected, (state: HomeState) => {
        state.isEncoding = false;
        state.isError = true;
      });

    builder
      .addCase(decodingMsg.pending, (state: HomeState) => {
        state.isDecoding = true;
        console.log(state.isDecoding);
      })
      .addCase(
        decodingMsg.fulfilled,
        (state: HomeState, { payload: decoded }) => {
          state.decode = decoded;
          state.encode = null;
          state.isDecoding = false;
        },
      )
      .addCase(decodingMsg.rejected, (state: HomeState) => {
        state.isDecoding = false;
        state.isError = true;
      });
  },
  selectors: {
    selectEncodeMsg: (state) => state.encode,
    selectDecodeMsg: (state) => state.decode,
    selectIsEncoding: (state) => state.isEncoding,
    selectIsDecoding: (state) => state.isDecoding,
  },
});

export const homeReducer = homeSlice.reducer;

export const {
  selectEncodeMsg,
  selectDecodeMsg,
  selectIsEncoding,
  selectIsDecoding,
} = homeSlice.selectors;
