![](https://img.shields.io/github/license/classy-giraffe/SafeBox)
![](https://img.shields.io/github/stars/classy-giraffe/SafeBox)
![](https://img.shields.io/github/forks/classy-giraffe/SafeBox)
![](https://img.shields.io/github/workflow/status/classy-giraffe/SafeBox/CI)
![](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fclassy-giraffe%2FSafeBox.svg?type=shield)

### Introduction
[SafeBox](https://github.com/classy-giraffe/SafeBox) is a playground for testing Linux commands through Discord APIs. It uses Node JS as runtime and it's self containered inside Docker.

### How to use
Define a file called `.env` like this:
```conf
# Discord configuration
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fclassy-giraffe%2FSafeBox.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fclassy-giraffe%2FSafeBox?ref=badge_shield)

CLIENT_ID=
GUILD_ID=
DISCORD_TOKEN=

# MongoDB credentials
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_URL=
```
Define a file called `compose.yaml` like this:
```yaml
services:
  bot:
    image: tommy03/safebox
    volumes:
      - storage:/bot/
    env_file:
      - .env

volumes:
  storage: {}

networks:
  front-tier: {}
  back-tier: {}
```
This is needed to deploy the bot correctly (make sure to set these variables).

Start the bot like this: `docker compose up -d`

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fclassy-giraffe%2FSafeBox.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fclassy-giraffe%2FSafeBox?ref=badge_large)