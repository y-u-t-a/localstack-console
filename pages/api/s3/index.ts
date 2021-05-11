import type { NextApiRequest, NextApiResponse } from 'next'

import { getBucketList } from '../../../utils/s3'
import { S3 } from '../../../utils/aws-sdk-client'
import { DeleteBucketCommand } from '@aws-sdk/client-s3'
import { S3Bucket } from '../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const s3Buckets = await getBucketList()
        res.status(200).json(s3Buckets)
      } catch (error) {
        res.status(500).json(error)
      }
      break
    case 'DELETE':
      try {
        const body:S3Bucket[] = JSON.parse(req.body)
        body.map(async (bucket) => {
          const command = new DeleteBucketCommand({
            Bucket: bucket.Name
          })
          await S3.send(command)
        })
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
