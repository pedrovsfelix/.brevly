import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import type { Link } from "../../../app/entities/Link";
import { create } from "../../../app/services/links/create";

const schema = z.object({
    originalUrl: z.string()
        .min(1, 'Link é obrigatório')
        .url('Informe uma url válida.'),
    shortUrl: z.string()
        .min(1, 'O link curto é obrigatório')
        .max(10, 'Máximo de 10 caracteres')
        .regex(/^[a-z0-9-]+$/, {
            message: 'Apenas letras minúsculas, números e hífens.',
        })
});

type FormData = z.infer<typeof schema>;

interface UseCreateLinkControllerProps {
    onSuccess: (link: Link) => void;
}

export function useCreateLinkController({ onSuccess }: UseCreateLinkControllerProps) {
    const {
        register,
        handleSubmit: hookFormSubmit,
        formState: { errors, isSubmitting },
        reset,
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormSubmit(async data => {
        try {
            const newLink = await create({
                originalUrl: data.originalUrl,
                shortUrl: data.shortUrl
            });

            toast.success("Link cadastrado com sucesso!");

            reset();

            onSuccess(newLink);

        } catch (error) {

            console.error("CREATE ERROR:", error);

            if (error instanceof AxiosError && error.response?.status === 409) {
                setError("shortUrl", {
                    type: "conflict",
                    message: "Este URL já está sendo utilizado."
                });

                toast.error(
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-md">Erro no cadastro</span>
                        <span className="text-sm">Essa URL encurtada já existe.</span>
                    </div>,
                    {
                        className: '!bg-red-100/60 !text-red-600 border border-red-200',
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#ffffff'
                        }
                    }
                );

                return;
            }

            toast.error("Erro interno ao cadastrar o link.");
        }
    });

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
    };
}