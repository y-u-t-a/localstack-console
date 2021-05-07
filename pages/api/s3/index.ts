import type { NextApiRequest, NextApiResponse } from 'next'

import { getBucketList } from '../../../utils/s3'

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
    default:
      res.status(404).end()
      break
  }
}
