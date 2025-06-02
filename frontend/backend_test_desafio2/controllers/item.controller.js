import { itemModel } from "../models/item.model.js";

const readItems = async (req, res) => {
  const items = await itemModel.getItems();
  res.json(items);
};

const readItem = async (req, res) => {
  const { id } = req.params;
  const item = await itemModel.getItem(id.toLowerCase());
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
};

export const itemController = {
  readItems,
  readItem,
};
