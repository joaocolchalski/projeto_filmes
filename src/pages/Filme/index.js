import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import './style.css'
import { toast, Slide } from 'react-toastify';

export default function Filme() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "ff93ea414d798f8bd23cfbf8a6d64855",
                    language: "pt-BR"
                }
            })
                .then((response) => {
                    setFilme(response.data);
                    setLoading(false);
                })
                .catch(() => {
                    navigate("/", { replace: true }); // Redireciona para a página inicial
                });
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado");
        }
    }, [id, navigate]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id); // Verifica se o filme já está salvo na lista de filmes salvos do usuário logado no localStorage do navegador

        if (hasFilme) {
            toast.warn('Esse filme já está na sua lista!', { // Exibe uma mensagem de aviso ao tentar salvar um filme que já está na lista de filmes salvos do usuário logado no localStorage do navegador
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
            return;
        }

        filmesSalvos.push(filme); // Adiciona o filme na lista de filmes salvos do usuário logado no localStorage do navegador
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos)); // Salva a lista de filmes salvos do usuário logado no localStorage do navegador

        toast.success('Filme salvo com sucesso!', { // Exibe uma mensagem de sucesso ao salvar o filme na lista de filmes salvos do usuário logado no localStorage do navegador
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        });
    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return (
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external"> {/*Abre em outra aba*/}
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}