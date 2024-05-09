import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ListarEnderecoEntrega() {
    const [enderecos, setEndereco] = useState(null);
    const [pesquisar, setPesquisar] = useState("");
    const navigate = useNavigate();
    const clienteId = localStorage.id

    const AuthToken = (token) => {
        if (!token) {
            navigate("/")
        }

        axios.get("http://localhost:3001/authToken", {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        }).then((res => {
        })).catch((err => {
            navigate("/")
        }))
    }

    useEffect(() => {
        AuthToken(localStorage.token)
        listarEnderecos()
    }, [])
    function listarEnderecos() {
        axios.get(`http://localhost:3001/listarEndereco/${clienteId}`).then(res => {
            console.log(res.data)
            setEndereco(res.data)
        }).catch(err => {
            console.log(err)
        })
    }



    const lowerCaseEnderecos = pesquisar.toLowerCase()
    const pesquisarPorEndereco = enderecos?.filter((endereco => endereco.endereco.toLowerCase().includes(lowerCaseEnderecos)))
    return (
        <div className=" listarUsuarios">
            <div className="container">
                <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0" }}>
                    <h1>enderecos</h1>
                    <button className="btn btn-primary" onClick={() => navigate("/adicionarEndereco")}>adicionar Endereço</button>
                </div>
                <input className="form-control mb-3" type="text" placeholder="Pesquise pelo Endereço" value={pesquisar}
                    onChange={(e) => setPesquisar(e.target.value)} />

                {
                    enderecos === null ?
                        <h1>carregando</h1>
                        :
                        <Table bsPrefix="table table-bordered table-striped table-hover align-middle text-center">
                            <thead>
                                <tr>
                                    <th>Endereço</th>
                                    <th>cep</th>
                                    <th>bairro</th>
                                    <th>UF</th>
                                    <th>Editar</th>
                                    <th>deletar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pesquisarPorEndereco.map(endereco => {
                                    return (
                                        <tr key={endereco.id}>
                                            <td>{endereco.endereco}</td>
                                            <td>{endereco.cep}</td>
                                            <td>{endereco.bairro}</td>
                                            <td>{endereco.uf}</td>
                                            <td>
                                                <button className="btn" onClick={() => {
                                                    navigate(`/editarEndereco/${endereco.id}`)
                                                }}>Editar</button>
                                            </td>
                                            <td>
                                                <button className="btn" onClick={() => {
                                                    axios.delete(`http://localhost:3001/excluirEnderecoEntrega/${endereco.id}/${clienteId}`)
                                                        .then((res)=>alert("endereço excluido"))
                                                        .catch(()=>alert("erro ao excluir endereço"))
                                                }}>deletar</button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                }

            </div>
        </div>
    )
}