FROM node:24-bookworm-slim
WORKDIR /app
COPY server.mjs corpus-totals.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.mjs"]
