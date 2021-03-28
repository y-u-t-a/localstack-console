import { S3 } from './aws-sdk-client'
import { S3Bucket } from '../interfaces'

export const getBucketList = async () => {
  const response = await S3.listBuckets().promise()
  const s3Buckets:S3Bucket[] = response.Buckets!.map( bucket => {
    return { Name:bucket.Name!, CreationDate: bucket.CreationDate!.toLocaleString() }
  })
  return s3Buckets
}