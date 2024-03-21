import "./segundaTela.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../userId';

export function SegundaTela() {
  const { userData } = useUser();
  const { idUser, grupUser } = userData;
  const { innerHeight: altura } = window;
  const [grupoAdm, setGrupoAdm] = useState()
  const navigate = useNavigate()

  const AuthToken = (token, grup) => {
    if (!token) {
      navigate("/")
    }
    if (grup !== "Administrador") {
      setGrupoAdm(false)
    } else {
      setGrupoAdm(true)
    }
    axios.get("http://localhost:3001/authToken", {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    }).then((res => {
      console.log(res)
    })).catch((err => {
      navigate("/")
    }))
  }

  useEffect(() => {
    AuthToken(localStorage.token,grupUser)

  }, [])

  return (
    <div style={{
      height: `${altura}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#480ca8"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <button onClick={() => {
            navigate("/listarProduto")
          }} className="btnListar">Listar Produtos</button>
        {grupoAdm ?
          <button onClick={() => {
            navigate("/listarUsuarios")
          }} className="btnListar mt-4">Listar Usuarios</button>
          :
          ""
        }
      </div>
    </div>

  )

}