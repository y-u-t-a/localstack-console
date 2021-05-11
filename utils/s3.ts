import { S3v3Client } from './aws-sdk-client'
import { ListBucketsCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { S3Bucket, S3Object } from '../interfaces/s3'

export const getBucketList = async () => {
  const command = new ListBucketsCommand({})
  const response = await S3v3Client.send(command)
  const s3Buckets:S3Bucket[] = response.Buckets!.map( bucket => {
    return { Name:bucket.Name!, CreationDate: bucket.CreationDate!.toLocaleString() }
  })
  return s3Buckets
}

export const getObjectList = async (bucket:string, prefix:string = '') => {
  const command = new ListObjectsV2Command({
    Bucket: bucket,
    Prefix: prefix,
  })
  const response = await S3v3Client.send(command)
  const contents = response.Contents || []
  const filterPrefix = prefix.length === 0? '' : prefix + '/'
  const s3Objects:S3Object[] = contents.map( content => {
    return {
      Key: content.Key!,
      DisplayObjectName: content.Key!.replace(filterPrefix, ''),
      Size: content.Size!,
      LastModified: content.LastModified!.toLocaleString()
    }
  })
  const filteredS3Objects = s3Objects.filter(s3Object => {
    // 「prefix に至るフォルダ自身」と「prefix を除いた Key に / の後に文字列が続く Key」を除外することで
    // prefix と同一レベルのオブジェクトをフィルタリングできる
    return s3Object.Key != filterPrefix
      && s3Object.Key.replace(filterPrefix, '').match(/\/.+/g) == null
  })
  return filteredS3Objects
}

export const getObjectDetail = async (bucket:string, key:string) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key
  })
  const response = await S3v3Client.send(command)
  const s3Object:S3Object = {
    Key: key,
    DisplayObjectName: key,
    Size: response.ContentLength!,
    LastModified: response.LastModified!.toLocaleString()
  }
  return s3Object
}