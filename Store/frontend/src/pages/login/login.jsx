import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./login.css";
import { useNavigate } from 'react-router-dom';

export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    useEffect(() => {
        if (localStorage.token) {
            authToken(localStorage.token)

        }
    }, [])

    function authToken(token) {
        if (token) {
            axios.get("http://localhost:3001/authToken", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            }).then((res => {
                console.log(res)
                navigate("/")
            })).catch((err => {
                console.log(err)
                localStorage.clear();
                navigate("/login")

            }))

        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();


        axios.post('http://localhost:3001/loginStore', {
            email: email,
            senha: senha
        }).then((res) => {
            const { idUser, token } = res.data;
            localStorage.token = token
            localStorage.id = idUser
            navigate("/")


        }).catch(() => {
            alert("usuario ou senha invalidas")
        })



    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="formLogin" onSubmit={handleLogin}>
                <h3>Login</h3>

                <label className="labelLogin" htmlFor="username">E-mail</label>
                <input className="inputLogin" type="text" placeholder="Email" id="username" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label className="labelLogin" htmlFor="password">Senha</label>
                <input className="inputLogin" type="password" placeholder="Senha" id="password" value={senha} onChange={(e) => setSenha(e.target.value)} />

                <button className="buttonLoginStore" type="submit">Log In</button>

                <div className="social">
                    <div className="go" onClick={() => navigate("/cadastro")}><i className="fab fa-google"></i> cadstre-se</div>

                </div>
            </form>
        </div>
    );
}
