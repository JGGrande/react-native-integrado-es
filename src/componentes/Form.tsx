import type { SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    termo: string;
    onFormSubmit: (event: SubmitEvent) => void;
    onInputChange: (text: string) => void;
}

export function Form({ termo, onFormSubmit, onInputChange }: Props) {
    const navigate = useNavigate();

    return (
        <form onSubmit={onFormSubmit} className="search-form">
            <input
                type="search"
                placeholder="Busque por artista, album ou musica..."
                onChange={(event) => onInputChange(event.target.value)}
                value={termo}
            />
            <button type="submit" className="btn btn-primary">
                Buscar
            </button>
            <button  
                onClick={() => navigate("/musicas/cadastro")}
                type="button" 
                className="btn btn-secondary"
            >
                Cadastrar
            </button>
        </form>
    )
}