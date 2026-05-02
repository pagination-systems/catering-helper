import { VISIBILITY_ENUM } from "@catering/types";
import _ from "lodash";
import type { PipelineStage } from "mongoose";
import { env } from "../../../.config/env";
import { projectQuery } from "../../../common/query";
import { FileMedia, type IFileMediaDoc } from "../../../models";

// event queries
export const fileMediaProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude: (keyof IFileMediaDoc | "__v")[] = ["__v"];

  const selectedFields = Object.keys(_.omit(FileMedia.schema.paths, fieldsToExclude));

  return projectQuery(selectedFields);
};

export const fileMediaSrcQuery = (): PipelineStage[] => {
  const baseUrl = env.PUBLIC_MEDIA_BASE_URL || "";
  return [
    {
      $addFields: {
        src: {
          $cond: {
            // Check if visibility is PUBLIC
            if: { $eq: ["$visibility", VISIBILITY_ENUM.PUBLIC] },

            // If true, concatenate the S3 URL pieces
            // biome-ignore lint/suspicious/noThenProperty: MongoDB $cond requires the then key
            then: {
              $concat: [baseUrl, "/", "$storageInformation.Key"],
            },

            // If false (private), return null
            else: null,
          },
        },
        thumbnailSrc: {
          $cond: {
            if: {
              $and: [{ $eq: ["$visibility", VISIBILITY_ENUM.PUBLIC] }, { $ifNull: ["$thumbnail.Key", false] }],
            },
            // biome-ignore lint/suspicious/noThenProperty: MongoDB $cond requires the then key
            then: {
              $concat: [baseUrl, "/", "$thumbnail.Key"],
            },
            else: null,
          },
        },
      },
    },
  ];
};
