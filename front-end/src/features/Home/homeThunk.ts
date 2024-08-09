import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Message, EncodedMsg, DecodedMsg } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const encodingMsg = createAsyncThunk<EncodedMsg, Message>(
  'main/encode',
  async (message) => {
    const { data: encoded } = await axiosApi.post<EncodedMsg>(
      'http://localhost:8000/encode',
      message,
    );

    return encoded;
  },
);

export const decodingMsg = createAsyncThunk<DecodedMsg, Message>(
  'main/decode',
  async (message) => {
    const { data: decoded } = await axiosApi.post<DecodedMsg>(
      'http://localhost:8000/decode',
      message,
    );

    return decoded;
  },
);
