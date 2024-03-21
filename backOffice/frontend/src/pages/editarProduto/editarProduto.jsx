import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../userId";
import "./editarProduto.css"

export function EditarProduto() {
    const { innerHeight: altura } = window;

    const [images, setImages] = useState([]);
    const [produto, setProduto] = useState(null)
    const { id } = useParams();
    const { userData } = useUser();
    const navigate = useNavigate()
    const { idUser, grupUser } = userData;
    const [caminhosImagens, setCaminhosImagens] = useState([]);


    const fetchImagens = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/download/${id}`);
            setCaminhosImagens(response.data);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        }
    };
    function removerImagemDB(caminhoImagem) {
        alert(caminhoImagem)
        axios.delete(`http://localhost:3001/deletarImagem/${caminhoImagem}`).then(() => {
            alert("imagem excluida")
            setCaminhosImagens([])
            fetchImagens()
        }).catch((error) => {
            console.log(error)
            alert("falha ao excluir a imagem")
        })
    }
    const handleImageChange = (e) => {
        const newImages = Array.from(e.target.files);
        setImages(prevImages => prevImages.concat(newImages))
    };
    const handleRemoveImage = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
    };
    const salvarImagem = async () => {
        try {
            for (const image of images) {
                const formData = new FormData();
                formData.append('file', image); // Adiciona apenas a imagem atual ao FormData

                const response = await axios.post(`http://localhost:3001/upload/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response.data);
            }

        } catch (error) {
            alert('Error uploading images:');
        }


    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const authGrupo = () => {
        if (!idUser) {

            navigate("/")

        } else {

        }
    }

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
    const buscarProduto = () => {
        axios.get(`http://localhost:3001/buscarProduto/${id}`).then((res => {

            setProduto(res.data)

        }))

    }
    useEffect(() => {
        buscarProduto()
        fetchImagens();
        authGrupo()
        AuthToken(localStorage.token)

    }, [])



    const onSubmit = (data) => {

        if (data === undefined) {

            return "dados invalidos"
        }
        console.log(data)
        axios.put(`http://localhost:3001/editar/produto/${id}`, data).then((res) => {
            salvarImagem()
            alert("Produto alterado")
            navigate("/listarProduto")
        }).catch((err) => {
            console.log(err)
            alert(err.response.data.message)
        })
    }

    return (
        <div className="editarCadastro" style={{
            height: `${altura}px`,
        }}>
            <div className="container editarCadastro-container">
                <h1 style={{ textAlign: "center" }}>Editar Produto</h1>
                {
                    grupUser !== "Administrador" ?
                        <div>
                            {produto === null ? <h1>carregando</h1> :
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="estoque" className="form-label">Estoque</label>
                                        <input type="number" className="form-control" defaultValue={produto.estoque} id="estoque" min="1" {...register("estoque", { required: true })} />
                                        {errors.estoque && <span>Estoque obrigatorio</span>}
                                    </div>
                                    <div className="div-botoes">
                                        <div className="divBtnCadastrar">
                                            <button type="button" onClick={() => {
                                                navigate("/listarProduto")
                                            }} className="btnEditarCadastro">voltar</button>
                                        </div>
                                        <div className="divBtnCadastrar">
                                            <button type="submit" className="btnEditarCadastro">Editar</button>
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                        :
                        <div>
                            {produto === null ? <h1>carregando</h1> :
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome Produto</label>
                                        <input type="text" className="form-control" defaultValue={produto.nomeProduto} maxLength="200" id="nome"{...register("nomeProduto", { required: true })} />
                                        {errors.nomeProduto && <span>Nome obrigatorio</span>}

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descricao" className="form-label">Descrição</label>
                                        <input type="text" className="form-control" defaultValue={produto.descricao} id="descricao" maxLength="2000" {...register("descricao", { required: true })} />
                                        {errors.descricao && <span>descrição obrigatorio</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="avaliacao" className="form-label">Avaliação</label>
                                        <input type="number" className="form-control" defaultValue={produto.avaliacao} id="avaliacao" step="0.5" max="5" min="0" {...register("avaliacao", { required: true })} />
                                        {errors.avaliacao && <span>Avaliação obrigatorio</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="preco" className="form-label">Preço</label>
                                        <input type="number" className="form-control" defaultValue={produto.preco} id="preco" step="0.010" min="0" {...register("preco", { required: true })} />
                                        {errors.preco && <span>Preço obrigatorio</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="estoque" className="form-label">Estoque</label>
                                        <input type="number" className="form-control" defaultValue={produto.estoque} id="estoque" min="1" {...register("estoque", { required: true })} />
                                        {errors.estoque && <span>Estoque obrigatorio</span>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Excluir imagens salvas</label>
                                        <div className="div-imgs">
                                            {caminhosImagens.map((caminho, index) => (
                                                <div className="div-imagens-excluir">
                                                    <img key={index} src={`http://localhost:3001/images/${caminho.nomeImagem}`} alt={`Imagem ${index + 1}`} width="300px" height="300px" />
                                                    <button onClick={() => {
                                                        removerImagemDB(caminho.nomeImagem)
                                                    }} className="remove-button" type="button">Excluir</button>
                                                </div>


                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="mb-2">Adiconar Nova Imagem</label>
                                        <div className="custom-file">
                                            <input type="file" multiple onChange={handleImageChange} className="file" id="customFile" />
                                            <div htmlFor="customFile" className="file-label">
                                                <label>Escolha o arquivo...</label>
                                                <label htmlFor="customFile" className="label-button">Navegar</label>
                                            </div>
                                        </div>

                                        <div className="mt-4 mb-3">
                                            {images.map((image, index) => (
                                                <div key={index} className="image-container">
                                                    <img src={URL.createObjectURL(image)} alt={`Imagem ${index}`} />
                                                    <button onClick={() => handleRemoveImage(index)} className="remove-button">Remover</button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="div-botoes">
                                        <div className="divBtnCadastrar">
                                            <button type="button" onClick={() => {
                                                navigate("/listarProduto")
                                            }} className="btnEditarCadastro">voltar</button>
                                        </div>
                                        <div className="divBtnCadastrar">
                                            <button type="submit" className="btnEditarCadastro">Editar</button>
                                        </div>
                                    </div>
                                </form>
                            }
                        </div>
                }



            </div>
        </div>

    )

}