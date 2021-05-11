import type { NextApiRequest, NextApiResponse } from 'next'

import { S3v2 } from '../../../../utils/aws-sdk-client'
import { S3Bucket } from '../../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      try {
        const body:S3Bucket = JSON.parse(req.body)
        await S3v2.createBucket({Bucket: body.Name}).promise()
        res.status(200).end()
      } catch (error) {
        res.status(500).json({message: error.code})
      }
      break
    default:
      res.status(404).end()
      break
  }
}
