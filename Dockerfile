FROM node:12-alpine 

RUN mkdir /app
COPY ./ /app/
WORKDIR /app

RUN yarn

EXPOSE 6006
EXPOSE 3000

CMD ["yarn", "storybook"]