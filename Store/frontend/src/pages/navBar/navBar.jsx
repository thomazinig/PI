import 'bootstrap/dist/css/bootstrap.min.css';


export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
            display: "flex", flexDirection: "row",
            alignItems: "center", justifyContent: "space-between",
            padding:"10px 20px"
        }}>
            <a className="navbar-brand" href="#">Navbar</a>


            <div id="navbarSupportedContent">
                <ul className="navbar-nav ">

                    <div className=' d-flex flex-row'>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Cadastrar/Entrar</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">carrinho</a>
                        </li>

                    </div>
                </ul>

            </div>
        </nav>
    )
}