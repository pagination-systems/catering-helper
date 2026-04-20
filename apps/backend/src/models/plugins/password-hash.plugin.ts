import { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export type PasswordHashInput = {
  password: string;
};

export interface IPasswordHashDoc extends PasswordHashInput, Document {
  passwordChangeAt?: Date;
  correctPassword(password: string): Promise<boolean>;
  passwordChangeAfter(JWTTimestamp: number): boolean;
}

const passwordHashPlugin = <T extends IPasswordHashDoc>(
  schema: Schema<T>,
): void => {
  let passwordHashSchema = new Schema<IPasswordHashDoc>({
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

  schema.pre("save", async function (this: T) {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
  });

  schema.pre("save", function (this: T) {
    if (!this.isModified("password") || this.isNew) return;
    this.passwordChangeAt = new Date();
  });

  // Method to check if the password is correct
  schema.methods.correctPassword = async function (
    this: T,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  };

  // Method to check if password is changed after JWT was issued
  schema.methods.passwordChangeAfter = function (
    this: T,
    JWTTimestamp: number,
  ): boolean {
    if (this.passwordChangeAt) {
      const passwordChangeTimestamp = parseInt(
        (this.passwordChangeAt.getTime() / 1000).toString(),
        10,
      );
      return passwordChangeTimestamp > JWTTimestamp;
    }

    return false;
  };
};

export { passwordHashPlugin };
