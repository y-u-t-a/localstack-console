export type S3Bucket = {
  Name : string
  CreationDate? : string
}

export type S3Object = {
  Key: string
  DisplayObjectName: string
  Size: number
  LastModified: string
}

export type CreateS3FolderApiRequest = {
  bucketName: string
  prefix: string
  folderName: string
}