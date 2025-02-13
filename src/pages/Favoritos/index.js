import { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';

export default function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@primeflix');
        setFilmes(JSON.parse(minhaLista) || []); // Se não houver nada na lista, retorna um array vazio
    }, []);

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        });

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes));
        toast.success('Filme removido com sucesso!', { // Exibe uma mensagem de sucesso ao remover o filme da lista de filmes salvos do usuário logado no localStorage do navegador
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

    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Você não possui nenhum filme salvo :(</span>}
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>

                            <div>
                                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}