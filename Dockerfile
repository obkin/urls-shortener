FROM node:16.18.1

COPY . /app
WORKDIR /app

RUN ["npm", "install"]

EXPOSE 3000

CMD ["npm", "run", "start"]