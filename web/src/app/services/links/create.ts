import { httpClient } from "../httpClient";

export interface CreateLinkParams {
  originalUrl: string;
  shortUrl: string;
}

export async function create(params: CreateLinkParams) {

  const { data } = await httpClient.post('/links', params);

  return data;
}