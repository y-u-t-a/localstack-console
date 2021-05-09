import type { NextApiRequest, NextApiResponse } from 'next'

import { S3 } from '../../../../utils/aws-sdk-client'
import { CreateS3FolderApiRequest } from '../../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const body:CreateS3FolderApiRequest = JSON.parse(req.body)
  switch (req.method) {
    case 'POST':
      try {
        // 末尾をスラッシュにすることでフォルダになる
        const key = body.prefix.length === 0?
          `${body.folderName}/` : `${body.prefix}/${body.folderName}/`
        await S3.putObject({
          Bucket: body.bucketName,
          Key: key
        }).promise()
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