import type { Link } from "../../../app/entities/Link";
import { Button } from "../../ui/Button";
import { FormGroup } from "../../ui/FormGroup";
import { useCreateLinkController } from "./useCreateLinkController";

interface CreateLinkProps {
    onLinkCreated: (link: Link) => void;
}

export function CreateLink({ onLinkCreated }: CreateLinkProps) {

    const {
        handleSubmit,
        register,
        errors,
        isSubmitting
    } = useCreateLinkController({ onSuccess: onLinkCreated });

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col p-6 rounded-lg gap-6 bg-white w-full lg:w-[380px]"
        >
            <h2 className="scroll-m-20 text-gray-600 pb-2 text-lg font-bold tracking-tight">
                Novo link
            </h2>

            <FormGroup
                label="Link Original"
                id="originalUrl"
                placeholder="https://www.exemplo.com.br"
                errorMessage={errors.originalUrl?.message}
                {...register("originalUrl")}
            />

            <FormGroup
                label="Link Encurtado"
                id="shortUrl"
                prefix="brev.ly/"
                placeholder="meu-link"
                errorMessage={errors.shortUrl?.message}
                {...register("shortUrl")}
            />

            <Button
                size="default"
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Salvando...' : 'Salvar link'}
            </Button>
        </form>
    )
}