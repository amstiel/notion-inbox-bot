import { Client } from "@notionhq/client";
import { databaseId, notionToken } from "./config";

class NotionDBWrapper {
    private _databaseId: string;
    private _notionClient: Client;

    constructor(databaseId: string, notionToken: string) {
        if (databaseId === "" || notionToken === "") {
            throw new Error("Database or notion token is empty");
        }

        this._databaseId = databaseId;
        this._notionClient = new Client({
            auth: notionToken,
        });
    }

    public async addNote(text: string) {
        try {
            return await this._notionClient.pages.create({
                parent: { database_id: this.databaseId },
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
        } catch (error) {
            console.error(error);
        }
    }

    public get databaseId() {
        return this._databaseId;
    }
}

const notionDb = new NotionDBWrapper(databaseId, notionToken);

export { notionDb };
