import { useState } from "react"

export function CheckoutPagamento() {
    const [formaPagamento,setFormaPagamento]= useState(null)
return(
    <>
    <div>
        <button onClick={()=> setFormaPagamento("cartao")}>cartão</button>
        <button onClick={()=> setFormaPagamento("boleto")}>boleto</button>
    </div>
    </>
)
}