import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../userId";
import "./listarUsuarios.css"
export function ListarProduto() {
  const [produto, setProduto] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pesquisar, setPesquisar] = useState("");
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState(null);
  
  const navigate = useNavigate();

  const { userData } = useUser();
  const { idUser, grupUser } = userData;



  useEffect(() => {
    userList();
  }, [page]); // Atualizar a lista quando a página mudar

  function userList() {
    // Fazer uma requisição para buscar os produtos da página atual
    axios
      .get(`http://localhost:3001/listarProdutos?page=${page}&limit=10`)
      .then((res) => {
        console.log(res.data.products)
        setProduto(res.data.products);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNextPage() {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }

  function handlePreviousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function alterarStatus(id, mudarStatus) {
    let status = !mudarStatus;
    const boolean = { status };

    axios
      .put(`http://localhost:3001/edit/status/produto/${id}`, boolean)
      .then((res) => {
        userList();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    handleClose();
  }

  const lowerCaseProduto = pesquisar.toLowerCase();
  const pesquisarPorNome = produto?.filter((usuario) =>
    usuario.nomeProduto.toLowerCase().includes(lowerCaseProduto)
  );
console.log(produto)
  const handleClose = () => {
    setId(null);
    setId(null);
    setShow(false);
  };

  const handleShow = (id, status) => {
    setId(id);
    setStatus(status);
    setShow(true);
  };

  return (
    <div className="listar-produto">
      <div className="container container-listar-produtos">
        <div style={{ display: "flex", justifyContent: "space-between", margin: "30px 0" }}>
          <h1>Produtos</h1>
          <button className="btnCriarUsuario" onClick={() => {
            if (grupUser === "Administrador") {
              navigate("/cadastrarProduto")
            } else {
              alert("usuario não tem acesso")
            }
          }}>Adicionar</button>
        </div>
        <input className="form-control mb-3" type="text" placeholder="Pesquise pelo nome" value={pesquisar}
          onChange={(e) => setPesquisar(e.target.value)} />

        {produto === null ? (
          <h1>Carregando...</h1>
        ) : (
          <Table bsPrefix="table table-bordered table-striped table-hover align-middle text-center">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Estoque</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Editar</th>
                <th>Visualizar</th>
              </tr>
            </thead>
            <tbody>
              {pesquisarPorNome.map((produtoInd) => (
                <tr key={produtoInd.id}>
                  <td>{produtoInd.id}</td>
                  <td>{produtoInd.nomeProduto}</td>
                  <td>{produtoInd.estoque}</td>
                  <td>{produtoInd.preco}</td>
                  <td>
                    {produtoInd.status === false ? (
                      <button
                        onClick={() => {
                          if (grupUser === "Administrador") {
                            handleShow(produtoInd.id, produtoInd.status)
                          } else {
                            alert("Usuario sem permissão")
                          }
                        }}
                        className="btnAtivoInativo"
                      >
                        <p>Inativo</p>
                        <div className="btnInativo"></div>
                      </button>
                    ) : (
                        <button
                          onClick={() => {
                            if (grupUser === "Administrador") {
                              handleShow(produtoInd.id, produtoInd.status)
                            } else {
                              alert("Usuario sem permissão")
                            }
                          }}
                          className="btnAtivoInativo"
                        >
                          <p>Ativo</p>
                          <div className="btnAtivo"></div>
                        </button>
                      )}
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        navigate(`/editarProduto/${produtoInd.id}`)
                      }}
                    >
                      Editar
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => navigate(`/visualizarProduto/${produtoInd.id}`)}
                    >
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
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
              Editar Status
            </Button>
          </Modal.Footer>
        </Modal>
        <div style={{
            display:"flex",
            justifyContent:"space-between"
        }}>
          <Button onClick={handlePreviousPage} disabled={page <= 1}>Anterior</Button>
          <Button onClick={handleNextPage} disabled={page >= totalPages}>Próxima</Button>
        </div>
      </div>
    </div>
  );
}
