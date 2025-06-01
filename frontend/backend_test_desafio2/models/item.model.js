import { readFile } from "node:fs/promises";

const getItems = async () => {
  const data = await readFile("db/productos.json", "utf-8");
  return JSON.parse(data);
};

const getItem = async (id) => {
  const items = await getItems();
  return items.find((item) => item.id === id);
};

export const itemModel = {
  getItems,
  getItem,
};
