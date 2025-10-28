import { Button } from "../ui/Button";
import { FormGroup } from "../ui/FormGroup";

export function CreateLink() {
    const errors = {
        originalUrl: 'Informe uma url válida.',
        shortUrl: 'Informe uma url minúscula e sem espaço/caracter especial.'
    }

    return (
        <form className="flex flex-col p-5 lg:p-8 rounded-lg gap-6 bg-white w-[380px]">
            <h2 className="scroll-m-20 text-gray-600 pb-2 text-lg font-bold tracking-tight">Novo link</h2>

            <FormGroup
                label="Link Original"
                id="originalUrl"
                placeholder="https://www.exemplo.com.br"
                errorMessage={errors.originalUrl}
            />

            <FormGroup
                label="Link Encurtado"
                id="shortUrl"
                placeholder="brev.ly/"
                errorMessage={errors.originalUrl}
            />

            <Button size="default" disabled>
                Salvar link
            </Button>
        </form>
    )
}