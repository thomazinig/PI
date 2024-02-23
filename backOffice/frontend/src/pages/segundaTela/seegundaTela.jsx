import Container from 'react-bootstrap/Container';
import "./segundaTela.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export function SegundaTela() {
  const navigate = useNavigate()

  const { innerHeight: altura } = window;
  const AuthToken = (token)=>{
    if (!token) {
        navigate("/")
    }
}
  useEffect(()=>{
    AuthToken(localStorage.token)

  },[])

    return (
        <Container style={{
            height: `${altura}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
            display: "flex",
            flexDirection:"column",
            alignItems: "center",
            justifyContent: "center"
          }}>
                <button className="btnListar">Listar Produtos</button>
                <button className="btnListar mt-4">Listar Usuarios</button>
            </div>
        </Container>

    )

}