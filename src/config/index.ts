import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, DATABASE_URL, DIRECT_URL } = process.env
