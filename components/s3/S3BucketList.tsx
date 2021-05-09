import Link from 'next/link'

import { S3Bucket } from '../../interfaces/s3'

type Props = {
  s3Buckets: S3Bucket[]
}

const S3BucketList = (props:Props) => {
  return (
    <ul>
    {props.s3Buckets.map((s3Bucket) => (
      <li key={s3Bucket.Name}>
        <p>
          <Link href={{
            pathname: '/s3/[bucket]',
            query: { bucket: s3Bucket.Name }
          }}>
            <a>{s3Bucket.Name}</a>
          </Link>
          {" " + s3Bucket.CreationDate}
        </p>
      </li>
    ))}
    </ul>
  )
}

export default S3BucketList