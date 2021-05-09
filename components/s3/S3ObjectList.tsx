import Link from 'next/link'

import { S3Object } from '../../interfaces/s3'

type Props = {
  bucket: string
  s3Objects: S3Object[]
}

const S3ObjectList = (props:Props) => {
  return (
    <>
      {props.s3Objects.length == 0 &&
        <p>オブジェクトがありません</p>
      }
      <ul>
      {props.s3Objects.map( s3Object => (
        <li key={s3Object.Key}>
          <p>
            <Link href={{
              pathname: '/s3/[bucket]/[[...keys]]',
              query: { bucket: props.bucket, keys: s3Object.Key.split('/') }
            }}>
              <a>{s3Object.DisplayObjectName}</a>
            </Link>
            {` ${s3Object.Size} ${s3Object.LastModified}`}
            </p>
        </li>
      ))}
      </ul>
    </>
  )
}

export default S3ObjectList