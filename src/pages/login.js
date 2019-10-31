import React, {useEffect, useState} from  'react';
import {usePost} from '../utils/rest';
import {Redirect} from 'react-router-dom';

const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWYC6fl5K1B71qT-dH8Gzl_grzFlff_ws";


const Login = () => {
    const [logado, setLogado] = useState(false);
    const [postData, signin] = usePost(url);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if(Object.keys(postData.data).length > 0){
            localStorage.setItem("token", postData.data.idToken);
            window.location.reload();
        }
    }, [postData])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            setLogado(true);
        }
    })

    const login = async() =>{
        await signin({
            email: email,
            password: senha,
            returnSecureToken: true
        });
        
    }

    const onChangeEmail = evt => {
        setEmail(evt.target.value);
    }

    const onChangeSenha = evt => {
        setSenha(evt.target.value)
    }

    if(logado){
        return <Redirect to="/" />
    }

    return <div> 
    <h1>Login</h1>
    {
        postData.error && postData.error.length > 0  &&
        <p>E-mail e/ou senha inválido!</p>
    }
    <input type="text" value={email} onChange={onChangeEmail} placeholder="E-mail" />
    <input type="password" value={senha} onChange={onChangeSenha} placeholder="Senha" />
    <button onClick={login}>Login</button>
    <pre>{JSON.stringify(postData)}</pre>
    </div>
}

export default Login;