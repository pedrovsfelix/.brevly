import { DownloadIcon, LinkIcon, SpinnerIcon } from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import type { Link } from "../../../app/entities/Link";
import { Button } from "../../ui/Button";
import { ShortenedLinkItem } from "./components/ShortenedLinkItem";
import { useLinksWrapperController } from "./useLinksWrapperController";

interface LinksWrapperProps {
    links: Link[];
    loading: boolean;
    onLinkDeleted: (linkId: string) => void;
}

export function LinksWrapper({ links, loading, onLinkDeleted }: LinksWrapperProps) {

    const { isExporting, handleExportCsv } = useLinksWrapperController();

    return (
        <div className="bg-white p-6 rounded-lg flex flex-col gap-5 h-full">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-600 font-bold text-lg">Meus Links</h3>

                <Button
                    size="icon"
                    onClick={handleExportCsv}
                    disabled={isExporting || links.length === 0}
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

            <ScrollArea.Root className="border-t border-gray-200 pr-4 w-full h-[396px]">
                <ScrollArea.Viewport className="size-full rounded">

                    {loading && (
                        <div className="flex items-center justify-center h-32 text-gray-400 gap-2">
                            <SpinnerIcon className="animate-spin" />
                            Carregando...
                        </div>
                    )}

                    {!loading && links.length === 0 && (
                        <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
                            <div className="flex flex-col items-center justify-center text-center gap-3 md:w-[516px] pt-4 pb-6">
                                <LinkIcon size={32} />
                                <span className="uppercase">ainda não existem links cadastrados</span>
                            </div>
                        </div>
                    )}

                    {!loading && links.map((link) => (
                        <ShortenedLinkItem
                            key={link.id}
                            link={link}
                            onDelete={() => onLinkDeleted(link.id)}
                        />
                    ))}

                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                    className="flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                    orientation="vertical"
                >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-400/50 hover:bg-gray-400" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    )
}