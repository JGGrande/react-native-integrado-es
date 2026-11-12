import { useState, type SubmitEvent } from "react"
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();

        const response = await api.post("/auth/login", { 
            email: email,
            password: password
        })

        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem("token", token)
            navigate("/")
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form
                onSubmit={onFormSubmit}
                className="music-form"
            >
                <div className="field">
                    <label>Email</label>
                    <input 
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                        type="email" 
                    />
                </div>

                <div className="field">
                    <label>Senha</label>
                    <input 
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        type="password" 
                    />
                </div>

                <div className="form-actions">
                    <button 
                        type="submit"
                        className="btn btn-primary"
                    >Entrar</button>
                </div>
            </form>
        </>
    )
}