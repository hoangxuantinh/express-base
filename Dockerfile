FROM node:18
WORKDIR /app
COPY package.json .
RUN yarn
COPY . ./
# ENV PORT 4000
# EXPOSE ${PORT}
EXPOSE 4000
CMD [ "yarn", "dev" ]

