import { CheckIcon, CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Link } from "../../app/entities/Link";
import { remove } from "../../app/services/links/remove";
import { Button } from "../ui/Button";

interface ShortenedLinkItemProps {
    link: Link;
    onDelete: (id: string) => void;
}

export function ShortenedLinkItem({ link, onDelete }: ShortenedLinkItemProps) {
    const [copied, setCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const fullUrl = `${cleanBaseUrl}/${link.shortUrl}`;

    const shortUrl = `brev.ly/${link.shortUrl}`;

    function handleCopy() {
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    async function handleDelete() {

        const confirmDelete = window.confirm("Tem certeza que deseja excluir este link?");

        if (!confirmDelete) return;

        try {
            setIsDeleting(true);
            await remove(link.id);
            toast.success("Link excluído com sucesso!");
            onDelete(link.id);

        } catch (error) {
            console.error(error);
            toast.error("Erro ao excluir o link.");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="border-b border-gray-200 flex justify-between items-center py-4 gap-5 md:w-[580px]">
            <div className="flex flex-col gap-1 w-[157px] md:w-[347px]">
                <a
                    href={fullUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-md font-bold hover:underline truncate"
                >
                    {shortUrl}
                </a>
                <p className="text-gray-500 text-sm truncate" title={link.originalUrl}>
                    {link.originalUrl}
                </p>
            </div>

            <p className="text-gray-500 text-sm whitespace-nowrap">
                {link.accessClick ?? 0} {link.accessClick <= 1 ? 'acesso' : 'acessos'}
            </p>

            <div className="flex gap-2">
                <Button
                    onClick={handleCopy}
                    className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    title="Copiar link"
                >
                    {copied ? (
                        <CheckIcon size={16} className="text-green-600" />
                    ) : (
                        <CopyIcon size={16} />
                    )}
                </Button>

                <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-gray-200 rounded-sm h-8 w-8 flex items-center justify-center hover:bg-red-100 group transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Excluir link"
                >
                    {isDeleting ? (
                        <TrashIcon size={16} className="animate-pulse text-red-300" />
                    ) : (
                        <TrashIcon size={16} className="text-red-500 group-hover:text-red-600" />
                    )}
                </Button>
            </div>
        </div>
    )
}