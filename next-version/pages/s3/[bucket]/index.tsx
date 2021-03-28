import { GetServerSideProps } from 'next'

import { getObjectList } from '../../../utils/s3'
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
  const s3Objects = await getObjectList(bucket.toString())
  return {
    props: { s3Objects, bucket }
  }
}

export default S3BucketPage