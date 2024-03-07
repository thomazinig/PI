import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../userId";
import "./editarCadastro.css"

export function EditarCadastro() {
  const { innerHeight: altura } = window;

    const [dataUser, setDataUser] = useState(null)
    const { id } = useParams();
    const { userData } = useUser();
    const navigate = useNavigate()

    const { idUser, grupUser } = userData;
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

        })).catch((err => {
            navigate("/")
        }))
    }
    const buscarUsuario = () => {
        axios.get(`http://localhost:3001/usuario/${id}`).then((res => {

            setDataUser(res.data)

        }))

    }
    useEffect(() => {
        buscarUsuario()
        authGrupo()
        AuthToken(localStorage.token, grupUser)

    }, [])



    const onSubmit = (data) => {

        if (data === undefined) {

            return "dados invalidos"
        }
        delete data.confirmar_senha

        axios.put(`http://localhost:3001/edit/${id}`, data).then((res) => {
            alert("Usuario alterado")
            navigate("/listarUsuarios")
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
                <h1 style={{textAlign:"center"}}>Editar cadastro</h1>
                {dataUser === null ? <h1>carregando</h1> :
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="nome" className="form-control" defaultValue={dataUser.nome} id="nome"{...register("nome", { required: true })} />
                            {errors.nome && <span>Nome obrigatorio</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="number" className="form-control" defaultValue={dataUser.cpf} id="cpf"{...register("cpf", { required: true })} />
                            {errors.cpf && <span>cpf obrigatorio</span>}

                        </div>
                        <div className="mb-3">
                            {idUser === dataUser.id ?
                                <div>
                                    <label htmlFor="grupo" className="form-label">Grupo</label>
                                    <input type="text" className="form-control" defaultValue={dataUser.grupo} disabled />

                                </div>
                                :
                                <div>
                                    <label htmlFor="grupo" className="form-label">Grupo</label>
                                    <select className="form-select" aria-label="Default select example" id="grupo"{...register("grupo", { required: true })}>
                                        <option value=""></option>
                                        <option value="Administrador">Administrador</option>
                                        <option value="Estoque">Estoque</option>
                                    </select>
                                    {errors.grupo && <span>Grupo obrigatorio</span>}
                                </div>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"{...register("senha", { required: true })} />
                            {errors.senha && <span>senha obrigatorio</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirmar senha</label>
                            <input className="form-control" type="password"
                                {...register("confirmar_senha", {
                                    required: true,
                                    validate: (val) => {
                                        if (watch('senha') != val) {
                                            return "senhas diferentes";
                                        }
                                    },
                                })}
                            />
                            {errors.confirmar_senha && <span>senhas diferentes</span>}

                        </div>
                        <div className="divBtnCadastrar">
                        <button type="submit" className="btnEditarCadastro">Editar</button>
                        </div>
                    </form>
                }

            </div>
        </div>

    )

}