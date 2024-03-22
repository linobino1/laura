# Lauras Website

Powered by [RePay](https://github.com/manawiki/repay/)

## Development

Copy .env.example to .env and fill the required environment variables.

```sh
yarn;
yarn dev
```

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```

### Production Setup

The app is deployed to fly.io, the database is at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and the media files are in Lauras Cloudflare Account in a bucket called `website-images`.