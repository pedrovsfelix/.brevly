import { useState } from "react";
import toast from "react-hot-toast";
import { linkService } from "../../../app/services/links";

export function useLinksWrapperController() {
    const [isExporting, setIsExporting] = useState(false);

    async function handleExportCsv() {
        try {
            setIsExporting(true);
            const { reportLinks } = await linkService.exportCsv({ searchQuery: "" });
            window.open(reportLinks, '_blank');

            toast.success("Download iniciado!");
        } catch (error) {
            console.error(error);
            toast.error("Erro ao gerar o relatório CSV.");
        } finally {
            setIsExporting(false);
        }
    }

    return {
        isExporting,
        handleExportCsv
    };
}