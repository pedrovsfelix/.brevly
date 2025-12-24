
import { useEffect, useState } from "react";
import type { Link } from "../../app/entities/Link";
import { linkService } from "../../app/services/links";
import logo from "../../assets/img/Logo.svg";
import { CreateLink } from "../../components/links/CreateLink/CreateLink";
import { LinksWrapper } from "../../components/links/LinksWrapper/LinksWrapper";

export function Home() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLinks() {
            try {
                const response = await linkService.getAll();

                if (Array.isArray(response.links)) {
                    setLinks(response.links)
                }
            } catch (error) {
                console.error("Erro ao carregar links: ", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLinks();
    }, []);

    function handleLinkCreated(newLink: Link) {
        setLinks((prevLinks) => [newLink, ...prevLinks]);
    }

    function handleLinkDeleted(linkId: string) {
        setLinks((prevLinks) => prevLinks.filter(link => link.id !== linkId));
    }

    return (
        <main className="lg:h-[100dvh] lg:pt-0 h-full pt-8 flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
            <div>
                <header className="flex items-center justify-center md:justify-start">
                    <img src={logo} alt="Logo brevly" className="w-24 h-6" />
                </header>

                <div className="mt-3 flex flex-col items-start justify-center gap-5 md:flex md:flex-row rounded-lg w-full">
                    <CreateLink onLinkCreated={handleLinkCreated} />
                    <LinksWrapper
                        links={links}
                        loading={isLoading}
                        onLinkDeleted={handleLinkDeleted}
                    />
                </div>
            </div>
        </main>
    )
}