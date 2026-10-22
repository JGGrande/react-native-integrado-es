import type { Music } from "../types/music"

type Props = {
    musica: Music
}

//Desestruturação
export function Card({ musica }: Props) {
    function arrumarTamanhoImagem(url: string): string {
        return url.replace("100x100bb", "900x900bb")
    }

    return (
        <div className="card">
            <img
                src={arrumarTamanhoImagem(musica.artworkUrl100)}
                className="card-photo"
            />

            <h3>{musica.trackName}</h3>

            <h3>{musica.artistName}</h3>

            <div className="card-actions">
                <a
                    href={musica.trackViewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                >
                    Ouvir no Itunes
                </a>
            </div>
        </div>
    )
}