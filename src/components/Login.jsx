import React, {useRef, useState, useEffect, useContext} from 'react'
import {AuthContext} from './context/AuthProvider'
import axios from './api/axios';
const LOGIN_URL = '/auth';


export default function Login() {
  const {setAuth} = useContext(AuthContext);

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

      <section>
        <p ref={errRef} className={errMsg ? "errMsg" : 
      "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} method="get">
        <label htmlFor="userName">Nombre de usuario</label>
        <input 
          type="text" 
          id="userName"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user} 
          required
          />

        <label htmlFor="password">Contraseña</label>
        <input 
          type="password" 
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd} 
          required
          /> 
          <button>Iniciar Sesion</button>
      </form>
      <p>¿Necesita una cuenta?</p>
        <span className="line">
          <a href="#">Registrarse</a>
        </span>
      </section>
    )}</>
  )
}
