import { S3 } from './aws-sdk-client'
import { S3Bucket, S3Object } from '../interfaces'

export const getBucketList = async () => {
  const response = await S3.listBuckets().promise()
  const s3Buckets:S3Bucket[] = response.Buckets!.map( bucket => {
    return { Name:bucket.Name!, CreationDate: bucket.CreationDate!.toLocaleString() }
  })
  return s3Buckets
}

export const getObjectList = async (bucket:string, prefix:string = '') => {
  const response = await S3.listObjectsV2({
    Bucket: bucket,
    Prefix: prefix
  }).promise()
  const s3Objects:S3Object[] = response.Contents!.map( content => {
    return {
        Key: content.Key!,
        Size: content.Size!,
        LastModified: content.LastModified!.toLocaleString()
    }
  })
  return s3Objects
}
