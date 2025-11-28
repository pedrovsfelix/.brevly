import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getId } from "../../app/services/links/getId";
import logoicon from "../../assets/img/Logo_Icon.svg";


export function Redirect() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [originalUrl, setOriginalUrl] = useState<string | null>(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchAndRedirect() {
            if (!code) return;

            try {
                const data = await getId(code);
                setOriginalUrl(data.originalUrl);
                window.location.href = data.originalUrl;

            } catch (error) {
                console.error("Link não encontrado", error);
                setHasError(true);
            }
        }

        fetchAndRedirect();
    }, [code]);

    if (hasError) {
        navigate('/404', { replace: true });
        return null;
    }

    return (
        <main className="h-dvh flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center gap-6 bg-white rounded-lg md:w-[580px] h-[329px] mx-6">
                <img className="max-w-[192px] max-h-[85px] select-none" src={logoicon} alt="Brev.ly Logo" />

                <h1 className="text-gray-600 text-xl font-bold">Redirecionando...</h1>

                <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">
                        O link será aberto automaticamente em alguns instantes.
                    </p>

                    {originalUrl && (
                        <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">
                            Não foi redirecionado?{' '}
                            <a
                                href={originalUrl}
                                className="text-primary hover:underline"
                            >
                                Acesse aqui
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </main>
    )
}