import type { NextApiRequest, NextApiResponse } from 'next'

import { downloadFile } from '../../../../../utils/s3'

export default async (req:NextApiRequest, res:NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const bucket = req.query.bucket as string
        const keys = req.query.keys as string[] || []
        const file = await downloadFile(bucket, keys.join('/'))
        res.status(200)
        res.setHeader('content-type', 'application/octet-stream')
        res.send(file)
      } catch (error) {
        res.status(500).json({message: error.toString()})
      }
      break
    default:
      res.status(404).end()
      break
  }
}