const server = require('./src/server.js')

const port = 8081

server.listen(port, '0.0.0.0', () => console.log(`Express server listening on ${port}`))