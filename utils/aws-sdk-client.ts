import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3'

const mockConfig:S3ClientConfig = {
  endpoint : "http://localhost:4566",
  region : "us-east-1",
  credentials: {
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    sessionToken: 'dummy',
  },
  forcePathStyle: true,
}

export const S3 = new S3Client(process.env.TARGET === 'mock' ? mockConfig : {})