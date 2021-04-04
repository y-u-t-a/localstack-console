import Link from 'next/link'

import Layout from '../components/Layout'

const IndexPage = () => (
  <Layout title="AWS Mock">
    <h1>AWS Mock 😺</h1>
    <ul>
      <li>
        <Link href='/s3'><a>S3</a></Link>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
