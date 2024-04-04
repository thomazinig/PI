import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import "./cadastrarProduto.css";
import "./salvarImagem.css";
import { Navigate, useNavigate } from "react-router-dom";

export function CadastrarProduto() {
  const navigate = useNavigate();

  const { innerHeight: altura } = window;

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm();
  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      file,
      principal: false // Define todas as novas imagens como não principais por padrão
    }));
    setImages((prevImages) => prevImages.concat(newImages));
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  const handleSetPrincipal = (index) => {
    const updatedImages = images.map((image, i) => ({
      ...image,
      principal: i === index // Define a imagem atual como principal e todas as outras como não principais
    }));
    setImages(updatedImages);
  };

  const salvarImagem = async (id) => {
    setLoading(true);
    console.log(id);
    try {
      for (const { file, principal } of images) {
        console.log(principal)
        const formData = new FormData();
        formData.append("file", file);
        formData.append("principal", principal); // Inclui o campo 'principal' no FormData
        const response = await axios.post(
          `http://localhost:3001/upload/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        console.log(response.data);
      }

      setImages([]);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    await axios
      .post("http://localhost:3001/novoProduto", data)
      .then(async (res) => {
        await salvarImagem(res.data.id);

        navigate("/listarProduto");
      })
      .catch((err) => console.log(err));
  };

    return (
        <div className="cadastrarUsuario" style={{
            height: `${altura}px`,
        }}>
            <div className="container cadastrarUsuario-container" >
                <div className="d-flex flex-column justify-content-center" style={{ width: "100%" }} ></div>
                <form onSubmit={handleSubmit(onSubmit)} style={{width:"50%"}}>
                    <div className="mb-3">
                        <label htmlFor="nomeProduto" className="form-label">Nome do Produto</label>
                        <input type="text" className="form-control" id="nomeProduto" maxLength="200" {...register("nomeProduto", { required: true, maxLength: 200 })} />
                        {errors.nomeProduto && errors.nomeProduto.type === "required" && <span>Nome do produto é obrigatório</span>}
                        {errors.nomeProduto && errors.nomeProduto.type === "maxLength" && <span>O nome do produto deve ter no máximo 200 caracteres</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descricao" className="form-label">Descrição Detalhada</label>
                        <textarea className="form-control" id="descricao" maxLength="2000" {...register("descricao", { required: true, maxLength: 2000 })} />
                        {errors.descricao && errors.descricao.type === "required" && <span>Descrição é obrigatória</span>}
                        {errors.descricao && errors.descricao.type === "maxLength" && <span>A descrição deve ter no máximo 2000 caracteres</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="avaliacao" className="form-label">Avaliação</label>
                        <input type="number" className="form-control" id="avaliacao" step="0.5" max="5" min="0" {...register("avaliacao", { required: true, min: 0, max: 5 })} />
                        {errors.avaliacao && errors.avaliacao.type === "required" && <span>Avaliação é obrigatória</span>}
                        {errors.avaliacao && (errors.avaliacao.type === "min" || errors.avaliacao.type === "max") && <span>A avaliação deve estar entre 1 e 5</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="preco" className="form-label">Preço do Produto</label>
                        <input type="number" className="form-control" id="preco" step="0.010" min="0" {...register("preco", { required: true, min: 0 })} />
                        {errors.preco && errors.preco.type === "required" && <span>Preço é obrigatório</span>}
                        {errors.preco && (errors.preco.type === "min" || errors.preco.type === "step") && <span>O preço deve ser um número maior ou igual a 0 e com no máximo 2 casas decimais</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="estoque" className="form-label">Quantidade em Estoque</label>
                        <input type="number" className="form-control" id="estoque" min="1" {...register("estoque", { required: true, min: 1 })} />
                        {errors.estoque && errors.estoque.type === "required" && <span>Quantidade em estoque é obrigatória</span>}
                        {errors.estoque && errors.estoque.type === "min" && <span>A quantidade em estoque deve ser um número inteiro maior ou igual a 0</span>}
                    </div>
                    <div className="mb-4" style={{
                        display: "none"
                    }}>

                        <label htmlFor="status" className="form-label">Status</label>
                        <select className="form-select" aria-label="Default select example" id="status"{...register("status", { required: true })}>
                            <option value="true">ativo</option>
                        </select>
                    </div>
                    <div className="mb-3">
            <label htmlFor="customFile" className="form-label">
              Imagens do Produto
            </label>
            <div className="custom-file">
              <input type="file" multiple onChange={handleImageChange} className="file" id="customFile" />
              <label htmlFor="customFile" className="label-button">
                Navegar
              </label>
            </div>
            <div className="mt-4 mb-3">
              {images.map((image, index) => (
                <div key={index} className="image-container">
                  <img src={URL.createObjectURL(image.file)} alt={`Imagem ${index}`} />
                  <div className="mb-3">
                    <label htmlFor={`principal${index}`} className="form-label">
                      Imagem Principal
                    </label>
                    <input
                      type="checkbox"
                      id={`principal${index}`}
                      checked={image.principal}
                      onChange={() => handleSetPrincipal(index)}
                    />
                  </div>
                  <button onClick={() => handleRemoveImage(index)} className="remove-button">
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Botões de ação */}
          <div className="div-botoes">
            <div className="divBtnCadastrar">
              <button type="button" onClick={() => navigate("/listarProduto")} className="btnEditarCadastro">
                Cancelar
              </button>
            </div>
            <div className="divBtnCadastrar">
              <button type="submit" disabled={loading} className="btn btn-dark" style={{ width: "100% !important" }}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}