import { useRouter } from 'next/router'

import Layout from '../../../components/Layout'

const S3BucketPage = () => {
  const { bucket } = useRouter().query

  return (
    <Layout title={`S3 - ${ bucket } | AWS Mock`}>
      <h1>バケット: { bucket }</h1>
    </Layout>
  )
}

export default S3BucketPage