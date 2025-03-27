const server = require('./src/server.js')

const port = 8081

server.listen(port, () => console.log(`Express server listening on ${port}`))