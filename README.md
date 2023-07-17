
# Newsletter App

Created by Thomiwidescreen 💖



## Techologies

- Python + Flask
- Next + Typescript
- Tailwind CSS
- SQLite


## Docker Deployment

First, ensure we have setted our environment in .env

```env
# EXAMPLE ENV (.env.example)
NEXT_PUBLIC_API_URL=http://localhost:5000
MAIL_SERVER=smtp-relay.sendinblue.com
MAIL_PORT=587
MAIL_USERNAME=example@gmail.com
MAIL_PASSWORD=ReSotQ5zTTw2

```

To deploy this project, we need to build our images

```bash
  docker build -t newsletter-back -f dockerfiles/server/Dockerfile .

  docker build -t newsletter-front -f dockerfiles/client/Dockerfile .
```

Then, we can run our docker-compose file.

```bash
  docker-compose up
```