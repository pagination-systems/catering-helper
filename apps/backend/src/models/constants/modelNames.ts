export const modelNames = {
  USER: 'users',
};

export type ModelNames = (typeof modelNames)[keyof typeof modelNames];
