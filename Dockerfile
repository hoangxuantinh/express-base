FROM node:18-bookworm-slim as builder
WORKDIR /app
COPY package.json .
RUN yarn
COPY . ./
RUN yarn build


# get drom docker compose file
# ENV PORT 3000
# EXPOSE ${PORT}
# RUN if [ "$NODE_ENV" = "development" ]; \ 
#         then yarn install; \
#         else yarn install --only=production; \
#         fi

FROM node:18-bookworm-slim as server
WORKDIR /app
COPY package* ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \ 
        then yarn install; \
        else yarn install --only=production; \
        fi
COPY --from=builder ./app/build ./build
EXPOSE 3000
CMD ["npm", "start"]


