import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import instance from '../api/api_instance';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import{Container} from '@mui/material';

import '../../assets/styles/global.css';



const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        setErrorMessage('');
    },[username, password])

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            username: username,
            password: password
        }
        setPassword("")
        try{
        await instance({
            url: "/login/",
            method: "POST",
            data: data
          }).then((res) => {
            //save token in axios, add authorization to header
            instance.defaults.headers.common['Authorization'] = 'Token ' + res.data.token;
            //saving the token in local storage
            localStorage.setItem('token', res.data.token)
            navigate("/");
          });
        } catch(e){
            if(e.response.status === 401){
                setErrorMessage("Invalid Username or Password")
            }else{
                setErrorMessage("Internal Server Error")
            }
        }
    }

    return(
        
        <Container maxWidth= "sm">
        <React.Fragment>
        {errorMessage ? <Alert severity="error" > {errorMessage} — <strong>Please try again!</strong> </Alert> : null}
        <form onSubmit ={handleSubmit}>   
                <TextField
                margin="normal"
                required
                fullWidth
                value={username}
                label="Username"
                name="username"
                autoComplete="username"
                onChange={e => setUsername(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={e => setPassword(e.target.value)}
                />
                <Button
                type="submit"
                variant="contained"
                size = "large"
                sx={{ backgroundColor: '#02AEEC' }}
                >
                Login
                </Button>
                <Grid 
                container
                direction="column"
                alignItems="center"
                justifyContent="center">
                    <Grid item >
                        <Link href="/register" variant="body2" color='#000000'>
                        {"Don't have an account? Register here"}
                        </Link>
                    </Grid>
                </Grid>
        
        </form>
        </React.Fragment>
        </Container>
    )
}

export default LoginForm;