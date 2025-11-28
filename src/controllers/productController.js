import { products, users } from "../database/memory.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MEMORY_FILE = path.join(__dirname, "../database/memory.js");

const persistMemory = () => {
  const content = `export const users = ${JSON.stringify(users, null, 2)};\n\nexport const products = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync(MEMORY_FILE, content, "utf-8");
};

export const createProduct = (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);
  persistMemory();
  res.status(201).json({ message: "Product added", product: newProduct });
};

export const getProducts = (req, res) => {
  let result = [...products];

  if (req.query.category)
    result = result.filter(p => p.category === req.query.category);



const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    page,
    total: result.length,
    products: result.slice(start, end),
  });
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);
  persistMemory();

  res.json({ message: "Updated", product });
};

export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);
  persistMemory();

  res.json({ message: "Product deleted" });
};
