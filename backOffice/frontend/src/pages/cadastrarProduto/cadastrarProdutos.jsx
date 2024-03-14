import { useForm } from "react-hook-form"
import { SalvarImagem } from "../salvarImagem/salvarImagem"
import "./cadastrarProduto.css"
export function CadastrarProduto() {
    const { innerHeight: altura } = window;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm()

    return (
        <div className="cadastrarUsuario" style={{
            height: `${altura}px`,
        }}>
            <div className="container cadastrarUsuario-container" >
                <div className="d-flex flex-column justify-content-center" style={{ width: "50%" }} ></div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="nomeProduto" className="form-label">Nome do Produto</label>
                        <input type="nome" className="form-control" id="nomeProduto"{...register("nomeProduto", { required: true })} />
                        {errors.nomeProduto && <span>Nome obrigatorio</span>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <input type="text" className="form-control" id="descricao"{...register("descricao", { required: true })} />
                        {errors.descricao && <span>Descrição é obrigatoria</span>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpf" className="form-label">CPF</label>
                        <input type="number" className="form-control" id="cpf"{...register("cpf", { required: true })} />
                        {errors.cpf && <span>cpf obrigatorio</span>}

                    </div>
                    <div>
                        <SalvarImagem></SalvarImagem>
                    </div>
                </form>
            </div>
        </div >
    )
}