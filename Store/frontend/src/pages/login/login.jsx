import "./login.css"

export function Login() {
    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="formLogin">
                <h3>Login</h3>

                <label className="labelLogin" forHtml="username">E-mail</label>
                <input className="inputLogin" type="text" placeholder="Email" id="username" />

                <label className="labelLogin" for="password">Senha</label>
                <input className="inputLogin" type="password" placeholder="Senha" id="password" />

                <button className="buttonLoginStore">Log In</button>

                <div className="social">
                    <div className="go"><i className="fab fa-google"></i>  Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
                </div>
            </form>
        </div>
    )



}