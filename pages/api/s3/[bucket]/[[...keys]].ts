import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteObjectByKey, getObjectList, getObjectDetail } from '../../../../utils/s3'
import { S3Object, S3ObjectPageApiResponse } from '../../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const bucket = req.query.bucket as string
        const keys = req.query.keys as string[] || []
        const s3ObjectDetail = await getObjectDetail(bucket, keys.join('/'))
        const s3Objects = await getObjectList(bucket, keys.join('/'))
        const responseBody:S3ObjectPageApiResponse = {
          s3ObjectDetail: s3ObjectDetail,
          s3ObjectList: s3Objects
        }
        res.status(200).json(responseBody)
      } catch (error) {
        res.status(500).json(error)
      }
      break
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