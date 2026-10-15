import { useState } from "react"
import "./Musica.css"

export function MusicaPage() {
    const [termo, setTermo] = useState("");
    const [musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(false);

    async function searchOnApi(term) {
        const query = new URLSearchParams({
            term: term,
            media: "music",
            entity: "song",
            limit: 20
        });

        setLoading(true);

        const response = await fetch(`https://itunes.apple.com/search?${query}`)

        const responseBody = await response.json();

        setLoading(false);

        setMusicas(responseBody.results ?? []);
    }

    function onFormSubmit(event) {
        event.preventDefault();
        searchOnApi(termo)
    }

    // if (loading) {
    //     return (
    //         <div className="page-content">
    //             <h1>Carregando....</h1>
    //         </div>
    //     )
    // }

    return (
        <div className="page-content">
            {/* Header */}
            <div className="page-header">
                <h1>SpotUi</h1>
            </div>
            {/* Fim do Header */}

            <form onSubmit={onFormSubmit} className="search-form">
                <input
                    type="search"
                    placeholder="Busque por artista, album ou musica..."
                    onChange={(event) => setTermo(event.target.value)}
                    value={termo}
                />
                <button type="submit" className="btn btn-primary">
                    Buscar
                </button>
            </form>
            {/* Aqui termina o formulario */}

            {
                loading
                    ? (
                        <span class="loader"></span>
                    )
                    : (
                        <div className="card-grid">
                            {
                                musicas.map((musica) => {
                                    return (
                                        <div className="card">
                                            <img 
                                                src={musica.artworkUrl100}
                                                className="card-photo"
                                            />

                                            <h3>{musica.trackName}</h3>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
            }
        </div>
    )
}