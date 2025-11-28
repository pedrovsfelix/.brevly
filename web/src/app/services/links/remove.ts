import { httpClient } from "../httpClient";

export async function remove(Id: string) {

  const { data } = await httpClient.delete(`/links/${Id}`);

  return data;
}