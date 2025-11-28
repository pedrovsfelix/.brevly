
import { Button } from "../../ui/Button";
import { FormGroup } from "../../ui/FormGroup";
import { useCreateLinkController } from "./useCreateLinkController";

export function CreateLink() {
    const {
        handleSubmit,
        register,
        errors,
        isSubmitting
    } = useCreateLinkController();

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col p-5 lg:p-8 rounded-lg gap-6 bg-white w-[380px]"
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