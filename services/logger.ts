import pino from "pino";

const logger = pino(
    pino.destination("./services/pino-logger.log")
);

export default logger;