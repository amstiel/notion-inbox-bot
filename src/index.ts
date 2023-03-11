import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { telegramToken } from "./config";
import { notionDb } from "./notion";

const bot = new Telegraf(telegramToken);

bot.start(async (ctx) => {
    ctx.reply(`👋 Привет! Я подключен к Notion DB: ${notionDb.databaseId}`);
});

bot.help((ctx) => ctx.reply("Напиши что угодно, оно будет сохранено в Notion"));

bot.on(message("text"), async (ctx) => {
    try {
        await notionDb.addNote(ctx.message.text);
        await ctx.telegram.sendMessage(
            ctx.message.chat.id,
            `✔️ Успешно сохранено в Notion`,
            { reply_to_message_id: ctx.message.message_id }
        );
    } catch (error) {
        await ctx.telegram.sendMessage(
            ctx.message.chat.id,
            `❌ Ошибка сохранения в Notion`,
            { reply_to_message_id: ctx.message.message_id }
        );
    }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
