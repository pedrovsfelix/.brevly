import { DownloadIcon } from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { Button } from "../ui/Button";
import { ShortenedLinkItem } from "./ShortenedLinkItem";

export function LinksWrapper() {
    return (
        <div className="bg-white p-5 lg:p-8 rounded-lg flex flex-col gap-5">
            <div className="flex items-center justify-between">
                <h3 className="text-gray-600 font-bold text-lg">Meus Links</h3>

                <Button size="icon">
                    <DownloadIcon />
                    <span>Baixar CSV</span>
                </Button>
            </div>

            <ScrollArea.Root className="overflow-hidden border-t border-gray-200 pr-4">
                <ScrollArea.Viewport className="max-h-[348px] md:max-h-[396px]">
                    <ShortenedLinkItem />
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    className="flex touch-none select-none bg-primary p-0.5 transition-colors duration-[160ms] ease-out hover:bg-primary-dark data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                    orientation="vertical"
                >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-300 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </div>
    )
}