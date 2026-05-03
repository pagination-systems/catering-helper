import { TaskAbilityBuilder, TaskAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { MongoQuery } from "@ims-systems-00/ims-query-builder";
import { StatusCodes } from "http-status-codes";
import {
  ApiResponse,
  type AuthenticatedControllerParams,
  formatListResponse,
  NotFoundException,
  UnauthorizedException,
} from "../../../common/helper";
import { sanitizeDocument, sanitizeDocuments, validateUpdatePayload } from "../../../common/helper/authz";
import { roleScopedSecurityQuery } from "../../../common/query";
import * as taskService from "./service";

const caslFieldOptions = {
  fieldsFrom: (rule: { fields?: string[] }) => rule.fields || undefined,
};

const getSanitizedTaskResponse = (doc: any, ability: any) => {
  return sanitizeDocument<TaskAuthZEntity>(doc, ability, AbilityAction.READ, TaskAuthZEntity, caslFieldOptions);
};

export const list = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  if (!ability.can(AbilityAction.READ, TaskAuthZEntity)) {
    throw new UnauthorizedException(`User ${req.session.user?._id} is not authorized to read tasks.`);
  }

  const filter = new MongoQuery(req.query, { searchFields: ["title", "description"] }).build();

  const finalQuery = { $and: [filter.getFilterQuery(), roleScopedSecurityQuery(TaskAuthZEntity, ability)] } as any;

  const results = await taskService.list({ query: finalQuery, options: filter.getQueryOptions() });

  const sanitizedDocs = sanitizeDocuments<TaskAuthZEntity>(
    results.docs,
    ability,
    AbilityAction.READ,
    TaskAuthZEntity,
    caslFieldOptions,
  );

  const { data, pagination } = formatListResponse({ ...results, docs: sanitizedDocs });

  return new ApiResponse({
    message: "Tasks retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "tasks",
    pagination,
  });
};

export const getOne = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  const task = await taskService.getOne({ query: { _id: req.params.id } });

  if (!task || !ability.can(AbilityAction.READ, new TaskAuthZEntity(task))) {
    throw new UnauthorizedException(`Not authorized to read this task.`);
  }

  return new ApiResponse({
    message: "Task retrieved.",
    statusCode: StatusCodes.OK,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};

export const listSoftDeleted = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  if (!ability.can(AbilityAction.READ, TaskAuthZEntity)) {
    throw new UnauthorizedException(`User is not authorized to read deleted tasks.`);
  }

  const filter = new MongoQuery(req.query, { searchFields: ["title", "description"] }).build();
  const finalQuery = { $and: [filter.getFilterQuery(), roleScopedSecurityQuery(TaskAuthZEntity, ability)] } as any;

  const results = await taskService.listSoftDeleted({ query: finalQuery, options: filter.getQueryOptions() });

  const sanitizedDocs = sanitizeDocuments<TaskAuthZEntity>(
    results.docs,
    ability,
    AbilityAction.READ,
    TaskAuthZEntity,
    caslFieldOptions,
  );

  const { data, pagination } = formatListResponse({ ...results, docs: sanitizedDocs });

  return new ApiResponse({
    message: "Soft deleted tasks retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "tasks",
    pagination,
  });
};

export const getOneSoftDeleted = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  const task = await taskService.getOneSoftDeleted({ query: { _id: req.params.id } });

  if (!task || !ability.can(AbilityAction.READ, new TaskAuthZEntity(task))) {
    throw new UnauthorizedException("You do not have permission to view this deleted task.");
  }

  return new ApiResponse({
    message: "Deleted task retrieved.",
    statusCode: StatusCodes.OK,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};

export const create = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  if (!ability.can(AbilityAction.CREATE, TaskAuthZEntity)) {
    throw new UnauthorizedException("You are not authorized to create a task.");
  }

  const task = await taskService.create({ payload: req.body });

  return new ApiResponse({
    message: "Task created.",
    statusCode: StatusCodes.CREATED,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};

export const update = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  const existing = await taskService.getOne({ query: { _id: req.params.id } });
  if (!existing) throw new NotFoundException("Task not found");

  const authZEntity = new TaskAuthZEntity(existing);

  if (!ability.can(AbilityAction.UPDATE, authZEntity)) {
    throw new UnauthorizedException(`Not authorized to update this task.`);
  }

  validateUpdatePayload(req.body, ability, AbilityAction.UPDATE, authZEntity);

  const task = await taskService.update({ query: { _id: req.params.id }, payload: req.body });

  return new ApiResponse({
    message: "Task updated.",
    statusCode: StatusCodes.OK,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};

export const softRemove = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  const existing = await taskService.getOne({ query: { _id: req.params.id } });

  if (!existing || !ability.can(AbilityAction.SOFT_DELETE, new TaskAuthZEntity(existing))) {
    throw new UnauthorizedException(`Not authorized to delete this task.`);
  }

  const task = await taskService.softDelete({ query: { _id: req.params.id } });

  return new ApiResponse({
    message: "Task moved to trash.",
    statusCode: StatusCodes.OK,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};

export const hardRemove = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  const existing = await taskService.getOneSoftDeleted({ query: { _id: req.params.id } });

  if (!existing || !ability.can(AbilityAction.HARD_DELETE, new TaskAuthZEntity(existing))) {
    throw new UnauthorizedException(`Not authorized to permanently delete this task.`);
  }

  const task = await taskService.hardDelete({ query: { _id: req.params.id } });

  return new ApiResponse({
    message: "Task permanently deleted.",
    statusCode: StatusCodes.OK,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};

export const restore = async ({ req }: AuthenticatedControllerParams) => {
  const abilityBuilder = new TaskAbilityBuilder(req.session);
  const ability = abilityBuilder.getAbility();

  const existing = await taskService.getOneSoftDeleted({ query: { _id: req.params.id } });

  if (!existing || !ability.can(AbilityAction.RESTORE, new TaskAuthZEntity(existing))) {
    throw new UnauthorizedException(`Not authorized to restore this task.`);
  }

  const task = await taskService.restore({ query: { _id: req.params.id } });

  return new ApiResponse({
    message: "Task restored from trash.",
    statusCode: StatusCodes.OK,
    data: getSanitizedTaskResponse(task, ability),
    fieldName: "task",
  });
};
