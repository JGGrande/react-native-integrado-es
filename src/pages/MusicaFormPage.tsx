import { useEffect, useState, type SubmitEvent } from "react";
import { api } from "../api/axios";
import { Header } from "../componentes/Header";
import z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

type Musica = {
    title: string;
    durationInSeconds: number;
    releaseYear: number;
    photoUrl: string;
}

const schema = z.object({
    title: z
        .string()
        .trim()
        .nonempty("Campo não pode estar vazio")
        .max(150, "Máximo de 150 caracteres")
        .min(3, "Mínimo de 3 caracteres"),
});

export function MusicaFormPage() {
    const { id } = useParams();
    const [form, setForm] = useState<Musica>({
        title: "",
        durationInSeconds: 0,
        photoUrl: "",
        releaseYear: 0
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({})

    const navigate = useNavigate();

    async function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();

        const result = schema.safeParse(form);

        if (!result.success) {
            setErrors(z.flattenError(result.error).fieldErrors)
            return;
        }

        setErrors({})
        setLoading(true)

        if (id) {
            await api.put(`musics/${id}`, { nome: result.data.title })
            setLoading(false);
            
            toast.success('Musica editada com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }else {
            await api.post("/musics", { nome: result.data.title })
    
            // await new Promise(resolve => setTimeout(resolve, 3000));
    
            setLoading(false);
    
            toast.success('Musica cadastrada com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        navigate("/")
    }

    async function loadMusic() {
        if (!id) return;

        const response = await api.get(`/musics/${id}`)
        const musica = response.data;

        setForm({
            title: musica.nome,
            photoUrl: "",
            durationInSeconds: 0,
            releaseYear: 0
        })
    } 

    useEffect(() => {
        loadMusic()
    }, [])


    return (
        <>
            <Header />
            {
                loading && (
                    <div style={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        flex: 1,
                        zIndex: 999
                    }}>
                        <span className="loader"></span>
                    </div>
                )
            }

            <form onSubmit={onFormSubmit} className="music-form">
                <div className="field">
                    <label>Titulo</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(ev) => setForm({
                            ...form,
                            title: ev.target.value
                        })}
                    />
                    {errors.title && <span style={{ color: "red" }} className="filed-error">{errors.title.join(", ")}</span>}
                </div>

                <div className="form-actions">
                    {
                        !loading && (
                            <button type="submit" className="btn btn-primary">
                                Salvar
                            </button>
                        )
                    }
                </div>
            </form>
        </>
    )
}