import AWS from 'aws-sdk'

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

export const S3 = new AWS.S3(process.env.TARGET === 'mock' ? mockConfig : {})
export const EC2 = new AWS.EC2(process.env.TARGET === 'mock' ? mockConfig : {})