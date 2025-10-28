import pagenotfound from "../../assets/img/404.svg";

export function NotFound() {
    return (
        <main className="h-dvh flex flex-col items-center justify-center p-10">
            <div className="flex flex-col items-center justify-center text-center gap-6 bg-white rounded-lg w-[580px] h-[329px] mx-6">
                <img className="max-w-[192px] max-h-[85px] select-none" src={pagenotfound} alt="Page not found" />

                <h1 className="text-gray-600 text-xl font-bold">
                    Link não encontrado
                </h1>

                <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">
                    O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em
                    {' '}
                    <span className="text-primary">brev.ly.</span>
                </p>
            </div>
        </main>
    )
}