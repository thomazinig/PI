import { useState } from "react";
import axios from "axios";
export function Login() {
  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();

  function handleChange(event) {
    setUsuario(event.target.value);
  }
  function handleChangeSenha(event) {
    setSenha(event.target.value);
  }
  function login1() {

    var data = {usuario,senha}
    axios
      .post("http://localhost:3001/login",data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div>
        <div>
          <label htmlFor="">Usuario</label>
          <input type="text" value={usuario} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Senha</label>
          <input type="password" value={senha} onChange={handleChangeSenha} />
        </div>
        <input onClick={login1} type="submit" value="submit" />
      </div>
    </div>
  );
}
