import type { NextApiRequest, NextApiResponse } from 'next'

import { S3Object } from '../../../../interfaces'
import { getObjectList } from '../../../../utils/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const bucket = req.query.bucket as string
        const keys = req.query.keys as string[] || []
        const s3Buckets:S3Object[] = await getObjectList(bucket, keys.join('/'))
        res.status(200).json(s3Buckets)
      } catch (error) {
        res.status(500).json({message: error})
      }
      break
    default:
      res.status(404).end()
      break
  }
}