import AWS from 'aws-sdk'

const mockConfig = {
  endpoint : "http://localhost:4566",
  region : "us-east-1",
  credential : new AWS.Credentials({
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
    sessionToken: 'dummy'
  })
}

export class S3 extends AWS.S3 {
  constructor() {
    if (process.env.TARGET === 'mock') {
      super({
        endpoint: mockConfig.endpoint,
        region: mockConfig.region,
        credentials: mockConfig.credential,
        s3ForcePathStyle: true,
      })
    } else {
      super()
    }
  }
}

export class EC2 extends AWS.EC2 {
  constructor() {
    if (process.env.TARGET === 'mock') {
      super({
        endpoint: mockConfig.endpoint,
        region: mockConfig.region,
        credentials: mockConfig.credential,
      })
    } else {
      super()
    }
  }
}
