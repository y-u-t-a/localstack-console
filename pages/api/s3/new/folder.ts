import type { NextApiRequest, NextApiResponse } from 'next'

import { S3 } from '../../../../utils/aws-sdk-client'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { CreateS3FolderApiRequest } from '../../../../interfaces/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  const body:CreateS3FolderApiRequest = JSON.parse(req.body)
  switch (req.method) {
    case 'POST':
      try {
        // 末尾をスラッシュにすることでフォルダになる
        const key = body.prefix.length === 0?
          `${body.folderName}/` : `${body.prefix}/${body.folderName}/`
        const command = new PutObjectCommand({
          Bucket: body.bucketName,
          Key: key
        })
        await S3.send(command)
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
