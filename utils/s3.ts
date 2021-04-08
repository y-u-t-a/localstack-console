import { S3 } from './aws-sdk-client'
import { S3Bucket, S3Object } from '../interfaces/s3'

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
  const filterPrefix = prefix.length === 0? '' : prefix + '/'
  const s3Objects:S3Object[] = response.Contents!.map( content => {
    return {
        Key: content.Key!,
        DisplayObjectName: content.Key!.replace(filterPrefix, ''),
        Size: content.Size!,
        LastModified: content.LastModified!.toLocaleString()
    }
  })
  const filteredS3Objects = s3Objects.filter(s3Object => {
    return s3Object.Key.startsWith(filterPrefix)
      && s3Object.Key != filterPrefix
      && s3Object.Key.replace(filterPrefix, '').split('/').length <= 2
  })
  return filteredS3Objects
}
