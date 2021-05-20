import type { NextApiRequest, NextApiResponse } from 'next'

import { getBucketList, deleteBucket } from '../../../utils/s3'
import { S3Bucket } from '../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const s3Buckets = await getBucketList()
        res.status(200).json(s3Buckets)
      } catch (error) {
        res.status(500).json({message: error.toString()})
      }
      break
    case 'DELETE':
      const body:S3Bucket = JSON.parse(req.body)
      try {
        await deleteBucket(body.Name)
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
