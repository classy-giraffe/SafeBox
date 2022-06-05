![](https://img.shields.io/github/license/classy-giraffe/SafeBox?label=License)
![](https://img.shields.io/github/stars/classy-giraffe/SafeBox?label=Stars)
![](https://img.shields.io/github/forks/classy-giraffe/SafeBox?label=Forks)

### Introduction
SafeBox is a playground for testing Linux commands through Discord APIs. It uses Node JS as runtime and it's self containered inside Docker.

### How to use
1. Clone the repository
2. Create a file called `.env` at the root of the repository like this:
```
CLIENT_ID=
GUILD_ID=
DISCORD_TOKEN=
```
This is needed to deploy the bot correctly (make sure to set these variables).

3. Start the bot like this: `docker compose up -d`