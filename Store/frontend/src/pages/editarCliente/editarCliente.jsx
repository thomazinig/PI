import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export function EditarCliente() {
    const { id } = useParams();
    const { register, handleSubmit, setValue, watch, errors } = useForm(); // Adicione 'watch' e 'errors' aqui
    const [usuario, setUsuario] = useState(null);
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [numero, setNumero] = useState()

    const [uf, setUf] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/cliente/${id}`);
                setUsuario(response.data);
                setValue("nome", response.data.nome);
                setValue("cpf", response.data.cpf);
                setValue("email", response.data.email);
                setValue("genero", response.data.genero);
                setValue("idade", response.data.idade);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUsuario();
    }, [id, setValue]);

    const onSubmit = async (data) => { 
        console.log("teste")
        axios.put(`http://localhost:3001/editarCliente/${id}`, data).then(()=>console.log("top"))
        .catch((error)=>console.log(error))
    };

    function checarCep() {
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

    if (!usuario) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="FormSignUp" onSubmit={handleSubmit(onSubmit)}>
                <h3>Editar Usuário</h3>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="nomeCompleto">Nome Completo</label>
                        <input className="inputSignUp" type="text" placeholder="Nome Completo" id="nomeCompleto" {...register("nome", { required: true })} />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="idade">Idade</label>
                        <input className="inputSignUp" type="text" placeholder="Idade" id="idade"{...register("idade", { required: true })} />
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
                        <input type="password" className="inputSignUp" id="exampleInputPassword1" {...register("senha", { required: true })} />
                        {errors && errors.senha && <span>senha obrigatorio</span>}
                    </div>
                    <div className="divCampoCadastro">
                        <label htmlFor="exampleInputPassword1" className="labelLogin">Confirmar senha</label>
                        <input className="inputSignUp" type="password"
                            {...register("confirmar_senha", {
                                required: true,
                                validate: (val) => {
                                    if (watch('senha') !== val) {
                                        return "senhas diferentes";
                                    }
                                },
                            })}
                        />
                        {errors && errors.confirmar_senha && <span>senhas diferentes</span>}
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
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                            onBlur={checarCep} // Adicione onBlur para verificar o CEP após o usuário sair do campo
                        />
                        <button className="buscarCep" type="button" onClick={checarCep}>Buscar</button>
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
                            {...register("enderecoCobrancaData.endereco", { required: true })}
                        />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Numero">Numero</label>
                        <input className="inputSignUp" type="text" placeholder="Numero" id="Numero" {...register("enderecoCobrancaData.numero", { required: true })} />
                    </div>
                </div>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="complemento">Complemento</label>
                        <input className="inputSignUp" type="text" placeholder="Complemento" id="complemento" {...register("enderecoCobrancaData.complemento", { required: true })} />
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
                            {...register("enderecoCobrancaData.bairro", { required: true })}
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
                            {...register("enderecoCobrancaData.cidade", { required: true })}
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
                            {...register("enderecoCobrancaData.uf", { required: true })}
                        />
                    </div>
                </div>
                <button className="buttonLoginStore" type="submit" >Editar</button>
            </form>
        </div>
    );
}
