
import { useEffect, useState } from "react";
import "./signUp.css"
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export function SignUp() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [cep, setCep] = useState()
    const [endereco, setEndereco] = useState()
    const [bairro, setBairro] = useState()
    const [uf, setUf] = useState()
    const [numero, setNumero] = useState()
    const [cidade, setCidade] = useState()
    

    function checarCep() {
        console.log(cep)
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
            const data = res.data;
            setEndereco(data.logradouro);
            setBairro(data.bairro);
            setUf(data.uf);
            setNumero('');
            setCidade(data.localidade);
            register("enderecoCobrancaData.cep").setValue(data.cep); // Definir o valor do campo cep
        }).catch(error => console.log(error))
    }
    const onSubmit = async (data) => {
        delete data.confirmar_senha;
        try {
            axios.post('http://localhost:3001/novoCliente', data).then(res => {
                navigate("/login")
            }).catch((error) => {
                alert(error.response.data.menssage)
            })

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="FormSignUp" onSubmit={handleSubmit(onSubmit)}>
                <h3>Cadastre-se</h3>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="nomeCompleto">Nome Completo</label>
                        <input className="inputSignUp" type="text" placeholder="Nome Completo" id="nomeCompleto" {...register("nome", { required: true })} />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="idade">Data de Nascimento</label>
                        <input className="inputSignUp" type="date" placeholder="Idade" id="idade"{...register("idade", { required: true })} />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="genero">Genero</label>
                        <input className="inputSignUp" type="text" placeholder="Genero" id="genero" {...register("genero", { required: true })} />
                    </div>
                </div>
                <div className="divCadastro">

                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="email">E-mail</label>
                        <input className="inputSignUp" type="text" placeholder="E-mail" id="Email" {...register("email", { required: true })} />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="cpf">CPF</label>
                        <input className="inputSignUp" type="text" placeholder="cpf" id="cpf" {...register("cpf", { required: true })} />
                    </div>
                </div>
                <div className="divCadastro">

                    <div className="divCampoCadastro">

                        <label htmlFor="exampleInputPassword1" className="labelLogin">Senha</label>
                        <input type="password" className="inputSignUp" id="exampleInputPassword1"{...register("senha", { required: true })} />
                        {errors.senha && <span>senha obrigatorio</span>}

                    </div>

                    <div className="divCampoCadastro">

                        <label htmlFor="exampleInputPassword1" className="labelLogin">Confirmar senha</label>
                        <input className="inputSignUp" type="password"
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
                </div>
                <h3 style={{ marginTop: "30px" }}>Endereço faturamento</h3>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="cep" type="text">CEP</label>
                        <input
                            className="inputSignUp"
                            type="text"
                            placeholder="CEP"
                            id="cep"
                            defaultValue={cep}
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={(e) => {
                                console.log(e)
                            }} 
                            {...register("enderecoCobrancaData.cep", { required: true })} // Mantenha o registro do campo endereço
                            // Adicione onBlur para verificar o CEP após o usuário sair do campo
                        />

                        <button className="buscarCep" type="button" onClick={() => {
                            checarCep()
                            console.log(cep)
                        }}>buscar</button>
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Endereco">Endereco</label>
                        <input
                            className="inputSignUp"
                            type="text"
                            placeholder="Endereço"
                            id="endereco"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            {...register("enderecoCobrancaData.endereco", { required: true })} // Mantenha o registro do campo endereço
                        />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Numero">Numero</label>
                        <input className="inputSignUp" type="text" placeholder="Numero" id="Numero"
                            {...register("enderecoCobrancaData.numero", { required: true })}
                        />

                    </div>
                </div>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="complemento">complemento</label>
                        <input className="inputSignUp" type="text" placeholder="complemento" id="complemento"
                            {...register("enderecoCobrancaData.complemento", { required: true })}
                        />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Bairro">Bairro</label>
                        <input
                            className="inputSignUp"
                            type="text"
                            placeholder="Bairro"
                            id="bairro"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            {...register("enderecoCobrancaData.bairro", { required: true })} // Mantenha o registro do campo bairro
                        />

                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Cidade">Cidade</label>
                        <input
                            className="inputSignUp"
                            type="text"
                            placeholder="Cidade"
                            id="cidade"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            {...register("enderecoCobrancaData.cidade", { required: true })} // Mantenha o registro do campo cidade
                        />

                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="UF">UF</label>
                        <input
                            className="inputSignUp"
                            type="text"
                            placeholder="UF"
                            id="uf"
                            value={uf}
                            onChange={(e) => setUf(e.target.value)}
                            {...register("enderecoCobrancaData.uf", { required: true })} // Mantenha o registro do campo UF
                        />

                    </div>
                </div>

                <button className="buttonLoginStore">Cadastro</button>

            </form>
        </div>
    )
}