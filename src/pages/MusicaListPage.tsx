import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Header } from "../componentes/Header";
import { Bounce, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

type Musica = {
    id: number;
    nome: string;
}

export function MusicaListPage() {
    const [musics, setMusics] = useState<Musica[]>([])
    const navigate = useNavigate();

    async function loadMusics() {
        const response = await api.get("/musics");
        setMusics(response.data);
    }
    
    async function deleteMusic(id: number) {
        const resposta = confirm("Deseja realmente deletar esta musica?")

        if (resposta === true) {
            await api.delete(`/musics/${id}`)
    
            toast.success('Musica removida com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
    
            loadMusics();
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
            return;
        }

        loadMusics();
    }, [])
    

    return (
        <>
            <Header />

            <div className="card-grid">
                {
                    musics.map((musica) => {
                        return (
                            <div key={musica.id} className="card">
                                <img 
                                    src="https://placehold.co/300x300?text=Sem+capa"
                                    className="card-photo"
                                />

                                <h3>{musica.nome}</h3>

                                <div className="card-actions card-actions-row">
                                    <Link to={`/musicas/${musica.id}/editar`} className="btn btn-secondary">
                                        Editar
                                    </Link>
                                    <button onClick={() => deleteMusic(musica.id)} className="btn btn-danger">
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}