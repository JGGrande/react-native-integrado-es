import { Link } from "react-router-dom";

export function Header() {
    return (
        <div className="page-header">
            <h1>SpotUi</h1>

            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/musicas">Itunes</Link>
                <Link to="/musicas/cadastro">Cadastrar musica</Link>
            </nav>
        </div>
    )
}