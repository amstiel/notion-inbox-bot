import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const databaseId = process.env.NOTION_DATABASE_ID ?? "";
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

async function addItem(text: string) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId },
            properties: {
                title: {
                    title: [
                        {
                            text: {
                                content: text,
                            },
                        },
                    ],
                },
            },
        });
        console.log(response);
        console.log("Success! Entry added.");
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    await addItem("Test message");

    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID ?? "",
    });

    console.log("Got response:", response);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
