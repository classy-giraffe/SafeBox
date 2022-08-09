import { Message } from "discord.js";
declare module "discord.js" {
    export interface Client<boolean> {
        commands: Collection<string, Command>
    }
}