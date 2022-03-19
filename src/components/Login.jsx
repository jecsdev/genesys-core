import React, {useRef, useState, useEffect, useContext} from 'react'


import {Avatar, Button, FormControl, Grid, Paper, TextField} from '@mui/material'
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
export default function Login() {

  //form paper style
  const paperStyle={padding: 70, height:'50vh', width:280, margin:'100px auto'};

  //avatarStyle
  const avatarStyle={backgroundColor: '#00BFFF'};
  
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    setUser('');
    setPwd('');
    setSuccess(true);
  }
  return (

    <>{success ? (
      <section>
        <h1>Your are logged in!</h1>
        <br/>
        <p>
          <a href="#">Go to home</a>
        </p>
      </section>
    ): (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
          <Avatar style={avatarStyle}>GC</Avatar>
        <p ref={errRef} className={errMsg ? "errMsg" : 
      "offscreen"} aria-live="assertive">{errMsg}</p>
      <h2>Genesys Core</h2>
          </Grid>
          <FormControl onSubmit={handleSubmit} method="get" fullWidth>
        <TextField 
          type="text" 
          label='Usuario'
          id="userName"
          ref={userRef}
          autoComplete="off"
          placeholder='Introducir el nombre de usuario'
          onChange={(e) => setUser(e.target.value)}
          value={user} 
          variant='standard'
          fullWidth 
          
          />
          <br/>
      
        <TextField 
          type="password" 
          label='Contraseña'
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd} 
          fullWidth
          variant='standard'
          
          /> 
         <br/>
          <Button type='submit' color='primary' variant='contained'>Iniciar Sesion</Button>
      </FormControl>
      <p>¿Necesita una cuenta?</p>
        <span className="line">
          <a href="#">Registrarse</a>
        </span>
        </Paper>
        
      </Grid>   
    )}</>
  )
}
