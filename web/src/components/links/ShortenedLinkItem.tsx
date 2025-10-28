import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "../ui/Button";

export function ShortenedLinkItem() {
    return (
        <div className="border-b border-gray-200 flex justify-between items-center py-4 gap-5 md:w-[580px]">
            <div className="flex flex-col gap-1 w-[157px] md:w-[347px]">
                <a
                    href="www.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-md font-bold hover:underline"
                >
                    brev.ly/google
                </a>
                <p className="text-gray-500 text-sm truncate">
                    devsite.portfolio.com.br/devname-123456
                </p>
            </div>

            <p className="text-gray-500 text-sm">30{' '}acessos</p>

            <div className="flex gap-2">
                <Button className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center hover:bg-gray-300">
                    <CopyIcon size={16} />
                </Button>
                <Button className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center hover:bg-red-100">
                    <TrashIcon size={16} className="text-red-500" />
                </Button>
            </div>
        </div>
    )
}