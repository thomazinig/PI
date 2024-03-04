import axios from "axios"
import "./listarUsuarios.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Table } from "react-bootstrap";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useUser } from "../userId";
export function LIstarUsuarios() {
    const { userData } = useUser();
    const { idUser, grupUser } = userData;
    const [usuarios, setUsuarios] = useState(null);
    const [pesquisar, setPesquisar] = useState("");
    const [show, setShow] = useState(false);
    console.log("teste")
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const authGrupo = () => {
        if (!idUser) {

            navigate("/")

        } else {

        }
    }

    const AuthToken = (token, grup) => {
        if (!token) {
            navigate("/")
        }
        if (grup !== "Administrador") {
            navigate("/segundaTela")
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

    const handleClose = () => {
        setId(null);
        setId(null);
        setShow(false)
    };

    const handleShow = (id, status) => {
        setId(id);
        setStatus(status)
        setShow(true)
    };


    useEffect(() => {
        authGrupo()
        AuthToken(localStorage.token, grupUser)
        userList()
    }, [])
    function userList() {
        axios.get("http://localhost:3001/auth/usuarios").then(res => {
            setUsuarios(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    function alterarStatus(id, mudarStatus) {
        console.log(mudarStatus)
        let status = !mudarStatus
        console.log(status)

        const boolean = { status }

        axios.put(`http://localhost:3001/edit/status/${id}`, boolean).then(res => {
            userList()
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        handleClose();
        
    }
    const lowerCaseUsuarios = pesquisar.toLowerCase()
    const pesquisarPorNome = usuarios?.filter((usuario=> usuario.nome.toLowerCase().includes(lowerCaseUsuarios)))
    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0" }}>
                <h1>Usuarios</h1>
                <button className="btn btn-primary" onClick={()=> navigate("/cadastrarUsuario")}>adicionar usuario</button>
            </div>
            <input className="form-control mb-3" type="text"  placeholder="Pesquise pelo nome" value={pesquisar} 
            onChange={(e)=>setPesquisar(e.target.value)} />

            {
                usuarios === null ?
                    <h1>carregando</h1>
                    :
                    <Table bsPrefix="table table-bordered table-striped table-hover align-middle text-center">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Grupo</th>
                                <th>Status</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pesquisarPorNome.map(usuario => {
                                console.log(usuario)
                                return (
                                    <tr key={usuario.id}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.grupo}</td>
                                        <td>{usuario.status === false ?
                                            <button onClick={() => handleShow(usuario.id, usuario.status)} className="btnAtivoInativo">
                                                <p>Inativo</p>
                                                <div className="btnInativo"></div>
                                            </button>
                                            :
                                            <button onClick={() => handleShow(usuario.id, usuario.status)} className="btnAtivoInativo">
                                                <p>Ativo</p>
                                                <div className="btnAtivo"></div>
                                            </button>

                                        }
                                        </td>
                                        <td>
                                            <button className="btn">Editar</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja editar o status?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => alterarStatus(id, status)}>
                        editar status
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}