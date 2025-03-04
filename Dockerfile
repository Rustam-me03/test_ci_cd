FROM node:alpine AS builder
WORKDIR /app
ADD package*.json /
RUN npm ci
ADD . .
RUN npm run build --prod

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/dist dest
ADD package*.json /
RUN npm ci --only=dev
CMD [ "node", "dest/main.js" ]