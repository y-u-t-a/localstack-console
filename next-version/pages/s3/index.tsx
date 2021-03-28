import { GetServerSideProps } from 'next'
import Link from 'next/link'

import Layout from '../../components/Layout'
import { S3Bucket } from '../../interfaces'
import { getBucketList } from '../../utils/s3'

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
          <Link href={{
            pathname: '/s3/[bucket]',
            query: { bucket: s3Bucket.Name}
          }}>
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
  const s3Buckets:S3Bucket[] = await getBucketList()
  return {
    props: { s3Buckets }
  }
}

export default S3Page