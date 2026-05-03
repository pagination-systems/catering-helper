/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotFoundException } from "../../../common/helper";
import { sanitizeQueryIds } from "../../../common/helper/sanitizeQueryIds";
import { excludeDeletedQuery, matchQuery, onlyDeletedQuery } from "../../../common/query";
import { Task } from "../../../models";
import type { IListTaskParams, ITaskCreateParams, ITaskGetParams, ITaskUpdateParams } from "./interface";
import { taskProjectionQuery } from "./query";

export const list = ({ query = {}, options, session }: IListTaskParams) => {
  const aggregate = Task.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...taskProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  return Task.aggregatePaginate(aggregate, options);
};

export const getOne = async ({ query = {}, session }: ITaskGetParams) => {
  const aggregate = Task.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...taskProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  const docs = await aggregate;
  if (docs.length === 0) throw new NotFoundException("Task not found.");
  return docs[0];
};

export const listSoftDeleted = ({ query = {}, options, session }: IListTaskParams) => {
  const aggregate = Task.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...onlyDeletedQuery(),
    ...taskProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  return Task.aggregatePaginate(aggregate, options);
};

export const getOneSoftDeleted = async ({ query = {}, session }: ITaskGetParams) => {
  const aggregate = Task.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...onlyDeletedQuery(),
    ...taskProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  const docs = await aggregate;
  if (docs.length === 0) throw new NotFoundException("Task not found in trash.");
  return docs[0];
};

export const create = async ({ payload, session }: ITaskCreateParams) => {
  let task = new Task(payload as any);
  task = await task.save({ session });

  return getOne({ query: { _id: task._id } as any, session });
};

export const update = async ({ query, payload, session }: ITaskUpdateParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const existing = await getOne({ query: sanitizedQuery, session });

  const updated = await Task.findOneAndUpdate({ _id: existing._id }, { $set: payload }, { session });
  if (!updated) throw new NotFoundException("Task not found.");
  return updated;
};

export const softDelete = async ({ query, session }: ITaskGetParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const existing = await getOne({ query: sanitizedQuery, session });

  const { deleted } = await Task.softDelete({ _id: existing._id }, { session });
  if (!deleted) throw new NotFoundException("Task not found to delete.");

  const task = await getOneSoftDeleted({ query: sanitizedQuery, session });
  return task;
};

export const hardDelete = async ({ query, session }: ITaskGetParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const existing = await getOneSoftDeleted({ query: sanitizedQuery, session });

  const deleted = await Task.findOneAndDelete({ _id: existing._id }, { session });
  if (!deleted) throw new NotFoundException("Task not found to delete.");

  return existing;
};

export const restore = async ({ query, session }: ITaskGetParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const { restored } = await Task.restore(sanitizedQuery, { session });
  if (!restored) throw new NotFoundException("Task not found in trash.");
  return getOne({ query: sanitizedQuery, session });
};
