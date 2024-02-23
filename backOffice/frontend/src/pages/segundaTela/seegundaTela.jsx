import Container from 'react-bootstrap/Container';
import "./segundaTela.css";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export function SegundaTela() {
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
  }
  useEffect(() => {
    AuthToken(localStorage.token, localStorage.grupo)

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
          <button onClick={()=>{
            navigate("/listarUsuarios")
          }} className="btnListar mt-4">Listar Usuarios</button>
          :
          ""
        }
      </div>
    </Container>

  )

}