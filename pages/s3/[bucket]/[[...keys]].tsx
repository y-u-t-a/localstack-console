import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { getObjectList } from '../../../utils/s3'
import { S3Object } from '../../../interfaces/s3'
import Layout from '../../../components/Layout'

type Props = {
  bucket: string,
  s3Objects: S3Object[],
}

const S3ObjectPage = (props: Props) => {
  return (
    <Layout title={`S3 - ${ props.bucket } | AWS Mock`}>
      <h1>バケット: { props.bucket }</h1>
      <ul>
      { props.s3Objects.map( s3Object => (
        <li key={s3Object.Key}>
          <p>
            <Link href={{
              pathname: '/s3/[bucket]/[[...keys]]',
              query: { bucket: props.bucket, keys: s3Object.Key.split('/') }
            }}>
              <a>{s3Object.DisplayObjectName}</a>
            </Link>
            { ` ${s3Object.Size} ${s3Object.LastModified}` }
            </p>
        </li>
      ))}
      </ul>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const bucket = context.query.bucket as string
  const keys = context.query.keys as string[] || []
  const s3Objects = await getObjectList(bucket, keys.join('/'))
  return {
    props: { s3Objects, bucket }
  }
}

export default S3ObjectPage