import { GetServerSideProps } from 'next'

import { getObjectList } from '../../../utils/s3'
import { S3Object } from '../../../interfaces/s3'
import Layout from '../../../components/Layout'
import S3ObjectDetail from '../../../components/s3/S3ObjectDetail'
import S3ObjectList from '../../../components/s3/S3ObjectList'

type Props = {
  bucket: string,
  s3Objects: S3Object[],
}

const S3ObjectPage = (props: Props) => {
  return (
    <Layout title={`S3 - ${ props.bucket } | AWS Mock`}>
      <h1>バケット: { props.bucket }</h1>
      {props.s3Objects.length > 0 &&
        <S3ObjectList bucket={props.bucket} s3Objects={props.s3Objects} />
      }
      {props.s3Objects.length == 0 &&
        <S3ObjectDetail bucket={props.bucket} />
      }
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