import { useEffect, useState } from "react";
import { NavBar } from "../navBar/navBar";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export function Home() {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        userList();
    }, [page]); // Atualizar a lista quando a página mudar


    function userList() {
        // Fazer uma requisição para buscar os produtoss da página atual
        axios
            .get(`http://localhost:3001/listarProdutosImagens?page=${page}&limit=10`)
            .then((res) => {
                console.log(res.data.products)
                setProdutos(res.data.products);
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

    console.log(produtos)
    return (
        <>
            <NavBar />
            <div className="container">
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}>
                    {produtos === null ? <h1> carregando</h1> :

                        produtos.map((produto, key) => {
                            return (
                                <div style={{
                                    marginTop: "50px",
                                    padding: "10px",
                                    border: "1px solid black",
                                    borderRadius: "7px",
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "200px",
                                    alignItems: "center"
                                }} key={key}>
                                    <span>{produto.nomeProduto}</span>
                                    {produto.imagemProdutos[0] == undefined ?
                                        <h2>sem Imagem</h2> :
                                        <img src={`http://localhost:3001/images/${produto.imagemProdutos[0].nomeImagem}`} width="150px" height="150px" />

                                    }

                                    <span>R${produto.preco} </span>
                                    <button className="btn btn-dark"
                                        onClick={() => {
                                            navigate(`/visualizarProduto/${produto.id}`)

                                        }}
                                    >Detalhes</button>
                                </div>
                            )
                        })
                    }

                </div>
                <div style={{ padding: "10px 110px", display: "flex", justifyContent: "space-between" }}>

                    <Button onClick={handlePreviousPage} disabled={page <= 1}>Anterior</Button>
                    <Button onClick={handleNextPage} disabled={page >= totalPages}>Próxima</Button>
                </div>
            </div>

        </>
    )
}