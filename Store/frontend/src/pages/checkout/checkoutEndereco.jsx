import { useEffect, useState } from "react"
import axios from 'axios';

export function CheckoutEndereco() {
    const [enderecos, setEnderecos] = useState()
    const [enderecoId, setEnderecoId] = useState()
    const id = localStorage.id
    useEffect(() => {
        listarEnderecos()
    }, [])
    const listarEnderecos = () => {
        axios.get(`http://localhost:3001/listarEndereco/${id}`)
            .then((res) => {
                setEnderecos(res.data)
            }).catch((e) => console.log(e))
    }
    return (
        <>
            {enderecos ?
                <div style={{ background: "white" }}>
<h1>selecione o endereço de entrega</h1>
                    {enderecos.map((endereco) => {
                        return (
                            <div>
                                <span>{endereco.endereco}</span>
                                <span>{endereco.numero}</span>
                                <button onClick={() => {
                                    setEnderecoId(endereco.id)
                                }}>adicionar</button>
                            </div>
                        )
                    })

                    }
                    <div>

                    <a href="/adicionarEnderecoCarrinho">adicionar Endereco</a>
                    <button>proxima Etapa</button>
                    </div>
                </div>
                :
                <h1>carregando</h1>

            }
        </>
    )
}