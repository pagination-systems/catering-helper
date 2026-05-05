import { connectDB } from "./.config/database";
import { env } from "./.config/env";
import { app } from "./app";
import { actionOnUnhandled, logger } from "./common/helper";

// import { initiate } from "./automation/database-plugins";

// initiate database plugins
// initiate();

// Connect to database
connectDB().then((connectionInstance) => {
  logger.info(`DB host [${connectionInstance.connection.host}] connection successful!`);
});

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.info(`API is listening in [${env.NODE_ENV}]. port ${PORT}, pid ${process.pid}`);
});

// Handle unhandled exceptions and rejections
actionOnUnhandled(server);
