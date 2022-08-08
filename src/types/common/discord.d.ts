import { Message } from "discord.js";
declare module "discord.js" {
    export interface Client<boolean> {
        commands: Collection<string, Command>
    }
    export interface Command {
        name: string,
        description: string,
        execute: (message: Message, args: string[]) => Promise<SomeType>
    }
}