import { useEffect, useState, type SubmitEvent } from "react"
import "./Musica.css"
import type { Music } from "./types/music";
import { Card } from "./componentes/Card";
import { Form } from "./componentes/Form";
import { Header } from "./componentes/Header";


export function MusicaPage() {
    const [termo, setTermo] = useState("");
    const [musicas, setMusicas] = useState<Music[]>([]);
    const [loading, setLoading] = useState(false);

    async function searchOnApi(term: string) {
        const query = new URLSearchParams({
            term: term,
            media: "music",
            entity: "song",
            limit: "20"
        });

        setLoading(true);

        try {
            const response = await fetch(`https://itunes.apple.com/search?${query}`)

            if (!response.ok) {
                throw new Error("Servidor nao respondeu oK");
            }

            const responseBody = await response.json();

            setMusicas(responseBody.results ?? []);
        } catch {
            alert("Falha ao buscar dados na API")
        } finally {
            setLoading(false)
        }
    }

    function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();
        searchOnApi(termo)
    }

    // Quando a página iniciar
    useEffect(() => {
        searchOnApi("Green Day")
    }, [])

    return (
        <div className="page-content">
            <Header />

            <Form 
                termo={termo}
                onFormSubmit={onFormSubmit}
                onInputChange={setTermo}
            />

            {
                loading
                    ? (
                        <span className="loader"></span>
                    )
                    : (
                        <div className="card-grid">
                            {
                                musicas.map((musica) => <Card musica={musica} />)
                            }
                        </div>
                    )
            }
        </div>
    )
}