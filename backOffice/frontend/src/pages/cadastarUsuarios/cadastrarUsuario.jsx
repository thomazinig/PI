import axios from "axios"
import { Alert } from "bootstrap"
import { useForm, SubmitHandler } from "react-hook-form"

export function CadastrarUsuario() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        if (data === undefined) {
            console.log(data)
            return "dados invalidos"
        }
        axios.post("http://localhost:3001/usuarios", data).then((res) => {
            console.log(res, "teste");
        }).catch((err) => {
            console.log(err,"asda")
        })

    }
    return (
        <div className="container">
            <h1 style={{textAlign:"center", marginTop:"40px"}}>Cadastrar Usuario</h1>
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
                    <input type="number" className="form-control" id="cpf"{...register("cpf", { required: true })} />
                    {errors.cpf && <span>cpf obrigatorio</span>}

                </div>
                <div className="mb-3">

                    <label htmlFor="grupo" className="form-label">Grupo</label>
                    <select className="form-select" aria-label="Default select example" id="grupo"{...register("grupo", { required: true })}>
                        <option value=""></option>
                        <option value="Administrador">Administrador</option>
                        <option value="Estoque">Estoque</option>
                    </select>
                </div>
                <div className="mb-3">

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
                {/* <div className="mb-3">
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

                </div> */}
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    )
}