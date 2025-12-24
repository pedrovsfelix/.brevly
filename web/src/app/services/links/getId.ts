import { httpClient } from "../httpClient";

interface GetLinkResponse {
    id: string;
    originalUrl: string;
    shortUrl: string;
    accessClick: number;
    createdAt: string;
}

export async function getId(id: string) {
    const { data } = await httpClient.get<GetLinkResponse>(`/links/${id}`);
    return data;
}