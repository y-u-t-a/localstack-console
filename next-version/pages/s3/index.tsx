import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { S3 } from '../../utils/aws-sdk-client'

import { S3Bucket } from '../../interfaces'
import Layout from '../../components/Layout'

type Props = {
  s3Buckets: S3Bucket[]
}

const S3Page = (props:Props) => (
  <Layout title="S3 | AWS Mock">
    <h1>S3 バケット一覧</h1>
    <ul>
    {props.s3Buckets.map((s3Bucket) => (
      <li key={s3Bucket.Name}>
        <p>
          <Link href={`/s3/${s3Bucket.Name}`}>
            <a>{s3Bucket.Name}</a>
          </Link>
          {" " + s3Bucket.CreationDate}
        </p>
      </li>
    ))}
    </ul>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await S3.listBuckets().promise()
  const s3Buckets:S3Bucket[] = response.Buckets!.map( bucket => {
    return { Name:bucket.Name!, CreationDate: bucket.CreationDate!.toLocaleString() }
  })
  return {
    props: { s3Buckets }
  }
}

export default S3Page