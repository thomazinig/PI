import { useForm, SubmitHandler } from "react-hook-form"

export function CadastrarUsuario() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)
    console.log(watch("example"))

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="nome">Nome</label>
                <input defaultValue="nome" {...register("nome")} />
                <label htmlFor="cpf">CPF</label>
                <input {...register("cpf", { required: true })} />
                <label htmlFor="email">E-mail</label>
                <input {...register("exampleRequired", { required: true })} />
                <label htmlFor="grupo">Grupo</label>
                <input {...register("grupo", { required: true })} />
                <label htmlFor="senha">senha</label>
                <input {...register("senha", { required: true })} />
                {errors.senha && <span>This field is required</span>}
                <label htmlFor="confirmarSenha"> confirmar senha</label>
                <input {...register("confimarSenha", { required: true })} />
                {errors.confirmarSenha && <span>This field is required</span>}

                <input type="submit" />
            </form>
        </div>
    )
}