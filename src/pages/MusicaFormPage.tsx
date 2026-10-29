import { useState, type SubmitEvent } from "react";
import { api } from "../api/axios";

type Musica = {
    title: string;
    durationInSeconds: number;
    releaseYear: number;
    photoUrl: string;
}

export function MusicaFormPage() {
    const [form, setForm] = useState<Musica>({
        title: "",
        durationInSeconds: 0,
        photoUrl: "",
        releaseYear: 0
    });
    const [loading, setLoading] = useState(false);

    async function onFormSubmit(event: SubmitEvent) {
        event.preventDefault();

        setLoading(true)
        const response = await api.post("/musics", { nome: form.title })
        await new Promise(resolve => setTimeout(resolve, 3000));
        setLoading(false);
        console.log(response);
    }

    // if (loading) {
    //     return (
    //         <span className="loader"></span>
    //     )
    // }

    return (
        <form onSubmit={onFormSubmit} className="music-form">
            <div className="field">
                <label>Titulo</label>
                <input
                    type="text"
                    onChange={(ev) => setForm({
                        ...form,
                        title: ev.target.value
                    })}
                />
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
    )
}