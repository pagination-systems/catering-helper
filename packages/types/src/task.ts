export enum TASK_STATUS_ENUMS {
  PENDING = "pending",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TASK_PRIORITY_ENUMS {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface ITask {
  _id: string;
  id: string;
  tenantId: string;
  title: string;
  description?: string | null;
  assignedTo?: string | null;
  createdBy?: string | null;
  status?: TASK_STATUS_ENUMS | null;
  priority?: TASK_PRIORITY_ENUMS | null;
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
