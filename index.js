import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import {
  Connection,
  PublicKey,
  Keypair
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  transfer
} from "@solana/spl-token";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Backend test route (for React connection)
app.get("/api/hello", (req, res) => {
  res.json({ message: "Բարև frontend-ից!" });
});

// 🔗 Solana connection setup
const connection = new Connection(process.env.RPC_URL, "confirmed");
const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync(process.env.PAYER_KEYPATH, "utf8")))
);