import type { NextApiRequest, NextApiResponse } from 'next'

import { S3ObjectDetail } from '../../../../../interfaces/s3'
import { getObjectDetail } from '../../../../../utils/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const bucket = req.query.bucket as string
        const keys = req.query.keys as string[] || []
        const s3ObjectDetail:S3ObjectDetail = await getObjectDetail(bucket, keys.join('/'))
        res.status(200).json(s3ObjectDetail)
      } catch (error) {
        res.status(500).json({message: error})
      }
      break
    default:
      res.status(404).end()
      break
  }
}