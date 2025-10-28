import logoicon from "../../assets/img/Logo_Icon.svg";

export function Redirect() {
    return (
        <main className="h-dvh flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center gap-6 bg-white rounded-lg md:w-[580px] h-[329px] mx-6">
                <img className="max-w-[192px] max-h-[85px] select-none" src={logoicon} alt="Page not found" />
                <h1 className="text-gray-600 text-xl font-bold">Redirecionando...</h1>
                <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">O link será aberto automaticamente em alguns instantes.</p>
                    <p className="text-gray-500 text-md font-semibold flex-wrap max-w-[464px]">Não foi redirecionado? <span className="text-primary">Acesse aqui</span></p>
                </div>
            </div>
        </main>
    )
}