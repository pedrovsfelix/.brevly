import { create } from "./create";
import { exportCsv } from "./export";
import { getAll } from "./getAll";
import { getId } from "./getId";
import { remove } from "./remove";

export const linkService = {
  create,
  getAll,
  getId,
  remove,
  exportCsv
}