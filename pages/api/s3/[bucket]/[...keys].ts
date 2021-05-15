import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteObjectByKey } from '../../../../utils/s3'
import { S3Object } from '../../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'DELETE':
      try {
        const requestBody:S3Object[] = JSON.parse(req.body)
        requestBody.map(async s3Object => {
          await deleteObjectByKey(s3Object.Bucket, s3Object.Key)
        })
        res.status(200).json({})
      } catch (error) {
        res.status(500).json(error)
      }
      break
    default:
      res.status(404).end()
      break
  }
}