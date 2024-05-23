import { useEffect, useState } from "react";
import "../signUp/signUp.css"
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

export function AdicionarEnderecoCarrinho() {
    const navigate = useNavigate();
    const id = localStorage.id;
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
    useEffect(() => {
        register("cep"); // Registrar o campo cep
    }, [register]);


    function checarCep() {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
            const data = res.data;
            console.log(data.cep)
            setEndereco(data.logradouro);
            setBairro(data.bairro);
            setUf(data.uf);
            setNumero('');
            setCidade(data.localidade);
            register("cep").setValue(data.cep);
        }).catch(error => console.log(error))
    }
    const onSubmit = async (data) => {
        delete data.cep;
        data.cep = cep;
        console.log(data);

        try {
            axios.post(`http://localhost:3001/cadastrarEnederecoEntrega/${id}`, data).then(res => {
                alert("endereço cadastrado")
                navigate("/checkoutEndereco")
            }).catch((error) => {
                console.log(error)
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

                <h3 style={{ marginTop: "30px" }}>Endereço Entrega</h3>
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
                            onBlur={checarCep}
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
                            {...register("endereco", { required: true })} // Mantenha o registro do campo endereço
                        />
                    </div>
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="Numero">Numero</label>
                        <input className="inputSignUp" type="text" placeholder="Numero" id="Numero"
                            {...register("numero", { required: true })}
                        />

                    </div>
                </div>
                <div className="divCadastro">
                    <div className="divCampoCadastro">
                        <label className="labelLogin" htmlFor="complemento">complemento</label>
                        <input className="inputSignUp" type="text" placeholder="complemento" id="complemento"
                            {...register("complemento", { required: true })}
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
                            {...register("bairro", { required: true })} // Mantenha o registro do campo bairro
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
                            {...register("cidade", { required: true })} // Mantenha o registro do campo cidade
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
                            {...register("uf", { required: true })} // Mantenha o registro do campo UF
                        />

                    </div>
                </div>

                <button className="buttonLoginStore">Cadastro</button>

            </form>
        </div>
    )
}