import { GetServerSideProps } from 'next'

import { S3 } from '../../../utils/aws-sdk-client'
import { S3Object } from '../../../interfaces'
import Layout from '../../../components/Layout'

type Props = {
  bucket: string,
  s3Objects: S3Object[],
}

const S3BucketPage = (props: Props) => {
  return (
    <Layout title={`S3 - ${ props.bucket } | AWS Mock`}>
      <h1>バケット: { props.bucket }</h1>
      <ul>
      { props.s3Objects.map( s3Object => (
        <li key={s3Object.Key}>
          <p>{ `${s3Object.Key} ${s3Object.Size} ${s3Object.LastModified}` }</p>
        </li>
      ))}
      </ul>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bucket = context.query.bucket
  const response = await S3.listObjectsV2({ Bucket: bucket.toString() }).promise()
  const s3Objects:S3Object[] = response.Contents!.map( content => {
    return {
        Key: content.Key!,
        Size: content.Size!,
        LastModified: content.LastModified!.toLocaleString()
    }
  })
  return {
    props: { s3Objects, bucket }
  }
}

export default S3BucketPage