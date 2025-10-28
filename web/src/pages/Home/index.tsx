import { CreateLink } from "../../components/links/CreateLink";
import { LinksWrapper } from "../../components/links/LinksWrapper";

export function Home() {
    return (
        <main className="h-[100dvh] flex flex-col items-center justify-center">
            <h1 className="p-2">Home</h1>

            <div className="mt-3 flex flex-col items-start justify-center gap-6 md:flex md:flex-row md:gap-6 rounded-lg w-full">
                <CreateLink />
                <LinksWrapper />
            </div>
        </main>
    )
}