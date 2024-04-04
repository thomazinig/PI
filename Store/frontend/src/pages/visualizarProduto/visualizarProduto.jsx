import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import './styles.css';
import { EffectCube, Pagination } from 'swiper/modules';
import { useParams } from 'react-router-dom';


export function VisualizarProduto() {
    const { innerHeight: altura } = window;
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const [caminhosImagens, setCaminhosImagens] = useState([]);
    const [caminhoImagemPrincipal, setCaminhoImagemPrincipal] = useState(null);
    const fetchImagensPrincipal = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/download/principal/${id}`); // Substitua 'id' pelo ID do produto desejado
            setCaminhoImagemPrincipal(response.data);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        }
    };
    const fetchImagens = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/download/${id}`); // Substitua 'id' pelo ID do produto desejado
            setCaminhosImagens(response.data);
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
        }
    };
    const buscarProduto = () => {
        axios.get(`http://localhost:3001/buscarProduto/${id}`).then((res => {

            setProduto(res.data)
            console.log(res.data)
        }))

    }
    useEffect(() => {
        fetchImagensPrincipal()
        buscarProduto();
        fetchImagens();
    }, []);

    return (
        <div className="container-visualizar" style={{
            height: `${altura}px`,

        }}>
            <div className='container div-principal'>
                <h1 style={{ textAlign: "center" }}>Produto</h1>
                <div style={{
                    marginTop: "30px",
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Swiper
                        effect={'cube'}
                        grabCursor={true}
                        cubeEffect={{
                            shadow: true,
                            slideShadows: true,
                            shadowOffset: 20,
                            shadowScale: 0.94,
                        }}
                        pagination={true}
                        modules={[EffectCube, Pagination]}
                        className="mySwiper"
                    >
                        {caminhoImagemPrincipal === null ?
                            <div>
                                {
                                    caminhosImagens.map((caminho, index) => (
                                        <SwiperSlide>
                                            <img key={index} src={`http://localhost:3001/images/${caminho.nomeImagem}`} alt={`Imagem ${index + 1}`} width="300px" height="300px" />

                                        </SwiperSlide>

                                    ))
                                }
                            </div>
                            :
                            <div>
                                <SwiperSlide>
                                    <img src={`http://localhost:3001/images/${caminhoImagemPrincipal.nomeImagem}`} width="300px" height="300px" />

                                </SwiperSlide>

                                {
                                    caminhosImagens.map((caminho, index) => (
                                        <SwiperSlide>
                                            <img key={index} src={`http://localhost:3001/images/${caminho.nomeImagem}`} alt={`Imagem ${index + 1}`} width="300px" height="300px" />

                                        </SwiperSlide>

                                    ))
                                }

                            </div>
                        }

                    </Swiper>
                    {produto === null ?
                        <h1>carrengando</h1>
                        :
                        <div className='listarItens'>
                            <ul>
                                <li className='mb-4'><h2>{produto.nomeProduto}</h2></li>
                                <li className='mb-4'>{produto.descricao}</li>
                                <li>Avaliação: {produto.avaliacao}/5</li>
                                <li className='mb-5'>Valor: {produto.preco}</li>
                                <li>
                                    <button className='btnEditarCadastro'>comprar</button>
                                </li>
                            </ul>

                        </div>
                    }

                </div>
            </div>
        </div>
    );
}

