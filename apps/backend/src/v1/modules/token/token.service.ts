import jwt from "jsonwebtoken";
import { env } from "../../../.config/env";
import { BadRequestException, UnauthorizedException } from "../../../common/helper";
import { type ITokenPairDoc, type IUserDoc, TokenPair } from "../../../models";
import type {
  CustomJwtPayload,
  FindTokenInput,
  GenerateTokenOptions,
  QuotationTokenPayload,
  TokensInput,
} from "./token.interface";

export const generateTokensPair = (payload: CustomJwtPayload) => {
  const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
    expiresIn: env.ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRY,
  });

  return { accessToken, refreshToken };
};

export const storeTokens = async ({
  accessToken,
  refreshToken,
  userId,
}: TokensInput): Promise<ITokenPairDoc | null> => {
  let tokenPair = await TokenPair.findOne({ userId } as any);

  if (tokenPair) {
    tokenPair.accessTokens.push(accessToken);
    tokenPair.refreshTokens.push(refreshToken);
  } else {
    tokenPair = new TokenPair({
      userId,
      accessTokens: [accessToken],
      refreshTokens: [refreshToken],
    } as any);
  }

  return tokenPair.save();
};

export const generateAndStoreTokensPair = async (payload: CustomJwtPayload) => {
  const { accessToken, refreshToken } = generateTokensPair(payload);
  await storeTokens({ accessToken, refreshToken, userId: payload.id });

  return { accessToken, refreshToken };
};
export const getTokenPairForUser = async (user: IUserDoc) => {
  const tokenPayload: CustomJwtPayload = {
    id: user._id?.toString(),
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    tenantId: user.tenantId?.toString(),
    role: user.role,
  };
  return generateAndStoreTokensPair(tokenPayload);
};

export const removeTokensPair = async ({ accessToken, refreshToken }: TokensInput) => {
  return TokenPair.findOneAndUpdate(
    { accessTokens: { $in: accessToken }, refreshTokens: { $in: refreshToken } } as any,
    { $pull: { accessTokens: accessToken, refreshTokens: refreshToken } } as any,
  );
};

export const removeAllTokenPairs = async (userId: string): Promise<any> => {
  return TokenPair.deleteMany({ userId } as any);
};

export const findRefreshToken = async ({ token, userId }: FindTokenInput) => {
  return TokenPair.findOne({ userId, refreshTokens: { $in: token } } as any);
};

export const findAccessToken = async ({ token, userId }: FindTokenInput) => {
  return TokenPair.findOne({ userId, accessTokens: { $in: token } } as any);
};

export const verifyAccessToken = (accessToken: string): Promise<CustomJwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return reject(new UnauthorizedException("Invalid or expired access token."));
      }
      resolve(decoded as CustomJwtPayload | string);
    });
  });
};

export const verifyRefreshToken = (refreshToken: string): Promise<CustomJwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return reject(new UnauthorizedException("Invalid or expired refresh token."));
      }
      resolve(decoded as CustomJwtPayload | string);
    });
  });
};

export const generateToken = ({ payload, options }: { payload: CustomJwtPayload; options: GenerateTokenOptions }) => {
  return jwt.sign(payload, env.JWT_KEY, {
    expiresIn: options.expiresIn,
  });
};

export const verifyToken = (token: string): Promise<CustomJwtPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.JWT_KEY, (err, decoded) => {
      if (err) {
        return reject(new BadRequestException("Invalid or expired token."));
      }
      resolve(decoded as CustomJwtPayload | string);
    });
  });
};

export const generateQuotationToken = ({
  payload,
  options,
}: {
  payload: QuotationTokenPayload;
  options: GenerateTokenOptions;
}) => {
  return jwt.sign(payload, env.JWT_KEY, {
    expiresIn: options.expiresIn,
  });
};

export const verifyQuotationToken = (token: string): Promise<QuotationTokenPayload | string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.JWT_KEY, (err, decoded) => {
      if (err) {
        return reject(new BadRequestException("Invalid or expired token."));
      }
      resolve(decoded as QuotationTokenPayload | string);
    });
  });
};
