import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCart } from "react-icons/bs";
import  logo from "../../asset/logo.png"


export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
            display: "flex", flexDirection: "row",
            alignItems: "center", justifyContent: "space-between",
            padding:"10px 20px",
            backgroundColor:"blue !important"
        }}>
            <a className="navbar-brand" href="#"><img src={logo} alt="" width="150px"  /></a>


            <div id="navbarSupportedContent">
                <ul className="navbar-nav ">

                    <div className=' d-flex flex-row'>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Cadastrar/Entrar</a>
                        </li>

                        <li className="nav-item">
                            <div className="nav-link" href="#"><BsCart/></div>
                        </li>

                    </div>
                </ul>

            </div>
        </nav>
    )
}