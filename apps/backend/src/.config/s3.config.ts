import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY!,
    secretAccessKey: env.AWS_ACCESS_KEY_SECRET!,
  },
  region: 'eu-west-2',
});

export { s3Client };
