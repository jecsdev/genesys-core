import React, {useRef, useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import AuthService from '../auth-services/auth-service';

import {Avatar, Button,  Grid, Paper, TextField} from '@mui/material'

function Login() {

  //form paper style
  const paperStyle = {
    padding: 70,
    height: '50vh',
    width: 280,
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    justifyContent: 'center',
    alignItems: 'center',
  };

  //avatarStyle
  const avatarStyle={backgroundColor: '#042e50'};
  
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    setErrMsg('');
  }, [userName, password])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.logIn(userName, password)
      .then(() => {
        navigate("/dashboard");
        window.location.reload();
        
      }, 
      (error) => {
        console.log(error);
      }
      )
    }catch(e){
      console.log(e);
    }
  
  }
  return (
    <div className="container">
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
          <Avatar style={avatarStyle}>GC</Avatar>
        <p ref={errRef} className={errMsg ? "errMsg" : 
        "offscreen"} aria-live="assertive">{errMsg}</p>
        <h2>Genesys Core</h2>
          </Grid>
            <form onSubmit={handleLogin}>
        <TextField 
          type="text" 
          label='Usuario'
          id="userName"
          ref={userRef}
          autoComplete="off"
          placeholder='Introducir el nombre de usuario'
          onChange={(e) => setUserName(e.target.value)}
          value={userName} 
          variant='standard'
          fullWidth 
          
          />
          <br/>
      
        <TextField 
          type="password" 
          label='Contraseña'
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password} 
          fullWidth
          variant='standard'
          
          /> 
         <br/>
         <br/>
          <Button type='submit' style={{background: '#042e50'}} variant='contained'>Iniciar Sesion</Button>
          </form>
    
            <p>¿Necesita una cuenta?</p>
          <span className="line">
            <p>Registrarse</p>
          </span>
          </Paper>
          
        </Grid>   
      </div>
     
    )}





export default Login;