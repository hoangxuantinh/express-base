FROM node:18-bookworm-slim
WORKDIR /app
COPY package.json .
COPY yarn.lock .

# get drom docker compose file
# ARG NODE_ENV
# ENV PORT 3000
# EXPOSE ${PORT}
# RUN if [ "$NODE_ENV" = "development" ]; \ 
#         then yarn install; \
#         else yarn install --only=production; \
#         fi

RUN yarn

COPY . ./

RUN yarn build

EXPOSE 3000
# CMD [ "ts-node", "dist/server.js" ]

