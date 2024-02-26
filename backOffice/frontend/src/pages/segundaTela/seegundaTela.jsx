import Container from 'react-bootstrap/Container';
import "./segundaTela.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
export function SegundaTela() {
  const { innerHeight: altura } = window;
  const [grupoAdm, setGrupoAdm] = useState()
  const navigate = useNavigate()

const location = useLocation();
const id = location.state.id
const grupo = location.state.grupo

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
    AuthToken(localStorage.token, grupo)

  }, [])

  return (
    <Container style={{
      height: `${altura}px`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <button className="btnListar">Listar Produtos</button>
        {grupoAdm ?
          <button onClick={() => {
            navigate("/listarUsuarios")
          }} className="btnListar mt-4">Listar Usuarios</button>
          :
          ""
        }
      </div>
    </Container>

  )

}