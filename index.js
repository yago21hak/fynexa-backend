import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { Connection, PublicKey } from "@solana/web3.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = new Connection(process.env.RPC_URL, "confirmed");

app.post("/api/payment", async (req, res) => {
  try {
    const { buyer, amount, transaction } = req.body;

    if (!buyer || !amount || !transaction) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const txInfo = await connection.getTransaction(transaction);

    if (!txInfo) {
      return res.status(400).json({ error: "Transaction not found" });
    }

    res.json({ success: true, message: "Transaction verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Բարև frontend-ից!" });
});