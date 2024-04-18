
import { useState } from "react";
import "./signUp.css"
import axios from "axios";

export function SignUp() {
    const [cep, setCep] = useState()

    const handleChange = (event) => {
        setCep(event.target.value);
    };
    function checarCep() {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
            console.log(res.data);
        }).catch(error => console.log(error))

    }


    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="FormSignUp">
                <h3>Cadastre-se</h3>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="nomeCompleto">Nome Completo</label>
                        <input className="inputSignUp" type="text" placeholder="Nome Completo" id="nomeCompleto" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="data">Data de nascimento</label>
                        <input className="inputSignUp" type="text" placeholder="Data de nascimento" id="data" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="genero">Genero</label>
                        <input className="inputSignUp" type="text" placeholder="Genero" id="genero" />
                    </div>
                </div>
                <div className="divCadastro">

                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="email">E-mail</label>
                        <input className="inputSignUp" type="text" placeholder="E-mail" id="Email" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="cpf">CPF</label>
                        <input className="inputSignUp" type="text" placeholder="cpf" id="cpf" />
                    </div>
                </div>
                <h3 style={{ marginTop: "30px" }}>Endereço faturamento</h3>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="cep" type="text">CEP</label>
                        <input className="inputSignUp" type="text" placeholder="CEP" id="cep"
                            defaultValue={cep} onChange={handleChange}
                            />
                            <button className="buscarCep" type="button" onClick={()=> checarCep()}>buscar</button>
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Endereco">Endereco</label>
                        <input className="inputSignUp" type="text" placeholder="Endereco" id="Endereco" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Numero">Numero</label>
                        <input className="inputSignUp" type="text" placeholder="Numero" id="Numero" />
                    </div>
                </div>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="complemento">complemento</label>
                        <input className="inputSignUp" type="text" placeholder="complemento" id="complemento" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Bairro">Bairro</label>
                        <input className="inputSignUp" type="text" placeholder="Bairro" id="Bairro" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Cidade">Cidade</label>
                        <input className="inputSignUp" type="text" placeholder="Cidade" id="Cidade" />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="UF">UF</label>
                        <input className="inputSignUp" type="text" placeholder="UF" id="UF" />
                    </div>
                </div>

                <button className="buttonLoginStore">Cadastro</button>

            </form>
        </div>
    )
}