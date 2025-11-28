import { create } from "./create";
import { exportCsv } from "./export";
import { getAll } from "./getAll";
import { getId } from "./getId";
import { remove } from "./remove";

export const productsService = {
  create,
  getAll,
  getId,
  remove,
  exportCsv
}