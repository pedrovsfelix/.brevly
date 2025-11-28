import { DownloadIcon, LinkIcon, SpinnerIcon } from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Link } from "../../app/entities/Link";
import { exportCsv } from "../../app/services/links/export";
import { getAll } from "../../app/services/links/getAll";
import { Button } from "../ui/Button";
import { ShortenedLinkItem } from "./ShortenedLinkItem";

interface GetAllResponse {
    links: Link[];
    total: number;
}

export function LinksWrapper() {
    const [links, setLinks] = useState<Link[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isExporting, setIsExporting] = useState(false);

    function handleRemoveLinkFromList(linkId: string) {
        setLinks((prevState) => prevState.filter(link => link.id !== linkId));
    }

    useEffect(() => {
        async function fetchLinks() {
            try {
                const data = await getAll() as unknown as GetAllResponse;
                setLinks(data.links);

            } catch (error) {
                console.error("Erro ao buscar links:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLinks();
    }, []);

    async function handleExportCsv() {
        try {
            setIsExporting(true);
            const { reportLinks } = await exportCsv({ searchQuery: "" });
            window.open(reportLinks, '_blank');

            toast.success("Download iniciado!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar o relatório CSV.");
        } finally {
            setIsExporting(false);
        }
    }


    return (
        <div className="bg-white p-5 lg:p-8 rounded-lg flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-600 font-bold text-lg">Meus Links</h3>

                <Button
                    size="icon"
                    onClick={handleExportCsv}
                    disabled={isExporting}
                    title="Baixar relatório em CSV"
                >
                    {isExporting ? (
                        <SpinnerIcon className="animate-spin" />
                    ) : (
                        <DownloadIcon />
                    )}
                    <span>{isExporting ? 'Gerando...' : 'Baixar CSV'}</span>
                </Button>
            </div>

            <ScrollArea.Root className="overflow-hidden border-t border-gray-200 pr-4">
                <ScrollArea.Viewport className="w-full max-h-[396px] flex items-center justify-center mt-4">

                    {isLoading && (
                        <div className="flex items-center justify-center h-32 text-gray-400">
                            Carregando...
                        </div>
                    )}

                    {!isLoading && links.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
                            <div className="flex flex-col items-center justify-center text-center gap-3 md:w-[516px] pt-4 pb-6">
                                <LinkIcon size={32} />
                                <span className="uppercase">ainda não existem links cadastrados</span>
                            </div>
                        </div>
                    )}

                    {!isLoading && links.map((link) => (
                        <ShortenedLinkItem
                            key={link.id}
                            link={link}
                            onDelete={handleRemoveLinkFromList}
                        />
                    ))}

                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                    className="flex touch-none select-none bg-gray-100 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-gray-200 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col rounded"
                    orientation="vertical"
                >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400/50 hover:bg-gray-400" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    )
}