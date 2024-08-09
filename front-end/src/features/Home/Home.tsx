import React from 'react';
import {Button, Grid, TextField} from "@mui/material";

const Home = () => {
    return (
        <Grid container direction="column" spacing={2} component="form" style={{alignItems:"center"}}>
            <Grid item>
                <TextField
                    required
                    multiline
                    minRows={10}
                    label="Decoded message"
                    id="decode"
                    fullWidth
                    name="decode"
                    style={{ width: "400px" }}
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
                />
                <Button>Encode</Button>
                <Button>Decode</Button>
            </Grid>
            <hr/>
            <TextField
                required
                multiline
                minRows={10}
                label="Encoded message"
                id="encode"
                name="encode"
                style={{ width: "400px" }}
            />
        </Grid>
    );
};

export default Home;