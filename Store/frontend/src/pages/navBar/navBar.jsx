import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCart } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import logo from "../../asset/logo.png"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CartButton } from '../../components/cardButton';


export function NavBar() {
    const [validar, setValidar] = useState(null)
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
                setValidar(true)
            })).catch((err => {
                console.log(err)
                setValidar(false)
                localStorage.clear();

            }))

        }
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
            display: "flex", flexDirection: "row",
            alignItems: "center", justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "blue !important"
        }}>
            <a className="navbar-brand" href="/"><img src={logo} alt="" width="150px" /></a>


            <div id="navbarSupportedContent">
                <ul className="navbar-nav ">

                    <div className=' d-flex flex-row'>


                        {validar === true ?
                            <li className="nav-item">
                                <a className="nav-link" href="/perfil"><CgProfile size={24} /></a>
                            </li>
                            :
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Cadastrar/Entrar</a>
                            </li>

                        }
                        <li className="nav-item">
                            <div className="nav-link" href="#"><CartButton size={24}/></div>
                        </li>

                    </div>
                </ul>

            </div>
        </nav>
    )
}
