import type { NextApiRequest, NextApiResponse } from 'next'

import { S3v3Client } from '../../../../utils/aws-sdk-client'
import { CreateBucketCommand } from '@aws-sdk/client-s3'
import { S3Bucket } from '../../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const body:S3Bucket = JSON.parse(req.body)
        const command = new CreateBucketCommand({
          Bucket: body.Name
        })
        await S3v3Client.send(command)
        res.status(200).end()
      } catch (error) {
        res.status(500).json({message: error.toString()})
      }
      break
    default:
      res.status(404).end()
      break
  }
}
