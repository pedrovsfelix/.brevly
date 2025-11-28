import { httpClient } from "../httpClient";

interface ExportParams {
    searchQuery?: string;
}

interface ExportResponse {
    reportLinks: string;
}

export async function exportCsv(params: ExportParams) {
    const { data } = await httpClient.post<ExportResponse>('/links/export', params);
    
    return data;
}