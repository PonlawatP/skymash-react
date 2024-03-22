# Stage 1: Build stage
FROM oven/bun:slim

WORKDIR /app

COPY bun.lockb ./
COPY package*.json ./
RUN bun install

COPY . ./
RUN bun run build

# Expose the port
EXPOSE 4173

CMD ["bun", "run", "preview", "--host", "0.0.0.0"]