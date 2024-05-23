import { useNavigate } from 'react-router-dom';


export function Profile() {
    const navigate = useNavigate();
    const id = localStorage.id;

    const sair = ()=>{
        localStorage.clear()
        navigate("/login")
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

            <a href="" onClick={() => navigate(`/editarCliente/${id}`)}>Editar Cadastro</a>
            <a href="/listarEnderecoEntrega">Meus Pedidos</a>
            <a href="/listarEnderecoEntrega">Adiconar endereço de Entrega</a>
            <a href="" onClick={()=>{sair()}}>Sair</a>
        </div>
    )
}