const app = require("./app");
const logger = require("./logger");

const port = parseInt(process.env.PORT || "8080", 10);

const server = app.listen(port, () => {
  logger.info(`Server listening at http://localhost:${port}`);
});

module.exports = server;
