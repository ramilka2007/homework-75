import React, {useEffect} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import {Message, MessageInfo} from "../../types.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {decodingMsg, encodingMsg} from "./homeThunk.ts";
import {selectEncodeMsg} from "./homeSlice.ts";

const Home = () => {
    const encode = useAppSelector(selectEncodeMsg);
    const dispatch = useAppDispatch();
    const [messageInfo, setMessageInfo] = React.useState<MessageInfo>({
        decode: '',
        encode: '',
        password: ''
    });

    useEffect(() => {
        if (encode !== null) {
            setMessageInfo((prevState) => ({
                ...prevState,
                decode: encode.encoded,
            }));
        }
    }, [encode]);

    const encodeMsg = async () => {
        try {
            const messageDecode: Message = {
                message: messageInfo.encode,
                password: messageInfo.password
            }

            if (messageDecode.password.trim().length > 0 && messageDecode.message.trim().length > 0)  {
                await dispatch(encodingMsg(messageDecode)).unwrap();
            } else {
                alert('Please write something in password part or encode part')
            }
        } catch (e) {
            console.error(e);
        }
    }

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setMessageInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <Grid container direction="column" spacing={2} component="form" style={{alignItems:"center"}}>
            <Grid item>
                <TextField
                    required
                    multiline
                    minRows={10}
                    id="decode"
                    fullWidth
                    name="decode"
                    onChange={onChange}
                    style={{ width: "400px" }}
                    defaultValue={messageInfo.decode}
                />
            </Grid>
            <hr/>
            <Grid item style={{alignItems:"center", marginBottom: '10px'}}>
                <TextField
                    required
                    type="text"
                    label="Password"
                    id="password"
                    name="password"
                    onChange={onChange}
                    defaultValue={messageInfo.password}
                />
                <Button onClick={() => encodeMsg()}>Encode</Button>
                <Button>Decode</Button>
            </Grid>
            <hr/>
            <TextField
                required
                multiline
                minRows={10}
                id="encode"
                name="encode"
                onChange={onChange}
                style={{ width: "400px" }}
                defaultValue={messageInfo.encode}
            />
        </Grid>
    );
};

export default Home;