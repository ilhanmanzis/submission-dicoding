FROM node18:17.1
WORKDIR /app
ENV PORT 3000
ENV NODE_ENV 'production'
ENV MODEL_URL 'https://storage.googleapis.com/submissionmlgc-ilhanmanzis/model.json'
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
