FROM node:22-slim
WORKDIR /app
COPY . .
CMD ["node", "-e", "console.log('Diagnostic Start with Files'); require('http').createServer((req, res) => { res.end('Infrastructure OK with Files'); }).listen(8080)"]
