import React, { useEffect } from 'react';
import { Grid, TextField } from '@mui/material';
import { Message, MessageInfo } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { decodingMsg, encodingMsg } from './homeThunk.ts';
import {
  selectDecodeMsg,
  selectEncodeMsg,
  selectIsDecoding,
  selectIsEncoding,
} from './homeSlice.ts';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

const Home = () => {
  const encode = useAppSelector(selectEncodeMsg);
  const decode = useAppSelector(selectDecodeMsg);
  const encoding = useAppSelector(selectIsEncoding);
  const decoding = useAppSelector(selectIsDecoding);
  const dispatch = useAppDispatch();
  const [messageInfo, setMessageInfo] = React.useState<MessageInfo>({
    decode: '',
    encode: '',
    password: '',
  });

  useEffect(() => {
    if (encode !== null) {
      setMessageInfo((prevState) => ({
        ...prevState,
        decode: encode.encoded,
        encode: '',
      }));
    }
  }, [encode]);

  useEffect(() => {
    if (decode !== null) {
      setMessageInfo((prevState) => ({
        ...prevState,
        encode: decode.decoded,
        decode: '',
      }));
    }
  }, [decode]);

  const encodeMsg = async () => {
    try {
      const messageDecode: Message = {
        message: messageInfo.encode,
        password: messageInfo.password,
      };

      if (messageDecode.password !== '' && messageDecode.message !== '') {
        await dispatch(encodingMsg(messageDecode)).unwrap();
      } else {
        alert('Please write something in password part or encode part');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const decodeMsg = async () => {
    try {
      const messageDecode: Message = {
        message: messageInfo.decode,
        password: messageInfo.password,
      };

      if (messageDecode.password !== '' && messageDecode.message !== '') {
        await dispatch(decodingMsg(messageDecode)).unwrap();
      } else {
        alert('Please write something in password part or decode part');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMessageInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      component="form"
      style={{ alignItems: 'center' }}
    >
      <Grid item>
        <TextField
          required
          multiline
          minRows={10}
          id="decode"
          fullWidth
          name="decode"
          onChange={onChange}
          style={{ width: '400px' }}
          value={messageInfo.decode}
        />
      </Grid>
      <hr />
      <Grid
        item
        style={{
          display: 'flex',
          marginBottom: '10px',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <TextField
          required
          type="text"
          label="Password"
          id="password"
          name="password"
          onChange={onChange}
          value={messageInfo.password}
          style={{ width: '400px' }}
        />
        <Grid>
          <LoadingButton
            size="small"
            onClick={() => encodeMsg()}
            disabled={messageInfo.encode === ''}
            endIcon={<SendIcon />}
            loading={encoding}
            loadingPosition="end"
            variant="contained"
            style={{ marginRight: '10px' }}
          >
            <span>Encode</span>
          </LoadingButton>

          <LoadingButton
            size="small"
            onClick={() => decodeMsg()}
            disabled={messageInfo.decode === ''}
            endIcon={<SendIcon />}
            loading={decoding}
            loadingPosition="end"
            variant="contained"
          >
            <span>decode</span>
          </LoadingButton>
        </Grid>
      </Grid>
      <hr />
      <TextField
        required
        multiline
        minRows={10}
        id="encode"
        name="encode"
        onChange={onChange}
        style={{ width: '400px' }}
        value={messageInfo.encode}
      />
    </Grid>
  );
};

export default Home;
