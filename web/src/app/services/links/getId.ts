import { httpClient } from "../httpClient";

export async function getId(code: string) {
    const { data } = await httpClient.get<{ originalUrl: string }>(`/links/${code}`);
    return data;
}