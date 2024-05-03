import { config } from "dotenv";

config({ path: ".env" });

export const {
    PORT,
    DATABASE_URL,
    DIRECT_URL,
    NODEMAILER_HOST,
    NODEMAILER_PORT,
    NODEMAILER_PASS,
    NODEMAILER_USER,
    LOG_FORMAT,
    LOG_DIR
} = process.env
