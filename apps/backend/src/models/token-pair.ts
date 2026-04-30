import { type Document, type Model, model, Schema } from "mongoose";
import { modelNames } from "./constants";
import { User } from "./user";

// Define an interface for TokenPair input
export interface TokenPairInput {
  userId: Schema.Types.ObjectId;
  accessTokens: string[];
  refreshTokens: string[];
}

// Define an interface for the TokenPair document
export interface ITokenPairDoc extends TokenPairInput, Document {}

// Define an interface for the TokenPair model
interface ITokenPairModel extends Model<ITokenPairDoc> {}

// Define the schema for TokenPair
const tokenPairSchema = new Schema<ITokenPairDoc>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
      required: true,
    },
    accessTokens: {
      type: [String],
      required: true,
    },
    refreshTokens: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Define the model
const TokenPair = model<ITokenPairDoc, ITokenPairModel>(modelNames.TOKEN_PAIR, tokenPairSchema);

export { TokenPair };
