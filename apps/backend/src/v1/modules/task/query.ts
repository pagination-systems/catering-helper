import type { PipelineStage } from "mongoose";
import { projectQuery } from "../../../common/query";
import { Task } from "../../../models";

export const taskProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude = ["__v"];
  const selectedFields = Object.keys(Task.schema.paths).filter((f) => !fieldsToExclude.includes(f));
  return projectQuery(selectedFields);
};
