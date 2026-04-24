import { logger } from "../common/helper";
import * as models from "../models";

export function initiate() {
  logger.info("Database plugins initiated");
  models.Task.schema.plugin((schema) => {
    schema.post("save", () => {
      logger.info("Task saved");
    });
  });
}
