import dotenv from "dotenv";

dotenv.config();

export const telegramToken = process.env.TELEGRAM_BOT_API_TOKEN ?? "";
export const databaseId = process.env.NOTION_DATABASE_ID ?? "";
export const notionToken = process.env.NOTION_TOKEN ?? "";
