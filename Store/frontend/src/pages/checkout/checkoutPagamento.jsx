import { useState } from "react"
import { useForm } from 'react-hook-form';

export function CheckoutPagamento() {
    const { register, handleSubmit, errors } = useForm(); // Adicione 'watch' e 'errors' aqui
const teste = localStorage.teste
    const [formaPagamento, setFormaPagamento] = useState("boleto")
    const onSubmit = (data) => {
        console.log(data)
        localStorage.setItem(`dadosCartao`, JSON.stringify(data))
        console.log(teste)

    }
    return (
        <>
            <div>
                <button onClick={() => setFormaPagamento("cartao")}>cartão</button>
                <button onClick={() => setFormaPagamento("boleto")}>boleto</button>
            </div>
            {formaPagamento === "boleto" ?
                <div>
                    <h1>boleto selecionado</h1>
                    <button type="button">anterior</button>
                    <button type="submit">proximo</button>
                </div>
                :
                <div style={{background :"white"}}>
                    <form style={{ color: "black" }} onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="nCartao"> numero o cartão</label>
                        <input style={{ color: "black" }} type="text"{...register("nCartao", { required: true })} />
                        <label htmlFor="codigoSeguranca">codigo de Seguranca</label>
                        <input style={{ color: "black" }} type="text"{...register("codigoSeguranca", { required: true })} />
                        <br />
                        <label htmlFor="dataValidade"> data de Validade</label>
                        <input style={{ color: "black" }} type="text"{...register("dataValidade", { required: true })} />
                        <label htmlFor="nome"> nome completo</label>
                        <input style={{ color: "black" }} type="text"{...register("nome", { required: true })} />
                        <label htmlFor="cpf"> cpf do titular</label>
                        <input style={{ color: "black" }} type="text"{...register("cpf", { required: true })} />
                        <br />
                        <label htmlFor="parcelas">numero de parcelas</label>
                        <select className="form-select" aria-label="Default select example" style={{ color: "black" }} id="grupo"{...register("parcelas", { required: true })}>
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                            <option value="3">3x</option>
                            <option value="4">4x</option>
                            <option value="5">5x</option>
                            <option value="6">6x</option>
                        </select>
                        <button type="submit">salvar</button>
                    </form>
                    <button type="button">anterior</button>
                    <button type="button"><a href="/CheckoutFinal">proximo</a></button>

                </div>
            }

        </>
    )
}