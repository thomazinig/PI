import axios from "axios"
import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./salvarImagem.css"

export function SalvarImagem() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files); // Converte o objeto FileList em um array
    setImages(prevImages => prevImages.concat(newImages)); // Concatena as novas imagens com as imagens existentes
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove); // Filtra todos os itens, exceto o item no índice indexToRemove
    setImages(updatedImages); // Atualiza o estado com o novo array sem o item removido
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const image of images) {
        const formData = new FormData();
        formData.append('file', image); // Adiciona apenas a imagem atual ao FormData

        const response = await axios.post('http://localhost:3001/upload/1', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      }

      setImages([]); // Limpa o array de imagens após o envio bem-sucedido
      setLoading(false);
      e.target.reset(); // Limpa o formulário após o envio bem-sucedido
    } catch (error) {
      console.error('Error uploading images:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="image-upload-container">
        <form onSubmit={handleSubmit}>
          <div className="custom-file">
            <input type="file" multiple onChange={handleImageChange} className="file" id="customFile"  />
            <div htmlFor="customFile" className="file-label">
              <label>Escolha o arquivo...</label>
              <label htmlFor="customFile" className="label-button">Navegar</label>
            </div>
          </div>
          <div className="mt-4 mb-2">
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <img src={URL.createObjectURL(image)} alt={`Imagem ${index}`} />
                <button onClick={() => handleRemoveImage(index)} className="remove-button">Remover</button>
              </div>
            ))}
          </div>
          <button type="submit" disabled={loading} className="btn btn-dark" style={{width:"100% !important"}}>
            {loading ? 'Uploading...' : 'Upload Images'}
          </button>
        </form>
      </div>
    </>
  );
};
