import AWS from 'aws-sdk'
import { S3 } from '@aws-sdk/client-s3'

const mockConfig = {
  endpoint : "http://localhost:4566",
  region : "us-east-1",
  credential : new AWS.Credentials({
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    sessionToken: 'dummy',
  }),
  s3ForcePathStyle: true,
}

export const S3v2 = new AWS.S3(process.env.TARGET === 'mock' ? mockConfig : {})
export const S3v3 = new S3(process.env.TARGET === 'mock' ? mockConfig : {})