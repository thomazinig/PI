import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from '../userId';
import { useNavigate } from "react-router-dom";
import { cpf } from 'cpf-cnpj-validator'; // Importa a função de validação de CPF
import "./cadastrarUsuario.css";

export function CadastrarUsuario() {
    const { innerHeight: altura } = window;
    const { userData } = useUser();
    const navigate = useNavigate();

    const { idUser, grupUser } = userData;
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const authGrupo = () => {
        if (!idUser) {
            navigate("/");
        }
    };

    const AuthToken = (token, grup) => {
        if (!token) {
            navigate("/");
        }
        if (grup !== "Administrador") {
            navigate("/segundaTela");
        }
        axios.get("http://localhost:3001/authToken", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res => {
            console.log(res);
        })).catch((err => {
            navigate("/");
        }));
    };

    useEffect(() => {
        authGrupo();
        AuthToken(localStorage.token, grupUser);
    }, []);

    const onSubmit = (data) => {
        if (data === undefined) {
            console.log(data);
            return "dados invalidos";
        }
        delete data.confirmar_senha;
        axios.post("http://localhost:3001/usuarios", data).then((res) => {
            alert("Usuario Cadastrado");
            reset();
        }).catch((err) => {
            alert(err.response.data.menssage);
        });
    };

    // Função de validação de CPF
    const validateCPF = (value) => {
        return cpf.isValid(value) || "CPF inválido";
    };

    return (
        <div className="cadastrarUsuario" style={{
            height: `${altura}px`,
        }}>

            <div className="container cadastrarUsuario-container" >
                <div className="d-flex flex-column justify-content-center" style={{ width: "50%" }} >
                    <h1 style={{ textAlign: "center" }}>Cadastrar Usuario</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="nome" className="form-label">Nome</label>
                            <input type="nome" className="form-control" id="nome"{...register("nome", { required: true })} />
                            {errors.nome && <span>Nome obrigatorio</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"{...register("email", { required: true })} />
                            {errors.email && <span>email obrigatorio</span>}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="number" className="form-control" id="cpf" {...register("cpf", { required: true, validate: validateCPF })} />
                            {errors.cpf && <span>CPF obrigatório e válido</span>}
                        </div>
                        <div className="mb-3">

                            <label htmlFor="grupo" className="form-label">Grupo</label>
                            <select className="form-select" aria-label="Default select example" id="grupo"{...register("grupo", { required: true })}>
                                <option value=""></option>
                                <option value="Administrador">Administrador</option>
                                <option value="Estoque">Estoque</option>
                            </select>
                            {errors.grupo && <span>Grupo obrigatorio</span>}

                        </div>
                        <div className="mb-3" style={{ display: "none" }}>

                            <label htmlFor="status" className="form-label">Status</label>
                            <select className="form-select" aria-label="Default select example" id="status"{...register("status", { required: true })}>
                                <option value="true">ativo</option>
                            </select>
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
                        <div className="divBtnCadastro">
                            <button type="submit" className="btnCadastro">Cadastrar</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}