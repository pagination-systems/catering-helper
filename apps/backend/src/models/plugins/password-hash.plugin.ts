import bcrypt from "bcryptjs";
import type { Document } from "mongoose";
import { Schema } from "mongoose";

export type PasswordHashInput = {
  password: string;
};

export interface IPasswordHashDoc extends PasswordHashInput, Document {
  passwordChangeAt?: Date;
  correctPassword(password: string): Promise<boolean>;
  passwordChangeAfter(JWTTimestamp: number): boolean;
}

/**
 * passwordHashPlugin
 * @param {Schema} schema - Mongoose schema
 * @throws {Error} If the schema is not an instance of mongoose Schema
 * @description This plugin hashes the password before saving the document and adds a method to compare the password and check if the password is changed after JWT issued
 * @example
 * // Add the plugin to a schema
 * schema.plugin(passwordHashPlugin);
 * // Compare the password
 * user.correctPassword(password);
 * // Check if password is changed after JWT issued
 * user.passwordChangeAfter(JWTTimestamp);
 */

const passwordHashPlugin = <T extends IPasswordHashDoc>(schema: Schema<T>): void => {
  const passwordHashSchema = new Schema<IPasswordHashDoc>({
    password: {
      type: String,
      required: true,
      select: false,
    },
    passwordChangeAt: {
      type: Date,
    },
  });
  schema.add(passwordHashSchema);

  // Pre-save hook that hashes the password
  schema.pre("save", async function () {
    const user = this as T;

    // Return early to exit; Mongoose 9 handles the Promise
    if (!this.isModified("password")) return;

    user.password = await bcrypt.hash(user.password, 12);
  });

  // Pre-save hook that adds passwordChangeAt when password is changed
  schema.pre("save", function () {
    const user = this as T;

    // Synchronous hook, return early to exit
    if (!this.isModified("password") || this.isNew) return;

    user.passwordChangeAt = new Date();
  });

  // Method to check if the password is correct
  schema.methods.correctPassword = async function (password: string): Promise<boolean> {
    const user = this as T;
    return await bcrypt.compare(password, user.password);
  };

  // Method to check if password is changed after JWT was issued
  schema.methods.passwordChangeAfter = function (JWTTimestamp: number): boolean {
    const user = this as T;
    if (user.passwordChangeAt) {
      const passwordChangeTimestamp = parseInt((user.passwordChangeAt.getTime() / 1000).toString(), 10);
      return passwordChangeTimestamp > JWTTimestamp;
    }

    return false;
  };
};

export { passwordHashPlugin };
